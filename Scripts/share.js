$(function(){
    var imgUrl = '/icon/timg.jpg';  //分享的图片/小图标
    var lineLink = window.location.href;    //当前 页面 地址
    var descContent = '优秀的设计与开发外包公司';   //分享简介  小的 图文里面 的 文字部分
    var shareTitle = '一横科技，为您而来';  //标题  这里为 文章标题
    var appid = '';
    $.ajax({
        type : 'GET',
        url :  "https://www.yiheng.tech/app/wx/jsapi/wxf03e91af7eeceab6/getWxConfig", //请求控制器地址
        dataType : "json",
        data:{
            url:window.location.href
        },
        success : function(response){
            var appId = response.appid +"";     //微信公众号 appid  以下看后端备注
            var timestamp = response.timestamp + "";
            var noncestr = response.nonceStr + "";
            var signature = response.signature + "";
            console.log(response);
            wx.config({
                debug: false,//开启调试模式,调用的所有api的返回值会在客户端alert出来，所有的接口信息会在Console里显示
                appId: appId,//微信id
                timestamp: timestamp,//时间戳
                nonceStr: noncestr,//随机字符串
                signature: signature,//签名
                jsApiList: [
                    'checkJsApi',
                    'updateAppMessageShareData',
                    'updateTimelineShareData'
                ]//使用到的接口
            });
            wx.ready(function() {
                // 判断当前客户端版本是否支持指定JS接口
                wx.checkJsApi({
                    jsApiList: [
                        'onMenuShareAppMessage',
                        'onMenuShareTimeline',
                        'updateAppMessageShareData',
                        'updateTimelineShareData',
                    ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    success: function(res) {
                        console.log(JSON.stringify(res));
                        // 以键值对的形式返回，可用的api值true，不可用为false
                        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    }
                });
                // 新
                // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
                wx.updateAppMessageShareData({
                    title: shareTitle, // 分享标题
                    link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                    desc: descContent, // 分享描述
                    success: function (res) {
                        // 用户确认分享后执行的回调函数
                        //	alert("Xxinok"+JSON.stringify(res));
                    },
                    cancel: function (res) {
                        // 用户取消分享后执行的回调函数
                        //	alert("X分享取消 "+JSON.stringify(res));
                    },
                    fail: function (res) {
                         alert("X分享失败 "+JSON.stringify(res));
                    }
                });
                // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
                wx.updateTimelineShareData({
                    title: shareTitle, // 分享标题
                    desc: descContent, // 分享描述
                    link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl:'' , // 如果type是music或video，则要提供数据链接，默认为空
                    success: function (res) {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function (res) {
                        // 用户取消分享后执行的回调函数
                    },
                    fail: function (res) {

                    }
                });

                // 旧
                // 自定义“分享给朋友”
                wx.onMenuShareAppMessage({
                    title: shareTitle, // 分享标题
                    link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                    desc: descContent, // 分享描述
                    success: function (res) {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    },
                    fail: function () {
                    }
                });
                // 自定义“分享到朋友圈”
                wx.onMenuShareTimeline({
                    title: shareTitle, // 分享标题
                    desc: descContent, // 分享描述
                    link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl:'' , // 如果type是music或video，则要提供数据链接，默认为空
                    success: function (res) {
                        // 用户确认分享后执行的回调函数
                        //alert("ok"+JSON.stringify(res));
                    },
                    cancel: function (res) {
                        // 用户取消分享后执行的回调函数
                        //alert("分享取消 "+JSON.stringify(res));
                    },
                    fail: function (res) {
                    }
                });
                //-------------分享到QQ
                wx.onMenuShareQQ({
                    title: shareTitle, // 分享标题
                    desc: descContent, // 分享描述
                    link: lineLink, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function (res) {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function (res) {
                        // 用户取消分享后执行的回调函数
                    },
                    fail: function (res) {
                    }
                });
                //-------------分享到QQ空间
                wx.onMenuShareQZone({
                    title: shareTitle, // 分享标题
                    desc: descContent, // 分享描述
                    link: lineLink, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });
        },
        error:function(response){
            //alert(response.errMsg)
        }
    });
})