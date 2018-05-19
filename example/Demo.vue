<template>
  <div>
    <div class="default demo">
      <h2>Default</h2>
      <iclock class="iclock1 clock" :display="clock1"></iclock>
    </div>
    <hr />
    <div class="type demo">
      <h2>Type:   <span>scroll</span>   |   <span>clock</span>   |   <span>text</span></h2>
      <iclock class="iclock2 clock" :display="clock2"></iclock>
      <iclock class="iclock3 clock" :display="clock3"></iclock>
      <iclock class="iclock4 clock" :display="clock4"></iclock>
    </div>
    <hr />
    <div class="emoji demo">
      <h2>Emoji:   <span>smile</span>   |   <span>angry</span>   |   <span>jiong</span></h2>
      <iclock class="iclock5 clock" :display="clock5"></iclock>
      <iclock class="iclock6 clock" :display="clock6"></iclock>
      <iclock class="iclock7 clock" :display="clock7"></iclock>
    </div>
    <hr />
    <div class="other demo">
      <h2>Other:   <span>hoverAnimation:true</span>   |   <span>language:'en'</span>  |   <span>glasses:true</span> </h2>
      <iclock class="iclock8 clock" :display="clock8"></iclock>
      <iclock class="iclock9 clock" :display="clock9"></iclock>
      <iclock class="iclock10 clock" :display="clock10"></iclock>
    </div>
    <hr />
  </div>
</template>

<script>
import { Iclock } from 'vue-iclock.vue'
export default {
  name: 'demo',
  data () {
    return {
      clock1: {
        className: '.iclock1'
      },

      clock2: {
        className: '.iclock2',
        type: 'scroll'
      },
      clock3: {
        className: '.iclock3',
        type: 'clock'
      },
      clock4: {
        className: '.iclock4',
        type: 'text',
        info: 'Itagn'
      },

      clock5: {
        className: '.iclock5',
        emoji: 'smile',
        type: 'scroll'
      },
      clock6: {
        className: '.iclock6',
        emoji: 'angry',
        type: 'clock'
      },
      clock7: {
        className: '.iclock7',
        emoji: 'jiong',
        type: 'text',
        info: 'Itagn'
      },

      clock8: {
        className: '.iclock8',
        emoji: 'smile',
        type: 'scroll',
        hoverAnimation: true
      },
      clock9: {
        className: '.iclock9',
        emoji: 'angry',
        type: 'clock',
        hoverAnimation: true,
        language: 'en'
      },
      clock10: {
        className: '.iclock10',
        emoji: 'jiong',
        type: 'text',
        info: 'Itagn',
        hoverAnimation: true,
        language: 'en',
        glasses: true
      }

    }
  },
  components: {
    Iclock
  }
}
</script>

<style scoped>
*{
  font-family: 'Courier New', Courier, monospace;
}
.demo{
  margin: 40px;
}
.clock, .demo > h2{
  margin-left: 60px;
  margin-top: 20px;
}
.clock{
  display: inline-block;
}
h2 > span{
  color: #e98f6f;
}
@media screen and (max-width: 700px){
  .demo{
    margin: 20px auto;
  }
}
</style>
