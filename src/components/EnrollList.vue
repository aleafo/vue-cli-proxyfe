<template>
    <div class="content enroll-list">
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    
            <li class="enroll-item" v-for="x in list" :key="x.id">
                <router-link :to="{name: 'index', query: {openId: params.openId, appId: params.appId, qaId: x.id}}">
                    <div class="top-pic">
                        <img :src="x.topPic" alt="">
                    </div>
                    <dl class="enroll-content">
                        <dt class="title">{{x.title}}</dt>
                        <dd v-if="listType==1" class="enroll-time">报名时间：
                            <span class="start-time">{{x.startTime}}</span> 至
                            <span class="end-time">{{x.endTime}}</span>
                        </dd>
                        <dd v-else class="enroll-time">活动时间：
                            <span class="start-time">{{x.activityStartTime}}</span> 至
                            <span class="end-time">{{x.activityEndTime}}</span>
                        </dd>
                    </dl>
                    
                </router-link>
    
                <div class="ext-info">
                    <div class="info-item">
                        <span class="info-item-hd">已报名</span>
                        <span class="info-item-bd">{{x.enrollmentNumber}}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-item-hd">剩余名额</span>
                        <span class="info-item-bd">{{x.limitTotal == '1' ? '不限制': x.residueNumber}}</span>
                    </div>
                    <div class="info-item">
                        <span :class="'color-state-'+x.status">{{x.status|getStatus('txt')}}</span>
                    </div>
                </div>
            </li>
    
        </ul>
        <p class="page-infinite-loading" v-show="isLoading">
            <mt-spinner type="fading-circle" :size="20"></mt-spinner>加载中...
        </p>
        <p class="page-infinite-loading" v-show="!isLoading && isComplete && isFirstLoad">
            <!-- <span v-if="listType==1" class="infinite-prompt-text">暂无结果...</span> -->
            目前还没有活动
        </p>
        <p class="page-infinite-loading" v-show="!isLoading && isComplete && !isFirstLoad">
            <span class="infinite-prompt-text">没有更多了...</span>
        </p>
    
    </div>
</template>

<script>
import Vue from 'vue';
import mintUI from 'mint-ui';

Vue.component(mintUI);

export default {

    components: {
        
    },
    props: {
        listType: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            list: [],
            isLoading: false,
            isComplete: false,
            isFirstLoad: true,
            pageNo: 1,
            params: {}
        }
    },
    name: 'EnrollList',
    created() {
        let userInfo = this.util.getQueryString('userInfo');
        let openId = this.util.getQueryString('openId');

        if (userInfo){
            let userInfoJson = JSON.parse(userInfo);
            openId = userInfoJson.openId;
        }

        this.params =  {
            appId: this.util.getQueryString('appId'),
            openId: openId,
            pageNo: 1
        }
        eventBus.auth = {
            appId: this.params.appId,
            openId: this.params.openId
        }
        console.log(this.listType);
    },
    methods: {

        loadMore() {

            //全部加载完成
            if (this.isComplete == true) return;

            //正在加载则不再触发直到加载完
            if ( this.isLoading ) return;

            this.isLoading = true;
            // console.log( eventBus.type );            

            let apiUrl = '/api/act/get-list.json';

            this.isFirstLoad = this.params.pageNo == 1 ? true : false;
            
            //模拟请求数据的延迟
            setTimeout(() => {
                // console.log('aaa')
                this.$http.get(apiUrl, {params: this.params})
                .then(res => {
                    this.isLoading = false;

                    let list = res.data.result;

                    if (list.length == 0) {
                        this.isComplete = true;
                        return;
                    }
                    this.list = this.list.concat(list);                    

                    this.params.pageNo++;                

                }).catch(function (err) {
                    console.warn(err);
                });
            }, 1500);
        }
    },
    filters: {
        getStatus(state, type) {
            let stateTxt = '';
            let stateClass = 'color-gray-light';
            //1、未开始  2、进行中，3、已暂停，4、已结束，6、已报满
            switch (state) {
                case "1":
                    stateTxt = '未开始';
                    stateClass = "color-gray-light";
                    break;
                case "2":
                    stateTxt = '进行中';
                    stateClass = "color-info"
                    break;
                case "3":
                    stateTxt = '已暂停';
                    stateClass = "color-gray-light";
                    break;
                case "4":
                    stateTxt = '已结束';
                    stateClass = "color-gray-light";
                    break;
                case "6":
                    stateTxt = '已报满';
                    stateClass = "color-danger";
                    break;


            }
            return type == 'txt' ? stateTxt : stateClass;
        }
    },
    computed: {

    }
}
</script>
<style lang="sass" scoped>

</style>
