<template>
  <div>
    <div class="iclock">
    <span class="iclock-week" v-if="display.type==='clock'">
      <span v-if="language === 'zh'">星期</span>{{ week }}
    </span>
      <span class="iclock-date" v-if="display.type==='clock'">{{ date }}</span>
      <div class="iclock-show" :title="show">
        {{ show }}
      </div>
      <div class="iclock-body">
        <div class="glasses" v-if="display.glasses">
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
        dom: null,
        show: null,
        timer: null,
        date: '',
        week: '',
        language: '',
        emoji: '',
        className: '',
        glasses: null,
        font: {}
      }
    },
    created(){
      this.scale = +this.display.scale || 1;
      this.language = this.display.language || 'en';
      this.emoji = this.display.emoji || 'smile';
      this.className = this.display.className || '';
      this.glasses = this.display.glasses || false;
      this.font = {
        type: this.display.type || 'clock',
        info: this.display.info || 'o w o',
        fontSize: this.display.fontSize || '1.5rem',
        fontColor: this.display.fontColor || 'orange',
        fontStyle: this.display.fontStyle || "Helvetica,'Microsoft YaHei'",
        dateColor: this.display.dateColor || '#999'
      }
    },
    mounted() {
      var clock = document.querySelector(this.className + " .iclock");
      this.dom = document.querySelector(this.className + " .iclock .iclock-show");

      clock.style.transform = "scale("+this.scale+")";
      clock.style.webkitTransform = "scale("+this.scale+")";

      this.dom.style.color = this.font.fontColor;
      this.dom.style.fontSize = this.font.fontSize;
      this.dom.style.fontFamily = this.font.fontStyle;

      this.init();
    },
    methods: {
      init(){
        if(this.font.type === 'clock'){
          var date = document.querySelector(this.className + " .iclock .iclock-date");
          var week = document.querySelector(this.className + " .iclock .iclock-week");
          date.style.color = this.font.dateColor;
          week.style.color = this.font.dateColor;

          this.week = this.getDate().week;
          this.date = this.getDate().date;
          this.show = this.getDate().time;
          this.loop();
        } else if(this.font.type === 'text'){
          this.show = this.font.info;
        } else {
          this.errTip('Error: props[display].type should be "clock" or "text".');
        }
        var mouse = document.querySelector(this.className + " .iclock .iclock-body .iclock-mouse");
        if(this.emoji === 'smile'){
          mouse.style.borderTop = '80px solid #ccc';
          mouse.style.borderLeft = '80px solid transparent';
          mouse.style.borderRight = '80px solid transparent';
        } else if (this.emoji === 'angry'){
          mouse.style.border = '40px solid #d53a35';
          mouse.style.borderRadius = '10%';
        } else if (this.emoji === 'jiong'){
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
        } else {
          this.errTip('Error: props[display].emoji should be "smile" or "angry".');
        }
      },
      errTip(str){
        this.dom.style.color = '#c23531';
        this.show = "Error~";
        console.error(str);
      },
      loop(){
        var _this = this;
        this.timer = setInterval(function () {
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
          var zh = ['日', '一', '二', '三', '四', '五', '六'];
          week = zh[week % 7];
          date = y+'/'+m+'/'+d;
        } else {
          var en = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          week = en[week%7];
          date = m+'/'+d+'/'+y;
        }
        return { date, time, week };
      }
    }
  }
</script>
<style>
  .iclock{
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
  .iclock > .iclock-date, .iclock-week{
    position: absolute;
    top: -14px;
    font-size: 14px;
    user-select: all;
    cursor: pointer;
  }
  .iclock > .iclock-date{
    right: 0;
  }
  .iclock > .iclock-week{
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
