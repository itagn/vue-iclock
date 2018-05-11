const timeLength = str => str.length === 2 ? str : `0${ str }`

const timeClass = str => {
  let arr = str.split('')
  return arr.map((val, i) => `num num${ arr[i] }`)
}

const dateFormat = language => {
    const dates = new Date()
    const y = dates.getFullYear(), m = dates.getMonth() + 1, d = dates.getDate()
    let date, week = dates.getDay()
    if (language === 'zh') {
      let zh = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      week = zh[week % 7]
      date = `${ y }/${ m }/${ d }`
    } else if (language === 'en') {
      let en = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      week = en[week % 7]
      date = `${ m }/${ d }/${ y }`
    }
    return { week, date }
}

const timeFormat = type => {
  const dates = new Date()
  const [h, m, s] = [dates.getHours() + '', dates.getMinutes() + '', dates.getSeconds() + ''].map(val => timeLength(val))
  if (type === 'clock') {
    return `${h}:${m}:${s}`
  } else if (type === 'scroll') {
    const [hf, hs, mf, ms, sf, ss] = [...timeClass(h), ...timeClass(m), ...timeClass(s)]
    return { hf, hs, mf, ms, sf, ss }
  } else if (type !== 'text') {
    console.error('err: function timeFormat in util/index.js')
  }
}

const objVal = (obj, dom) => {
  Object.keys(obj).forEach(val => {
      dom.style[val] = obj[val]
  })
}

const domHover = (dom, fnOver, fnOut ) => {
  dom.onmouseenter = fnOver
  dom.onmouseleave = fnOut
}

const getDom = (root, child = '') => document.querySelector(`${root} .iclock ${child}`)

export {
  dateFormat,
  timeFormat,
  objVal,
  domHover,
  getDom
}