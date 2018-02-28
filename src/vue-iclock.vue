<template>
  <div class="iclock">
    <div class="iclock-show" :title="show">{{ show }}</div>
    <div class="iclock-body">
      <div class="iclock-left-eyes"></div>
      <div class="iclock-right-eyes"></div>
      <div class="iclock-right-box">
        <div class="iclock-cup"></div>
      </div>
      <div class="iclock-mouse"></div>
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
        clock: null,
        dom: null,
        show: null,
        timer: null,
        font: {}
      }
    },
    created(){
      this.scale = +this.display.scale || 1
      this.font = {
        type: this.display.type || 'clock',
        info: this.display.info || 'o w o',
        fontSize: this.display.fontSize || '1.5rem',
        fontColor: this.display.fontColor || 'orange',
        fontStyle: this.display.fontStyle || "'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',Arial,sans-serif"
      }
    },
    mounted() {
      this.clock = document.querySelector(".iclock");
      this.dom = document.querySelector(".iclock .iclock-show");

      this.clock.style.transform = `scale(${this.scale})`;
      this.clock.style.webkitTransform = `scale(${this.scale})`;

      this.dom.style.color = this.font.fontColor;
      this.dom.style.fontSize = this.font.fontSize;
      this.dom.style.fontFamily = this.font.fontStyle;

      this.init();
    },
    methods: {
      init(){
        if(this.font.type === 'clock'){
          this.show = this.getDate();
          this.loop();
        } else if(this.font.type === 'text'){
          this.show = this.font.info;
        } else {
          this.dom.style.color = '#c23531';
          this.show = "Error~";
          console.error('Error: props[display].type should be "clock" or "text".');
        }
      },
      loop(){
        var _this = this;
        this.timer = setInterval(function () {
          _this.show = _this.getDate();
        }, 1000);
      },
      getDate(){
        var date = new Date();
        var h = date.getHours()+'';
        h = h.length === 2 ? h : '0'+h;
        var m = date.getMinutes()+'';
        m = m.length === 2 ? m : '0'+m;
        var s = date.getSeconds()+'';
        s = s.length === 2 ? s : '0'+s;
        return h+':'+m+':'+s;
      }
    }
  }
</script>
<style>
  .iclock{
    width: 200px;
  }
  .iclock > .iclock-show{
    width: 97%;
    height: 40px;
    line-height:1.4em;
    text-align: center;
    user-select: all;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    cursor: pointer;
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
    animation: smail 0.75s infinite;
    -webkit-animation: smail 0.75s infinite;
  }
  @keyframes smail {
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
  @-webkit-keyframes smail {
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
  }
  .iclock-body > .iclock-right-eyes{
    right: 20px;
    transform: rotate(-10deg);
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
    border-left: 80px solid transparent;
    border-right: 80px solid transparent;
    border-top: 80px solid #ccc;
    overflow: hidden;
  }
</style>
