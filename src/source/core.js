import time from '../time.png';
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
      mode: this.display.mode || 'default',
      language: this.display.language === 'en' ? 'en' : 'zh',
      emoji: this.display.emoji || 'smile',
      className: this.display.className || '',
      glasses: this.display.glasses ? true : false,
      scale: +this.display.scale || 1,
      info: this.display.info || 'o w o',
      fontSize: this.display.fontSize || '1.5rem',
      fontColor: this.display.fontColor || 'orange',
      fontStyle: this.display.fontStyle || "Helvetica,'Microsoft YaHei'",
      dateColor: this.display.dateColor || '#999'
    }
  },
  created(){
    this.initData();
  },
  mounted() {
    this.init();
  },
  methods: {
    initData(){
      this.week = this.getDate().week;
      this.date = this.getDate().date;
      this.show = this.getTime();
    },
    init(){
      const clock = document.querySelector(`${this.className} .iclock`);
      if(clock){
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
      if(this.type !== 'clock' && this.type !== 'text'){
        this.errTip('Error: props[display].type should be "clock" or "text".');
        tf = false;
      }
      if(this.mode !== 'default' && this.mode !== 'scroll'){
        this.errTip('Error: props[display].type should be "default" or "scroll".');
        tf = false;
      }
      if(this.emoji !== 'smile' && this.emoji !== 'angry' && this.emoji !== 'jiong'){
        this.errTip('Error: props[display].emoji should be "smile", "angry" or "jiong".');
        tf = false;
      }
      return tf;
    },
    initStyle(){
      const clock = document.querySelector(`${this.className} .iclock`);
      clock.style.transform = `scale(${this.scale})`;
      clock.style.webkitTransform = `scale(${this.scale})`;
      clock.style.fontFamily = this.fontStyle;
      const dom = document.querySelector(`${this.className} .iclock .iclock-show`);
      dom.style.color = this.fontColor;
      dom.style.fontSize = this.fontSize;
    },
    checkType(){
      if(this.type === 'clock'){
        const date = document.querySelector(`${this.className} .iclock .iclock-date`);
        const week = document.querySelector(`${this.className} .iclock .iclock-week`);
        date.style.color = this.dateColor;
        week.style.color = this.dateColor;
        this.loop();
      } else if(this.type === 'text'){
        this.show = this.info;
      }
    },
    checkEmoji(){
      const mouse = document.querySelector(`${this.className} .iclock .iclock-body .iclock-mouse`);
      if(this.emoji === 'smile'){
        this.smile(mouse);
      } else if (this.emoji === 'angry'){
        this.angry(mouse);
      } else if (this.emoji === 'jiong'){
        this.jiong(mouse);
      }
    },
    errTip(str){
      if(this.interval){
        clearInterval(this.interval);
      }
      const dom = document.querySelector(".iclock .iclock-info");
      dom.style.color = '#c23531';
      dom.style.fontSize = this.fontSize;
      dom.style.fontFamily = this.fontStyle;
      if(this.type === 'clock' && this.mode === 'scroll'){
        dom.style.display = 'block';
        const scroll = document.querySelector(".iclock .iclock-scroll");
        scroll.style.display = 'none';
      }
      this.show = 'Error~';
      console.error(str);
    },
    loop(){
      if (this.mode === 'scroll'){
        const dom = document.querySelector(".iclock .iclock-info");
        dom.style.display = 'none';
        this.interval = setInterval(() => {
          this.getTime();
        }, 1000);
      } else if (this.mode === 'default'){
        this.interval = setInterval(() => {
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

      if(this.mode === 'default'){
        return `${h}:${m}:${s}`;
      } else if(this.mode === 'scroll') {
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
    smile(mouse){
      mouse.style.borderTop = '80px solid #ccc';
      mouse.style.borderLeft = '80px solid transparent';
      mouse.style.borderRight = '80px solid transparent';
    },
    angry(mouse){
      mouse.style.border = '40px solid #d53a35';
      mouse.style.borderRadius = '10%';
    },
    jiong(mouse){
      const leftEye = document.querySelector(`${this.className} .iclock .iclock-body .iclock-left-eyes`);
      const rightEye = document.querySelector(`${this.className} .iclock .iclock-body .iclock-right-eyes`);
      leftEye.style.transform = 'rotate(-10deg)';
      leftEye.style.webkitTransform = 'rotate(-10deg)';
      rightEye.style.transform = 'rotate(10deg)';
      rightEye.style.webkitTransform = 'rotate(10deg)';
      mouse.style.border = '40px solid #e98f6f';
      mouse.style.borderRadius = '10%';
      mouse.style.left = '56px';
      mouse.style.width = '10px';
    }
  }
}