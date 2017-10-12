import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'

Vue.use(Router)

// const PREFIX = '/alliance';
const PREFIX = '';

const router = new Router({

  mode: 'history',

  routes: [

    //首页
    { path: PREFIX + '/', name: 'index', component: index, meta: { keepAlive: true } }
  ]
});


/**
 * 记住列表位置
 */
router.beforeEach((to, from, next) => {

  //从列表页点击进入其他页面，保存当前位置
  if (from.name == 'index' || from.name == 'my') {
    //记录位置
    let pos = {
      x: document.querySelector('.content').scrollLeft,
      y: document.querySelector('.content').scrollTop
    }
    localStorage[from.name + 'pos'] = JSON.stringify(pos);
  }

  next()
});


//从其他页面进入列表页，滚动到指定位置
router.afterEach((to, from, next) => {

  if (to.name == 'index' || to.name == 'my') {
    let pos = localStorage[to.name + 'pos'];

    pos = pos ? JSON.parse(pos) : { x: 0, y: 0 }

    Vue.nextTick(() => {
      document.querySelector('.content').scrollTop = pos.y;
      document.querySelector('.content').scrollLeft = pos.x;
    })
  }

});

export default router;

