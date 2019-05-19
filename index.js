// /\n-\n/ 逐行打印
// /\nx\n/ 整块执行, 不打印
// /\n\+\n/ 逐行打印后, 整块执行
const content =
  `
-
为了拯救即将废校的...
x
document.querySelector('.coding').innerHTML = document.querySelector('.coding').innerHTML.replace('拯救即将废校的...', '<del>拯救即将废校的...</del>')
-
找工作, 准备写一份简历
先准备一张纸
+
const cv = document.createElement('div')
cv.setAttribute('class', 'cv')
document.getElementsByClassName('present')[0].appendChild(cv)
cv.style.width = '45vw'
cv.style.height = '95vh'
cv.style.boxShadow = '0px 0px 16px 1.5px grey'
-
嗯, 代码看着有点单调, 来点语法高亮
x
enableHighLight = true
+
alert('Hi!')
`

function marks(string, ...regexs) {
  function genRegexFromString(string) {
    const specialWords = `/`
    let words = string.split()
    let newWords = words.map(word => {
      if (specialWords.includes(word)) {
        return `\\` + word
      } else {
        return word
      }
    })
    return newWords.join(``)
  }
  let regex = new RegExp(regexs.reduce((acc, cur, i) => {
    if (i === 0) {
      if (cur instanceof RegExp) {
        acc += `\(` + cur.source + `\)`
      } else if (typeof cur === `string`) {
        let newCur = genRegexFromString(cur)
        acc += `\(` + newCur + `\)`
      }
    } else {
      if (cur instanceof RegExp) {
        acc += `\|` + `\(` + cur.source + `\)`
      } else if (typeof cur === `string`) {
        let newCur = genRegexFromString(cur)
        acc += `\|` + `\(` + newCur + `\)`
      }
    }
    return acc
  }, ``), `g`)
  let result
  let matched = []
  while ((result = regex.exec(string)) !== null) {
    matched.push({
      mark: result[0],
      index: result.index,
      lastIndex: regex.lastIndex
    })
  }
  return matched
}

function parsePart(string, marks) {
  let buf = []
  if (marks.length !== 0) {
    marks.forEach((mark, index) => {
      if (index === 0 && index !== marks.length - 1) {
        buf.push({
          data: string.slice(0, mark[`index`]),
          mark: ``
        })
      } else if (index === 0 && index === marks.length - 1) {
        buf.push({
          data: string.slice(0, mark[`index`]),
          mark: ``
        })
        buf.push({
          data: string.slice(marks[index][`lastIndex`], string.length),
          mark: marks[index]
        })
      } else if (index === marks.length - 1) {
        buf.push({
          data: string.slice(marks[index - 1][`lastIndex`], mark[`index`]),
          mark: marks[index - 1][`mark`]
        })
        buf.push({
          data: string.slice(mark[`lastIndex`], string.length),
          mark: mark[`mark`]
        })
      } else {
        buf.push({
          data: string.slice(marks[index - 1][`lastIndex`], mark[`index`]),
          mark: marks[index - 1][`mark`]
        })
      }
    })
  } else {
    buf.push({
      data: string,
      mark: ``
    })
  }
  return buf
}

const partial = function (fn, ...partialArgs) {
  let args = partialArgs
  return function (...fullArguments) {
    let args_copy = args.map(subOrCodePart => subOrCodePart)
    let arg = 0
    for (let i = 0; i < args_copy.length && arg < fullArguments.length; i++) {
      if (args_copy[i] === undefined) {
        args_copy[i] = fullArguments[arg++]
      }
    }
    return fn.apply(null, args_copy)
  }
}

function type(el, string, interval, cb) {
  if (string) {
    let index = 0
    return new Promise((res, rej) => {
      const timer = setInterval(() => {
        cb(el, string[index])
        if (index === string.length - 1) {
          clearInterval(timer)
          res(true)
        }
        index++
      }, interval)
    })
  }
}

async function trigger() {
  let enableHighLight = false
  const interval = 20
  const coding = document.getElementsByClassName(`coding`)[0]
  const write = partial(type, undefined, undefined, interval, (el, word) => {
    if (enableHighLight) {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
      });
    }
    el.innerHTML += word
  })

  const mark = marks(content, /\n\+\n/, /\n-\n/, /\nx\n/)
  const subsAndCodes = parsePart(content, mark)

  for (let index = 0; index < subsAndCodes.length; index++) {
    //逐行打印
    if (/\n\+|-\n/.test(subsAndCodes[index].mark)) {
      let el
      if (/\n-\n/.test(subsAndCodes[index].mark)) {
        el = document.createElement(`p`)
        el.setAttribute(`class`, `text`)
        coding.appendChild(el)
      } else {
        el = document.createElement(`pre`)
        el.setAttribute(`class`, `code javascript`)
        el.appendChild(document.createElement(`code`))
        coding.appendChild(el)
        el = el.children[0]
      }

      await write(el, subsAndCodes[index].data)
    }
    //整块执行
    if (/\n\+|x\n/.test(subsAndCodes[index].mark)) {
      eval(subsAndCodes[index].data)
    }
  }

}

trigger()