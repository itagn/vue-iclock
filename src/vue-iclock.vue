<template>
  <div>
    <div class="iclock">
      <div class="iclock-time" v-if="type==='clock' || type ==='scroll'">
        <span class="iclock-week">
          {{ week }}
        </span>
        <span class="iclock-date">{{ date }}</span>
      </div>
      <div class="iclock-show">
        <div class="iclock-info" >
          {{ show }}
        </div>
        <div v-if=" type === 'scroll' " class="iclock-scroll">
          <img :src="scrollUrl" alt="hours-first" :class="hf" />
          <img :src="scrollUrl" alt="hours-second" :class="hs" />
          <span>:</span>
          <img :src="scrollUrl" alt="minutes-first" :class="mf" />
          <img :src="scrollUrl" alt="minutes-second" :class="ms" />
          <span>:</span>
          <img :src="scrollUrl" alt="seconds-first" :class="sf" />
          <img :src="scrollUrl" alt="seconds-second" :class="ss" />
        </div>
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
<script src="./source/core.js"></script>
<style>
@import url('./source/index.css');
</style>
