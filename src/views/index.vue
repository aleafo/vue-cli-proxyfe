<template>
  <transition name="slide-fade" @afterEnter="afterEnter" @beforeLeave="beforeLeave">
    <div class="page index">

      <div class="bar-header">
        <div class="mint-navbar">
          <router-link :to="{name:'index', query:auth}" class="mint-tab-item is-selected">
            <div class="mint-tab-item-label">活动报名</div>
          </router-link>

          <router-link :to="{name:'index', query:auth}" class="mint-tab-item">
            <div class="mint-tab-item-label">我的报名</div>
          </router-link>
        </div>
      </div>

      <div class="bar-content">
        <enroll-list></enroll-list>

      </div>

    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import mintUI from 'mint-ui'
import EnrollList from '../components/EnrollList'

Vue.component(mintUI);

export default {
  name: 'index',

  data() {
    document.title = '活动报名';
    return {
      auth: {}
    }
  },
  activated() {
    document.title = '活动报名';
  },
  mounted() {
    this.$http.post('/api/act/get-data.json');
    // 禁用微信分享
    this.util.hideWxShare();
    this.auth = eventBus.auth;
  },
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
  components: {
    EnrollList
  }
}
</script>
<style lang="sass">

</style>
