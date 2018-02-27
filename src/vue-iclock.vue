<template>
  <div class="iclock">
    <canvas class="iclock-canvas"></canvas>
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
  data (){
    return {
      canvas: null,
      ctx: null,
      timer: null
    }
  },
  mounted() {
    this.canvas = document.querySelector(".iclock .iclock-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.init();
    this.loop();
  },
  methods: {
    init(){
      var _this = this;
      _this.ctx.font = "4rem Arial";
      _this.ctx.color = "#22ade4";
      _this.ctx.textAlign = "center";
      _this.ctx.textBaseline = "middle";
      _this.ctx.fillText(_this.getDate(), 150, 80);
    },
    loop(){
      var _this = this;
      this.timer = setInterval(function () {
        _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
        _this.ctx.fillText(_this.getDate(), 150, 80);
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .iclock > .iclock-canvas{
    width: 100%;
    height: 70px;
    border: 1px solid #666;
    transform: rotateZ(12deg);
    -webkit-transform: rotateZ(12deg);
    -moz-transform: rotateZ(12deg);
    -o-transform: rotateZ(12deg);
    -ms-transform: rotateZ(12deg);
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
  .iclock-cup{
    position: absolute;
    top: 20px;
    right: 0;
    border: 4px solid #22ade4;
    border-radius: 50%;
    width: 80px;
    height: 60px;
  }
  .iclock-body > .iclock-mouse{
    width: 0;
    height: 0;
    border-left: 80px solid transparent;
    border-right: 80px solid transparent;
    border-top: 80px solid #ccc;
    margin: 20% 10% 0 10%;
  }
</style>
