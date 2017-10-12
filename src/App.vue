<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <transition name="slide-fade">
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    afterEnter() {
      let pos = localStorage['mypos'];

      pos = pos ? JSON.parse(pos) : { x: 0, y: 0 }

      this.$nextTick(() => {
        document.querySelector('.content').scrollTop = pos.y;
        document.querySelector('.content').scrollLeft = pos.x;
      })

    },
    beforeLeave() {

      //记录位置
      let pos = {
        x: document.querySelector('.content').scrollLeft,
        y: document.querySelector('.content').scrollTop
      }
      console.log('my-page', pos);
      localStorage['mypos'] = JSON.stringify(pos);

    }
  },
}
</script>
