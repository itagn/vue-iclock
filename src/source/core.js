import time from './time.png';
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
      hf: 'num num0',
      hs: 'num num0',
      mf: 'num num0',
      ms: 'num num0',
      sf: 'num num0',
      ss: 'num num0',
      show: '',
      date: '',
      week: '',
      type: this.display.type || 'clock',
      language: this.display.language === 'en' ? 'en' : 'zh',
      emoji: this.display.emoji || 'smile',
      className: this.display.className || '',
      glasses: this.display.glasses ? true : false,
      scale: +this.display.scale || 1,
      info: this.display.info || 'o w o',
      hoverAnimation: this.display.hoverAnimation ? true : false,
      fontSize: this.display.fontSize || '1.5rem',
      fontColor: this.display.fontColor || 'orange',
      fontStyle: this.display.fontStyle || "Helvetica,'Microsoft YaHei'",
      dateColor: this.display.dateColor || '#999'
    }
  },
  created(){
    this.initDate();
    this.show = this.getTime();
  },
  mounted() {
    this.init();
  },
  methods: {
    initDate(){
      this.week = this.getDate().week;
      this.date = this.getDate().date;
    },
    init(){
      const clockDom = document.querySelector(`${this.className} .iclock`);
      if(clockDom){
        if(this.checkError()){
          this.initStyle();
          this.checkType();
          this.checkEmoji();
        }
      } else {
        this.errTip('Error: props[display].className of dom does not exist!');
      }
    },
    checkError(){
      let tf = true;
      if(this.type !== 'clock' && this.type !== 'text' && this.type!== 'scroll'){
        this.errTip('Error: props[display].type should be "clock", "text" or "scroll".');
        tf = false;
      }
      if(this.emoji !== 'smile' && this.emoji !== 'angry' && this.emoji !== 'jiong' && this.emoji !== 'owo'){
        this.errTip('Error: props[display].emoji should be "smile", "angry", "jiong" or "owo".');
        tf = false;
      }
      return tf;
    },
    initStyle(){
      const that = this;
      const clockDom = document.querySelector(`${this.className} .iclock`);
      this.objVal({
        transform: `scale(${this.scale})`,
        webkitTransform: `scale(${this.scale})`,
        fontFamily: that.fontStyle
      }, clockDom);
      const showDom = document.querySelector(`${this.className} .iclock .iclock-show`);
      this.objVal({
        color:　that.fontColor,
        fontSize: that.fontSize
      }, showDom);
      this.checkAnimation();
    },
    checkAnimation(){
      const that = this;
      if(this.hoverAnimation){
        const bodyDom = document.querySelector(`${this.className} .iclock .iclock-body`);
        const mouseDom = document.querySelector(`${this.className} .iclock .iclock-mouse`);
        let animationName = 'ppp', animationTime = '0.75s';
        this.domHover(bodyDom, function () {
          that.objVal({
            animation: `${animationName} ${animationTime} infinite`,
            webkitAnimation: `${animationName} ${animationTime} infinite`
          }, mouseDom);
        }, function () {
          that.objVal({
            animation: ``,
            webkitAnimation: ``
          }, mouseDom);
        })
      }
    },
    checkType(){
      if(this.type === 'clock' || this.type === 'scroll'){
        const dateDom = document.querySelector(`${this.className} .iclock .iclock-date`);
        const weekDom = document.querySelector(`${this.className} .iclock .iclock-week`);
        dateDom.style.color = this.dateColor;
        weekDom.style.color = this.dateColor;
        this.loop();
      } else if(this.type === 'text'){
        this.show = this.info;
      }
    },
    checkEmoji(){
      const mouseDom = document.querySelector(`${this.className} .iclock .iclock-body .iclock-mouse`);
      if(this.emoji === 'smile'){
        this.smile(mouseDom);
      } else if (this.emoji === 'angry'){
        this.angry(mouseDom);
      } else if (this.emoji === 'jiong'){
        this.jiong(mouseDom);
      }
    },
    errTip(str){
      const that = this;
      if(this.interval){
        clearInterval(this.interval);
      }
      const infoDom = document.querySelector(".iclock .iclock-info");
      this.objVal({
        color: '#c23531',
        fontSize: that.fontSize,
        fontFamily: that.fontStyle
      }, infoDom);
      if(this.type === 'scroll'){
        infoDom.style.display = 'block';
        const scrollDom = document.querySelector(".iclock .iclock-scroll");
        scrollDom.style.display = 'none';
      }
      this.show = 'Error~';
      console.error(str);
    },
    loop(){
      if (this.type === 'scroll'){
        const infoDom = document.querySelector(".iclock .iclock-info");
        infoDom.style.display = 'none';
        this.interval = setInterval(() => {
          this.initDate();
          this.getTime();
        }, 1000);
      } else if (this.type === 'clock'){
        this.interval = setInterval(() => {
          this.initDate();
          this.show = this.getTime();
        }, 1000);
      }

    },
    getTime(){
      const dates = new Date();
      let h = dates.getHours()+'';
      h = h.length === 2 ? h : `0${h}`;
      let m = dates.getMinutes()+'';
      m = m.length === 2 ? m : `0${m}`;
      let s = dates.getSeconds()+'';
      s = s.length === 2 ? s : `0${s}`;

      if(this.type === 'clock'){
        return `${h}:${m}:${s}`;
      } else if(this.type === 'scroll') {
        [this.hf, this.hs] = [`num num${h[0]}`, `num num${h[1]}`];
        [this.mf, this.ms] = [`num num${m[0]}`, `num num${m[1]}`];
        [this.sf, this.ss] = [`num num${s[0]}`, `num num${s[1]}`];
      }
    },
    getDate(){
      const dates = new Date();
      let y = dates.getFullYear(), m = dates.getMonth() + 1, d = dates.getDate();
      let date, week = dates.getDay();
      if(this.language === 'zh') {
        let zh = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        week = zh[week % 7];
        date = `${y}/${m}/${d}`;
      } else {
        let en = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        week = en[week%7];
        date = `${m}/${d}/${y}`;
      }
      return { date, week };
    },
    domHover(dom, fnOver, fnOut ) {
      dom.onmouseenter = fnOver;
      dom.onmouseleave = fnOut;
    },
    objVal(obj, dom){
      Object.keys(obj).forEach(val => {
          dom.style[val] = obj[val];
      })
    },
    smile(mouseDom){
      this.objVal({
        borderTop: '80px solid #ccc',
        borderLeft: '80px solid transparent',
        borderRight: '80px solid transparent'
      }, mouseDom);
    },
    angry(mouseDom){
      this.objVal({
        border: '40px solid #d53a35',
        borderRadius: '10%'
      }, mouseDom);
    },
    jiong(mouseDom){
      let deg = 10;
      const leftDom = document.querySelector(`${this.className} .iclock .iclock-body .iclock-left-eyes`);
      this.objVal({
        transform: `rotate(${-deg}deg)`,
        webkitTransform: `rotate(${-deg}deg)`
      }, leftDom);
      const rightDom = document.querySelector(`${this.className} .iclock .iclock-body .iclock-right-eyes`);
      this.objVal({
        transform: `rotate(${deg}deg)`,
        webkitTransform: `rotate(${deg}deg)`
      }, rightDom);
      this.objVal({
        border: '40px solid #e98f6f',
        borderRadius: '10%',
        left: '56px',
        width: '10px'
      }, mouseDom);
    }
  }
}
