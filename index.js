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
// cv.style.width = '45vw'
// cv.style.height = '95vh'
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
main.style.padding = '20px'
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
info.style.overflowY= 'auto'
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
avatar.setAttribute('class', 'avatar')
avatar.src = '简历头像.jpg'
avatar.style.width = '80%'
avatar.style.borderRadius = '100%'
document.querySelector('.info').appendChild(avatar)
-
添加一下个人信息
+
const info = document.querySelector('.info')
const aboutMe = document.createElement('div')
aboutMe.setAttribute('class', 'aboutMe')
info.appendChild(aboutMe)
const items = {
  姓名: '向思齐',
  电话: '15195812388',
  邮箱: 'relife_abyss@qq.com',
  GitHub: 'https://github.com/MXXXXXS',
  期望职位: '前端工程师'
}
for (const key in items) {
  if (items.hasOwnProperty(key)) {
    const val = items[key];
    const item = document.createElement('p')
    item.style.wordBreak = 'break-word'
    // https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
    const urlRegex = /https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/
    if (urlRegex.test(val)) {
      item.innerText = key + ': '
      const a = document.createElement('a')
      a.href = val
      a.innerText = val
      item.appendChild(a)
    } else {
      item.innerText = key + ': ' + val
    }
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
  教育经历: 'education',
  个人爱好: 'hobbies'
}

for (const key in items) {
  if (items.hasOwnProperty(key)) {
    const val = items[key];
    const main = document.querySelector('.main')
    const div = document.createElement('div')
    div.setAttribute('class', val)
    main.appendChild(div)
    const item = document.querySelector('.' + val)
    const h3 = document.createElement('h3')
    h3.innerText = key
    h3.setAttribute('class', key)
    h3.style.borderBottom = '4px solid #95B8D1'
    item.appendChild(h3)
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
//"教育经历"添加container
const education = document.querySelector('.education')
const experience = document.createElement('div')
experience.setAttribute('class', 'experience')
education.appendChild(experience)
//"个人爱好"添加container
const hobbies = document.querySelector('.hobbies')
const content = document.createElement('div')
content.setAttribute('class', 'content')
hobbies.appendChild(content)

+
async function render(rootELSelector, items) {
  const rootEl = document.querySelector(rootELSelector)
  for (const key in items) {
    if (items.hasOwnProperty(key)) {
      const string = items[key];
      if (play) {
        rootEl.innerText += key + ':  '
        await type(rootEl, string, 100, (rootEl, word) => {
          rootEl.innerText += word
        })
      } else {
        rootEl.innerText += key + ': ' + string
      }
      rootEl.innerHTML += '<br>'
    }
  }
}

const skills = {
  偏好的代码风格: '防御性编程, 低耦合, 高内聚',
  偏好的接口风格: 'RESTful',
  日常使用的语言: 'ES6+, node',
  熟悉的前端框架: 'vue及其生态',
  使用的打包工具: 'webpack',
  接触过的后端框架: 'express',
  接触过的可视化工具: 'D3',
  接触过的数据库: 'mongoDB'
}

render('.stackContainer', skills)
-
展示一下做过什么项目是让他人了解的最好方式
+
const projectsEl = document.querySelector('.projects')
const projects = [
  {
    项目: 'aqua-player',
    描述: '仿 win10 groove 音乐播放器, 使用 electron 构建',
    特点: [
      '尝试不借助框架, 通过 web components 实现组件化和 css 作用域分离',
      '可配置的配置组件样式, 使用 css 变量穿透 shadow dom',
      '使用 Proxy 实现状态与视图的同步',
      '代理了数组的方法, 实现了响应式列表渲染, 元素变化触发视图变化',
      '组件间通过响应式属性, 自定义事件通讯',
      '使用 indexedDB 存储数据, web audio api 播放音频'
    ],
    link: 'https://github.com/MXXXXXS/aqua-player'
  },
  {
    项目: 'my-blog',
    描述: '从零手工构建的一个简单博客系统',
    特点: [
      '使用 vue 及其生态构建前端页面, express 作为后端框架, mongoDB 存储数据',
      '简单的 Markdown 编辑器, 用于图片文字编辑与上传, 具有离线保存功能',
      '一个颜色选择组件, 有 rgb 和 hsl 两种模式, 用于自定义博客页面的主题色',
      '评论组件, 支持自定义图片表情(canvas 处理图片缩放)',
      '使用 fetch 与服务器交互获取文章'
    ],
    link: 'https://github.com/MXXXXXS/my-blog'
  },
  {
    项目: 'classify-my-files',
    描述: '照片整理工具',
    特点: [
      '整理的三种模式: copy, link, symlink',
      '分析 exif信息, 文件的 mtime, 文件名三者得出照片的实际日期',
      '使用 chai 和 mocha 单元测试, travis 持续集成与自动发布到 npm',
    ],
    link: 'https://github.com/MXXXXXS/classify-my-files'
  }
]
projects.forEach(project => {
  const container = document.createElement('div')
  const a = document.createElement('a')
  a.innerText = project.项目
  a.href = project.link
  container.appendChild(a)
  const p = document.createElement('p')
  p.innerText = project.描述
  container.appendChild(p)
  const ul = document.createElement('ul')
  project.特点.forEach(item => {
    const li = document.createElement('li')
    li.innerText = item
    ul.appendChild(li)
  })
  container.appendChild(ul)
  projectsEl.appendChild(container)
})
-
我是怎么学习的, 在大学里干了什么, 这些放在"教育经历"里
+
async function render(rootELSelector, items) {
  const rootEl = document.querySelector(rootELSelector)
  for (const key in items) {
    if (items.hasOwnProperty(key)) {
      const string = items[key];
      if (play) {
        rootEl.innerText += key + ':  '
        await type(rootEl, string, 100, (rootEl, word) => {
          rootEl.innerText += word
        })
      } else {
        rootEl.innerText += key + ':  ' + string
      }
      rootEl.innerHTML += '<br>'
    }
  }
}

const content = {
  学历: '南京工业大学, 本科',
  专业: '自动化',
  英语水平: 'CET-6',
  技能概述: '入坑前端已近 3 年, js 比较扎实, 英文阅读流畅, 注重基础',
  怎么学习的: '看技术书, 查w3c, whatwg, csswg, mdn, devdoc, 搜google, 翻stackOverflow, 逛medium, 掘金, 与大佬们的blog...'
}

render('.experience', content)
-
不写代码的时候一般在干什么呢?
+
async function render(rootELSelector, items) {
  const rootEl = document.querySelector(rootELSelector)
  for (const key in items) {
    if (items.hasOwnProperty(key)) {
      const string = items[key];
      if (play) {
        rootEl.innerText += key + ':  '
        await type(rootEl, string, 100, (rootEl, word) => {
          rootEl.innerText += word
        })
      } else {
        rootEl.innerText += key + ':  ' + string
      }
      rootEl.innerHTML += '<br>'
    }
  }
}

const content = {
  体育运动: '羽毛球, 骑自行车',
  日常: '看技术书, 看漫画, 看动画, 欣赏第九艺术, 听歌',
  特质: '对感兴趣的东西会深入地钻研'
}

render('.content', content)
x
//结束后隐藏跳过按钮
document.querySelector('.skipPlaying').style.opacity = '0'
document.querySelector('.coding').style.flex = '0'
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
  let highlightInterval = 800
  //检测是否移动端, 以降低高亮频率, 否则实测代码输出非常缓慢. 此处设置  1.5s也有缓慢现象, 尚可接受
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    highlightInterval = 1500
  }
  //语法高亮, 每次只处理最后一个代码块, 为了性能考虑
  let timer0 = setInterval(() => {
    if (enableHighLight) {
      const codeToHighlight = document.querySelectorAll('pre code')
      hljs.highlightBlock(codeToHighlight[codeToHighlight.length - 1])
    }
  }, highlightInterval)
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
  document.querySelector(`.skipPlaying`).addEventListener(`click`, function (e) {
    if (e.target.tagName === `BUTTON`) {
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
  //动画被跳过后进行一次全部的高亮处理
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  })
  //结束后清楚所有定时器
  const lastTimer = setTimeout(() => {
    clearInterval(timer0)
    clearInterval(timer1)
    clearTimeout(lastTimer)
  }, 1000)
}

trigger()