<template>
  <div>
    <div class="iclock">
      <div class="iclock-time" v-if="type==='clock'">
        <span class="iclock-week">
          {{ week }}
        </span>
        <span class="iclock-date">{{ date }}</span>
      </div>
      <div class="iclock-show" :title="show">
        {{ show }}
      </div>
      <div class="iclock-body">
        <div class="glasses" v-if="glasses">
          <div class="glasses-left"></div>
          <div class="glasses-mid"></div>
          <div class="glasses-right"></div>
        </div>
        <div class="iclock-left-eyes"></div>
        <div class="iclock-right-eyes"></div>
        <div class="iclock-right-box">
          <div class="iclock-cup"></div>
        </div>
        <div class="iclock-mouse"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    props: {
      display: {
        type: Object
      }
    },
    data (){
      return {
        show: '',
        date: '',
        week: '',
        language: this.display.language || 'en',
        emoji: this.display.emoji || 'smile',
        className: this.display.className || '',
        glasses: this.display.glasses || false,
        scale: +this.display.scale || 1,
        type: this.display.type || 'clock',
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
        this.show = this.getDate().time;
      },
      init(){
        var clock = document.querySelector(this.className + " .iclock");
        if(clock){
          this.initStyle();
          this.checkType();
          this.checkEmoji();
        } else {
          this.errTip('Error: props[display].className of dom does not exist!')
        }
      },
      initStyle(){
        var clock = document.querySelector(this.className + " .iclock");
        clock.style.transform = "scale("+this.scale+")";
        clock.style.webkitTransform = "scale("+this.scale+")";
        clock.style.fontFamily = this.fontStyle;
        var dom = document.querySelector(this.className + " .iclock .iclock-show");
        dom.style.color = this.fontColor;
        dom.style.fontSize = this.fontSize;
      },
      checkType(){
        if(this.type === 'clock'){
          var date = document.querySelector(this.className + " .iclock .iclock-date");
          var week = document.querySelector(this.className + " .iclock .iclock-week");
          date.style.color = this.dateColor;
          week.style.color = this.dateColor;
          this.loop();
        } else if(this.type === 'text'){
          this.show = this.info;
        } else {
          this.errTip('Error: props[display].type should be "clock" or "text".');
        }
      },
      checkEmoji(){
        var mouse = document.querySelector(this.className + " .iclock .iclock-body .iclock-mouse");
        if(this.emoji === 'smile'){
          this.smile(mouse);
        } else if (this.emoji === 'angry'){
          this.angry(mouse);
        } else if (this.emoji === 'jiong'){
          this.jiong(mouse);
        } else {
          this.errTip('Error: props[display].emoji should be "smile", "angry" or "jiong".');
        }
      },
      errTip(str){
        var dom = document.querySelector(".iclock .iclock-show");
        dom.style.color = '#c23531';
        dom.style.fontSize = this.fontSize;
        dom.style.fontFamily = this.fontStyle;
        console.error(str);
      },
      loop(){
        var _this = this;
        setInterval(function () {
          _this.show = _this.getDate().time;
        }, 1000);
      },
      getDate(){
        var dates = new Date();
        var h = dates.getHours()+'';
        h = h.length === 2 ? h : '0'+h;
        var m = dates.getMinutes()+'';
        m = m.length === 2 ? m : '0'+m;
        var s = dates.getSeconds()+'';
        s = s.length === 2 ? s : '0'+s;
        var time = h+':'+m+':'+s;
        var y = dates.getFullYear();
        var m = dates.getMonth() + 1;
        var d = dates.getDate();
        var date;
        var week = dates.getDay();
        if(this.language === 'zh') {
          var zh = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
          week = zh[week % 7];
          date = y+'/'+m+'/'+d;
        } else {
          var en = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          week = en[week%7];
          date = m+'/'+d+'/'+y;
        }
        return { date, time, week };
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
        var leftEye = document.querySelector(this.className + " .iclock .iclock-body .iclock-left-eyes");
        var rightEye = document.querySelector(this.className + " .iclock .iclock-body .iclock-right-eyes");
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
</script>
<style>
  .iclock{
    position: relative;
    display: inline-block;
    width: 200px;
  }
  .iclock > .iclock-show{
    position: relative;
    width: 97%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    user-select: all;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
  .iclock-time > .iclock-date, .iclock-week{
    position: absolute;
    top: -14px;
    font-size: 14px;
    user-select: all;
    cursor: pointer;
  }
  .iclock-time > .iclock-date{
    right: 0;
  }
  .iclock-time > .iclock-week{
    left: 0;
  }
  .iclock > .iclock-body{
    position: relative;
    width: 100%;
    height: 100px;
    border-radius: 2%;
    border: 2px solid #22ade4;
    background-color: #fff;
    cursor: pointer;
  }
  .iclock-body:hover .iclock-mouse{
    animation: ppp 0.75s infinite;
    -webkit-animation: ppp 0.75s infinite;
  }
  .iclock-body .glasses{
    position: absolute;
    top: -8px;
    left: 8px;
    z-index: 2;
  }
  .glasses-left, .glasses-right{
    position: absolute;
    top: 0;
    width: 70px;
    height: 30px;
    border: 3px solid #000;
    border-radius: 10%;
    display: inline-block;
    background-color: transparent;
  }
  .glasses > .glasses-mid{
    position: absolute;
    top: 30px;
    left: 60px;
    width: 40px;
    height: 3px;
    background-color: #000;
    display: inline-block;
  }
  .glasses > .glasses-left{
    left: 0;
  }
  .glasses >.glasses-right{
    left: 90px;
  }
  .iclock-left-eyes, .iclock-right-eyes{
    position: absolute;
    top: 15px;
    width: 60px;
    height: 6px;
    background-color: #22ade4;
  }
  .iclock-body > .iclock-left-eyes{
    left: 20px;
    transform: rotate(10deg);
    -webkit-transform: rotate(10deg);
  }
  .iclock-body > .iclock-right-eyes{
    right: 20px;
    transform: rotate(-10deg);
    -webkit-transform: rotate(-10deg);
  }
  .iclock-body > .iclock-right-box{
    position: absolute;
    top: 0;
    right: -50px;
    width: 50px;
    height: 100%;
    overflow: hidden;
  }
  .iclock-right-box > .iclock-cup{
    position: absolute;
    top: 20px;
    right: 0;
    border: 4px solid #22ade4;
    border-radius: 50%;
    width: 80px;
    height: 60px;
  }
  .iclock-body > .iclock-mouse{
    position: relative;
    left: 20px;
    top: 40px;
    width: 0;
    height: 0;
    overflow: hidden;
  }
  @keyframes ppp {
    0% { transform: scale(1) }
    10% { transform: scale(1.2) }
    20% { transform: scale(1.1) }
    30% { transform: scale(1.2) }
    40% { transform: scale(1.1) }
    50% { transform: scale(1.2) }
    60% { transform: scale(1.1) }
    70% { transform: scale(1.2) }
    80% { transform: scale(1.1) }
    90% { transform: scale(1.2) }
    100% { transform: scale(0.9) }
  }
  @-webkit-keyframes ppp {
    0% { -webkit-transform: scale(1) }
    10% { -webkit-transform: scale(1.2) }
    20% { -webkit-transform: scale(1.1) }
    30% { -webkit-transform: scale(1.2) }
    40% { -webkit-transform: scale(1.1) }
    50% { -webkit-transform: scale(1.2) }
    60% { -webkit-transform: scale(1.1) }
    70% { -webkit-transform: scale(1.2) }
    80% { -webkit-transform: scale(1.1) }
    90% { -webkit-transform: scale(1.2) }
    100% { -webkit-transform: scale(0.9) }
  }
</style>
