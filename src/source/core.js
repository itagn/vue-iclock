import time from './time.png'
import { dateFormat, timeFormat, objVal, domHover, getDom } from '../util/tool'
import { smile, angry, jiong } from '../util/emoji'
export default{
  props: {
    display: {
      type: Object
    }
  },
  data (){
    return {
      scrollUrl: time,
      interval: null,
      show: '',
      hms: {
        hf: 'num num0',
        hs: 'num num0',
        mf: 'num num0',
        ms: 'num num0',
        sf: 'num num0',
        ss: 'num num0',
      },
      ymd:{
        date: '',
        week: '',
      },
      api: {
        type: this.display.type || 'scroll',
        language: this.display.language || 'zh',
        emoji: this.display.emoji || 'smile',
        className: this.display.className || '',
        glasses: this.display.glasses || false,
        scale: +this.display.scale || 1,
        info: this.display.info || 'o w o',
        hoverAnimation: this.display.hoverAnimation || true,
        fontSize: this.display.fontSize || '1.5rem',
        fontColor: this.display.fontColor || 'orange',
        fontStyle: this.display.fontStyle || "Helvetica,'Microsoft YaHei'",
        dateColor: this.display.dateColor || '#999'
      }
    }
  },
  created(){
    this.initDate()
  },
  mounted() {
    this.init()
  },
  methods: {
    initDate(){
      let { week, date } = dateFormat(this.api.language)
      this.ymd = { week, date }
      if (this.api.type !== 'scroll') {
        this.show = timeFormat(this.api.type)
      } else {
        let { hf, hs, mf, ms, sf, ss } = timeFormat(this.api.type)
        this.hms = { hf, hs, mf, ms, sf, ss }
      }
    },
    init(){
      const clockDom = getDom(this.api.className)
      if (!!clockDom && this.checkError()) {
          this.initStyle()
          this.checkType()
          this.checkEmoji()
      } else {
        this.errTip('Error: props[display].className of dom does not exist!')
      }
    },
    checkError(){
      let tf = true
      let allowType = ['clock', 'scroll', 'text']
      if (!allowType.includes(this.api.type)) {
        this.errTip('Error: props[display].type should be "clock", "text" or "scroll".')
        tf = false
      }
      let allowEmoji = ['smile', 'angry', 'jiong', 'owo']
      if (!allowEmoji.includes(this.api.emoji)) {
        this.errTip('Error: props[display].emoji should be "smile", "angry", "jiong" or "owo".')
        tf = false
      }
      return tf
    },
    initStyle(){
      const that = this
      const clockDom = getDom(this.api.className)
      objVal({
        transform: `scale(${ that.api.scale })`,
        webkitTransform: `scale(${that.api.scale})`,
        fontFamily: that.api.fontStyle
      }, clockDom)
      const showDom = getDom(this.api.className, '.iclock-show')
      objVal({
        color: that.api.fontColor,
        fontSize: that.api.fontSize
      }, showDom)
      this.checkAnimation()
    },
    checkAnimation(){
      if(this.api.hoverAnimation){
        const bodyDom = getDom(this.api.className, '.iclock-body')
        const mouseDom = getDom(this.api.className, '.iclock-mouse')
        let animationName = 'ppp', animationTime = '0.75s'
        domHover(bodyDom, () => {
          objVal({
            animation: `${animationName} ${animationTime} infinite`,
            webkitAnimation: `${animationName} ${animationTime} infinite`
          }, mouseDom)
        }, () => {
          objVal({
            animation: ``,
            webkitAnimation: ``
          }, mouseDom)
        })
      }
    },
    checkType(){
      if (this.api.type === 'clock' || this.api.type === 'scroll') {
        const dateDom = getDom(this.api.className, '.iclock-date')
        const weekDom = getDom(this.api.className, '.iclock-week')
        dateDom.style.color = weekDom.style.color = this.api.dateColor
        this.loop()
      } else if (this.api.type === 'text') {
        this.show = this.api.info
      }
    },
    checkEmoji(){
      if(this.api.emoji === 'smile'){
        smile(this.api.className)
      } else if (this.api.emoji === 'angry'){
        angry(this.api.className)
      } else if (this.api.emoji === 'jiong'){
        jiong(this.api.className)
      }
    },
    errTip(str){
      const that = this
      if(this.interval){
        clearInterval(this.interval)
      }
      const infoDom = getDom(this.api.className, '.iclock-info')
      objVal({
        color: '#c23531',
        fontSize: that.api.fontSize,
        fontFamily: that.api.fontStyle
      }, infoDom)
      if(this.api.type === 'scroll'){
        infoDom.style.display = 'block'
        const scrollDom = getDom(this.api.className, '.iclock-scroll')
        scrollDom.style.display = 'none'
      }
      this.show = 'Error~'
      console.error(str)
    },
    loop(){
      if (this.api.type === 'scroll') getDom(this.api.className, '.iclock-info').style.display = 'none'
      this.interval = setInterval(() => {
        this.initDate()
      }, 1000)
    }
  }
}
