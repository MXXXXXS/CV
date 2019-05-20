// /\n-\n/ 逐行打印
// /\nx\n/ 整块执行, 不打印
// /\n\+\n/ 逐行打印后, 整块执行
const content =
  `
-
为了拯救即将废校的...
x
//划掉: 拯救即将废校的...
document.querySelector('.coding').innerHTML = document.querySelector('.coding').innerHTML.replace('拯救即将废校的...', '<del>拯救即将废校的...</del>')
-
找工作, 准备写一份简历
-
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
-
好的, 继续来写简历吧
-
首先, 把简历分几个栏
+
const cv = document.querySelector('.cv')
const main = document.createElement('div')
main.setAttribute('class', 'main')
main.style.padding = '10px'
const info = document.createElement('div')
info.setAttribute('class', 'info')
cv.appendChild(main)
cv.appendChild(info)
cv.style.display = 'flex'
-
乍看没什么效果, 不慌, 加点样式
+
const main = document.querySelector('.main')
main.style.flex = '2.5'
const info = document.querySelector('.info')
info.style.flex = '1'
info.style.backgroundColor = '#95B8D1'
-
右边的栏用来写一些个人信息
-
...
-
先确定一下布局
+
const info = document.querySelector('.info')
info.style.display = 'flex'
info.style.flexDirection = 'column'
info.style.alignItems= 'center'
-
加个头像
+
const avatar = document.createElement('img')
avatar.src = '佐仓千代avatar.png'
avatar.style.width = '80%'
avatar.style.borderRadius = '100%'
avatar.style.border = '4px solid white'
document.querySelector('.info').appendChild(avatar)
-
添加一下个人信息
+
const info = document.querySelector('.info')
const aboutMe = document.createElement('div')
aboutMe.setAttribute('class', 'aboutMe')
info.appendChild(aboutMe)
const items = {
  姓名: 'xxx',
  毕业于: 'xxx',
  电话: 'xxx',
  邮箱: 'xxx',
  GitHub: 'xxx',
  我的小站: 'xxx'
}
for (const key in items) {
  if (items.hasOwnProperty(key)) {
    const val = items[key];
    const item = document.createElement('p')
    item.style.margin = '15px 0'
    item.innerText = key + ':' + val
    aboutMe.appendChild(item)
  }
}
-
开始完善左栏的信息
-
大致分个几项
+
const items = {
  技术栈: 'techStack',
  项目经历: 'projects',
  教育背景: 'education',
  个人喜好: 'hobbies'
}

for (const key in items) {
  if (items.hasOwnProperty(key)) {
    const val = items[key];
    const main = document.querySelector('.main')
    const div = document.createElement('div')
    div.setAttribute('class', val)
    main.appendChild(div)
    const item = document.querySelector('.' + val)
    const h1 = document.createElement('h1')
    h1.innerText = key
    h1.setAttribute('class', key)
    h1.style.borderBottom = '2px solid #95B8D1'
    item.appendChild(h1)
  }
}
-
把技能放在开头, 让人一目了然
x
//准备好三栏写技术栈
const techStack = document.querySelector('.techStack')
const stackContainer = document.createElement('div')
stackContainer.setAttribute('class', 'stackContainer')
stackContainer.style.columns = '14rem'
techStack.appendChild(stackContainer)
+
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

const skills = {
  语言: 'HTML(5), CSS(3), es6+, TS, node',
  前端框架: 'vue及其生态',
  后端框架: 'express',
  打包工具: 'webpack',
  可视化: 'D3',
  视图: 'pug',
  数据库: 'mongoDB',
  代码质量: 'ESLint',
  测试框架: 'mocha',
  断言库: 'chai',
  代码风格: '低耦合, 风格约束',
  接口风格: '遵循RESTful'
}

document.querySelectorAll('.stackContainer').forEach(async el => {
  for (const key in skills) {
    if (skills.hasOwnProperty(key)) {
      const string = skills[key];
      if (play) {
        el.innerText += key + ': '
        await type(el, string, 100, (el, word) => {
          el.innerText += word
        })
      } else {
        el.innerText += key + ': ' + string
      }
      el.innerHTML += '<br>'
    }
  }
})
-
展示一下做过什么项目是表现自己技能的最好方式
+
//有待填坑
x
//结束后隐藏跳过按钮
document.querySelector('.skipPlaying').style.opacity = '0'
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
  //定义一些常量
  let play = true
  let enableHighLight = false
  let interval = 100
  //语法高亮
  let timer0 = setInterval(() => {
    if (enableHighLight) {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
        
      });
    }
  }, 800)
  //自动滚动到最底部
  let timer1 = setInterval(() => {
    const coding = document.querySelector(`.coding`);
    coding.scrollTop = coding.scrollHeight;
  }, 100)
  //为了复用type函数包装一下
  const coding = document.getElementsByClassName(`coding`)[0]
  const write = partial(type, undefined, undefined, undefined, (el, word) => {
    el.innerHTML += word
  })
  //跳过播放按钮功能
  document.querySelector(`.skipPlaying`).addEventListener(`click`, function(e) {
    if(e.target.tagName === `BUTTON`) {
      e.target.style.opacity = '0'
      play = false
    }
  })
  //content解析
  const mark = marks(content, /\n\+\n/, /\n-\n/, /\nx\n/)
  const subsAndCodes = parsePart(content, mark)
  //content解析后分类执行
  for (let index = 0; index < subsAndCodes.length; index++) {
    //逐行打印
    if (/\n\+|-\n/.test(subsAndCodes[index].mark)) {
      let el
      if (/\n-\n/.test(subsAndCodes[index].mark)) {
        interval = 100
        el = document.createElement(`p`)
        el.setAttribute(`class`, `text`)
        coding.appendChild(el)
      } else {
        interval = 10
        el = document.createElement(`pre`)
        el.setAttribute(`class`, `code javascript`)
        el.appendChild(document.createElement(`code`))
        coding.appendChild(el)
        el = el.children[0]
      }
      //控制是否跳过动画
      if (play) {
        await write(el, subsAndCodes[index].data, interval)
      } else {
        el.innerHTML += subsAndCodes[index].data
      }
    }
    //整块语句执行
    if (/\n\+|x\n/.test(subsAndCodes[index].mark)) {
      eval(subsAndCodes[index].data)
    }
  }
  //结束后清楚所有定时器
  const lastTimer = setTimeout(() => {
    clearInterval(timer0)
    clearInterval(timer1)
    clearTimeout(lastTimer)
  }, 3000)
}

trigger()