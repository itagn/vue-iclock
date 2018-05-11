<template>
  <div>
    <div class="iclock">
      <div class="iclock-time" v-if="api.type==='clock' || api.type ==='scroll'">
        <span class="iclock-week">
          {{ ymd.week }}
        </span>
        <span class="iclock-date">{{ ymd.date }}</span>
      </div>
      <div class="iclock-show">
        <div class="iclock-info">
          {{ show }}
        </div>
        <div v-if="api.type === 'scroll'" class="iclock-scroll">
          <img :src="scrollUrl" alt="hours-first" :class="hms.hf" />
          <img :src="scrollUrl" alt="hours-second" :class="hms.hs" />
          <span>:</span>
          <img :src="scrollUrl" alt="minutes-first" :class="hms.mf" />
          <img :src="scrollUrl" alt="minutes-second" :class="hms.ms" />
          <span>:</span>
          <img :src="scrollUrl" alt="seconds-first" :class="hms.sf" />
          <img :src="scrollUrl" alt="seconds-second" :class="hms.ss" />
        </div>
      </div>
      <div class="iclock-body">
        <div class="glasses" v-if="api.glasses">
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
