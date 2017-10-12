/**
 * @author 朱海新
 * @email 122363444@qq.com
 * @create date 2017-08-31 11:42:18
 * @modify date 2017-08-31 11:42:18
 * @desc [description]
*/

export default {
    getSearchString: (key) => {
        // 获取URL中?之后的字符
        var str = location.search;
        str = str.substring(1, str.length);

        // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
        var arr = str.split("&");
        var obj = new Object();

        // 将每一个数组元素以=分隔并赋给obj对象    
        for (var i = 0; i < arr.length; i++) {
            var tmp_arr = arr[i].split("=");
            obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
        }
        return obj[key];
    },

    getQueryString: (key) => {
        // 获取URL中?之后的字符
        var strArr = location.href.split('?');

        var str = '';
        if (strArr.length == 2) {
            str = strArr[1];
        } else {
            return '';
        }

        // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
        var arr = str.split("&");
        var obj = new Object();

        // 将每一个数组元素以=分隔并赋给obj对象    
        for (var i = 0; i < arr.length; i++) {
            var tmp_arr = arr[i].split("=");
            obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
        }
        return obj[key];
    },

    langType: (type) => {
        let arr = [
            '',
            '数字',
            '字母',
            '中文',
            'Email',
            '电话号码',
        ];
        return arr[type];
    },

    validate: (val, type) => {
        let ret = false;
        switch (type) {
            case '1':
                {
                    // 数字
                    var isNumber = /^[0-9]*$/g;
                    ret = isNumber.test(val);
                }
                break;
            case '2':
                {
                    // 字母
                    var isChar = /^[a-zA-Z]*$/g;
                    ret = isChar.test(val);
                }
                break;
            case '3':
                {
                    // 中文
                    var isCnChar = /^[\u2E80-\u9FFF]+$/;
                    ret = isCnChar.test(val);
                }
                break;
            case '4':
                {
                    // email
                    var isEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
                    ret = isEmail.test(val);
                }
                break;
            case '5':
                {
                    // var isPhone = /(^(\d{3,4}-)?\d{6,8}$)|(^(\d{3,4}-)?\d{6,8}(-\d{1,5})?$)|(\d{11})/g;
                    var isPhone = /^1[34578]\d{9}$/g;
                    ret = isPhone.test(val);
                }
                break;
            case '6':
                {
                    var isIDCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                    ret = isIDCard.test(val);
                }
                break;

        }
        return ret;
    },

    hideWxShare: () => {

        function onBridgeReady() {
            WeixinJSBridge.call('hideOptionMenu');
        }

        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady();
        }
    },
    showWxShare: () => {
        
                function onBridgeReady() {
                    WeixinJSBridge.call('showOptionMenu');
                }
        
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                } else {
                    onBridgeReady();
                }
            }

}

