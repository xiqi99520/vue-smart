import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import storage from '../utils/storage'
import Qs from 'qs'
import router from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 定义状态
    state: {
        user: true,
        nodata: false,
        socketObj: null, //当前设备的类
        cookieVals: {},
        devices: [],
        ws: null,
        eqUl: [],
        eqLen: '',
        baseScene: [],
        YzyEqUl: [],
        sersorName: '',
        curShort: '',
        allIntegral: '',
        signinRecord: [],
        signinDates: [],
        curDataArr: [],
        daysArr: ['昨天', '今天', '明天', '', '', ''],
        signinDays: [0, 0, 0, 0, 0, 0],
        integrals: ['+5', '+6', '+7', '+8', '+9', '+10'],
        signInStatus: '',
        signInStatusNum: 0,
        isshow: 0,
        isSignIn: '',
        continueTimes: 0,
        goodsList: [],
        macAddress: '',
        isblur: 1,
        successNum: '',
        countPoint: '',
        recommendIntegrals: [],
        houseManagerList: [],
        username: '',
        familyNum: ''
    },
    mutations: {
        initUser() { //初始化会员中心
            let _this = this;
            _this.commit('GetCookie', { cvalue: "id" });
            _this.commit('GetCookie', { cvalue: 'eqLength' });
            _this.state.eqLen = _this.state.cookieVals.eqLength;
            let params = {
                'id': _this.state.cookieVals.id,
            }
            let curParams = Qs.stringify(params);
            axios.post('/zzjj-app/member/findById.do', curParams).then(response => {
                if (response.data.isSuccess == 0) {
                    _this.state.username = response.data.entity.nickname;
                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        initFamily() {
            let _this = this;
            _this.commit('GetCookie', { cvalue: "id" });
            _this.commit('GetCookie', { cvalue: "houseId" });
            let params = {
                'memberId': _this.state.cookieVals.id,
                'yzyMemberId': _this.state.cookieVals.houseId
            }
            let curParams = Qs.stringify(params);
            axios.post('/zzjj-app/yzydeviceshare/findMyShare.do', curParams).then(response => {
                if (response.data.isSuccess == 0) {
                    _this.state.familyNum = response.data.data.length;
                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        isLogin() { //获取登录状态
            this.commit('GetCookie', { cvalue: 'userStatus' });
            if (this.state.cookieVals.userStatus) {
                this.state.user = true;
            } else {
                this.state.user = false;
            }
        },
        toLogin(obj, data) { //登录
            let _this = this;
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!reg.test(data.user)) {
                _this.commit('signInTip', { msg: '请输入正确手机号', status: 0 });
                return false;
            }
            let params = {
                'phone': data.user,
                'password': data.password
            }
            let curParams = Qs.stringify(params);
            axios.post('/zzjj-app/login/passwordlogin.do', curParams).then(response => {
                if (response.data.isSuccess == 0) {
                    _this.commit('SetCookie', { cname: "userStatus", cvalue: 1, exdays: 1 });
                    window.location.href = '/user';
                } else {
                    _this.commit('signInTip', { msg: response.data.errorMsg, status: 0 });
                    return;
                }
            }).catch(error => {
                alert("服务器返回数据错误");
                return;
            })
        },
        signOut() { //退出登录
            this.commit('SetCookie', { cname: "account", cvalue: '', exdays: 1 });
            this.commit('SetCookie', { cname: "otherId", cvalue: '', exdays: 1 });
            this.commit('SetCookie', { cname: "yPassword", cvalue: '', exdays: 1 });
            this.commit('SetCookie', { cname: "id", cvalue: '', exdays: 1 });
            this.commit('SetCookie', { cname: "telephone", cvalue: '', exdays: 1 });
            this.commit('SetCookie', { cname: "access_token", cvalue: '', exdays: 1 });
            this.commit('SetCookie', { cname: "refresh_token", cvalue: '', exdays: 1 });
            this.commit('SetCookie', { cname: "user_id", cvalue: '', exdays: 1 });
            this.commit('SetCookie', { cname: "authorize", cvalue: '', exdays: 1 });
            this.commit('SetCookie', { cname: "userStatus", cvalue: '', exdays: 1 });
            window.location.href = "/";
        },
        getVerification(obj, data) { //登录获取验证码
            let _this = this;
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!reg.test(data.number) || !data.number) {
                _this.commit('signInTip', { msg: '请输入正确手机号', status: 0 });
                return false;
            }
            let params = {
                'phone': data.number
            }
            let curParams = Qs.stringify(params);
            axios.post('/zzjj-app/login/codeLoginSendMsg.do', curParams).then(response => {
                if (response.data.isSuccess == 0) {
                    console.log('验证码获取成功');
                    return;
                } else {
                    _this.commit('signInTip', { msg: response.data.errorMsg, status: 0 });
                    return;
                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        verificationLogin(obj, data) { //验证码登录
            let _this = this;
            let params = {
                'phone': data.number,
                'code': data.codes
            }
            let curParams = Qs.stringify(params);
            axios.post('/zzjj-app/login/codelogin.do', curParams).then(response => {
                if (response.data.isSuccess == 0) {
                    _this.commit('SetCookie', { cname: "userStatus", cvalue: 1, exdays: 1 });
                    window.location.href = '/user';
                } else {

                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        getRegisterCode(obj, data){ //注册获取验证码
            let _this = this;
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!reg.test(data.number) || !data.number) {
                _this.commit('signInTip', { msg: '请输入正确手机号', status: 0 });
                return false;
            }
            let params = {
                'phone': data.number
            }
            let curParams = Qs.stringify(params);
            axios.post('/zzjj-app/register/sendCodeMsg.do', curParams).then(response => {
                if (response.data.isSuccess == 0) {
                    console.log('验证码获取成功');
                    return;
                } else {
                    _this.commit('signInTip', { msg: response.data.errorMsg, status: 0 });
                    return;
                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        submitRegister(obj, data){ //提交注册
            let _this = this;
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!reg.test(data.number) || !data.number) {
                _this.commit('signInTip', { msg: '请输入正确手机号', status: 0 });
                return false;
            }
            if (!data.codes) {
                _this.commit('signInTip', { msg: '请输入验证码', status: 0 });
                return false;
            }
            if (!data.psw) {
                _this.commit('signInTip', { msg: '请输入密码', status: 0 });
                return false;
            }
            if (data.psw.length < 6) {
                _this.commit('signInTip', { msg: '密码至少为6位字符', status: 0 });
                return false;
            }
            if (!data.surePsw) {
                _this.commit('signInTip', { msg: '请确认密码', status: 0 });
                return false;
            }
            if (data.surePsw != data.psw) {
                _this.commit('signInTip', { msg: '请确保两次输入密码一致', status: 0 });
                return false;
            }
            let params = {
                'phone': data.number,
                'code': data.codes,
                'password': data.psw
            }
            let curParams = Qs.stringify(params);
            axios.post('/zzjj-app/register/appRegister.do', curParams).then(response => {
                console.log('提交注册', response);
                if (response.data.isSuccess == 0) {
                    _this.commit('signInTip', { msg: '注册成功', status: 1 });
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 1000)
                    return;
                } else {
                    _this.commit('signInTip', { msg: response.data.errorMsg, status: 0 });
                    return;
                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        getFixCode(obj, data){ //修改密码获取验证码
            let _this = this;
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!reg.test(data.number) || !data.number) {
                _this.commit('signInTip', { msg: '请输入正确手机号', status: 0 });
                return false;
            }
            let params = {
                'phone': data.number
            }
            let curParams = Qs.stringify(params);
            axios.post('/zzjj-app/login/updatePasswordSendMsg.do', curParams).then(response => {
                if (response.data.isSuccess == 0) {
                    console.log('验证码获取成功');
                    return;
                } else {
                    _this.commit('signInTip', { msg: response.data.errorMsg, status: 0 });
                    return;
                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        submitFix(obj, data){ //提交修改
            let _this = this;
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!reg.test(data.number) || !data.number) {
                _this.commit('signInTip', { msg: '请输入正确手机号', status: 0 });
                return false;
            }
            if (!data.codes) {
                _this.commit('signInTip', { msg: '请输入验证码', status: 0 });
                return false;
            }
            if (!data.psw) {
                _this.commit('signInTip', { msg: '请输入密码', status: 0 });
                return false;
            }
            if (data.psw.length < 6) {
                _this.commit('signInTip', { msg: '密码至少为6位字符', status: 0 });
                return false;
            }
            if (!data.surePsw) {
                _this.commit('signInTip', { msg: '请确认密码', status: 0 });
                return false;
            }
            if (data.surePsw != data.psw) {
                _this.commit('signInTip', { msg: '请确保两次输入密码一致', status: 0 });
                return false;
            }
            let params = {
                'phone': data.number,
                'code': data.codes,
                'password': data.psw
            }
            let curParams = Qs.stringify(params);
            axios.post('/zzjj-app/login/updatePassword.do', curParams).then(response => {
                if (response.data.isSuccess == 0) {
                    _this.commit('signInTip', { msg: '修改密码成功', status: 1 });
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 1000)
                    return;
                } else {
                    _this.commit('signInTip', { msg: response.data.errorMsg, status: 0 });
                    return;
                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        initGifts() { //积分兑换奖品列表
            let _this = this;
            axios.get('/zzjj-app/goodschange/findDefaultGood.do').then(response => {
                _this.state.goodsList.length = 0;
                if (response.status == 200) {
                    let defaultData = response.data.data;
                    storage.setStorage('giftList', defaultData, 1);
                    defaultData.map(function(item, index) {
                        _this.state.goodsList.push(item);
                    })
                } else {

                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        goodsArr(){
            this.state.goodsList.length = 0;
            storage.getStorage('giftList').map((item) => {
                this.state.goodsList.push(item);
            })
        },
        getIntegral() { //获取当前积分
            let _this = this;
            this.commit('GetCookie', { cvalue: 'id' });
            let params = {
                'memberId': _this.state.cookieVals.id
            }
            let curParams = Qs.stringify(params);
            axios.post('/zzjj-app/memberintegrallog/findTwoIntegralLog.do', curParams).then(response => {
                console.log('可用积分', response);
                if (response.status == 200) {
                    _this.state.allIntegral = response.data.countPoint;
                    storage.setStorage('allIntegral', response.data.countPoint, 1);
                    _this.state.signinRecord.length = 0;
                    response.data.data.map(function(item) {
                        _this.state.signinRecord.push(item);
                    })
                    _this.commit('initSign');
                } else {

                }
            }).catch(error => {
                alert("服务器返回数据错误");
                this.state.isblur = 0;
            })
        },
        initHost(){
            this.commit('GetCookie', { cvalue: 'eqLength' });
            this.commit('GetCookie', { cvalue: 'user_id' });
            this.commit('GetCookie', { cvalue: 'access_token' });
            axios({
                method: 'get',
                url: `/v2/user/${this.state.cookieVals.user_id}/subscribe/devices`,
                headers: { 'Access-Token': this.state.cookieVals.access_token }
            }).then(response => {
                if (response.data.length == true) {
                    this.state.macAddress = response.data[0].mac;
                    this.state.curOpacity = 1;
                } else {
                    this.state.curOpacity = .5;
                    this.commit('signInTip', { msg: '您尚未绑定主机', status: 0 });
                    setTimeout(function(){
                        window.location.href = '/';
                    }, 1000)
                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        delHost() {
            if(this.state.curOpacity != 1) return;
            this.commit('GetCookie', { cvalue: 'hostId' });
            this.commit('GetCookie', { cvalue: 'user_id' });
            this.commit('GetCookie', { cvalue: 'access_token' });
            let _this = this;
            let params = {
                'device_id': this.state.cookieVals.hostId
            }
            let curParams = JSON.stringify(params);
            axios({
                method: 'post',
                url: `/v2/user/${this.state.cookieVals.user_id}/unsubscribe`,
                headers: { 'Access-Token': _this.state.cookieVals.access_token },
                data: curParams
            }).then(response => {
                this.commit('signInTip', { msg: '主机已删除', status: 1 });
                setTimeout(function(){
                    window.location.href = '/';
                }, 1000)
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        initSign() { //检查已签到的记录
            this.commit('calculationDays');
            let _this = this;
            let today = _this.state.curDataArr;
            let nearYMD = [];
            let nextYMD = [];
            _this.state.curDataArr['year'] = new Date().getFullYear();
            _this.state.curDataArr['month'] = new Date().getMonth() + 1;
            _this.state.curDataArr['date'] = new Date().getDate();
            _this.state.signinDates.length = 0;
            let nearDay = new Date(this.state.signinRecord[0].createDate); //最近一次签到时间
            nearYMD['year'] = nearDay.getFullYear();
            nearYMD['month'] = nearDay.getMonth() + 1;
            nearYMD['date'] = nearDay.getDate();
            let nextDay = new Date(this.state.signinRecord[0].createDate + 86400000); //最近一次签到时间的次日
            nextYMD['year'] = nextDay.getFullYear();
            nextYMD['month'] = nextDay.getMonth() + 1;
            nextYMD['date'] = nextDay.getDate();
            if (nextYMD.year == today.year && nextYMD.month == today.month && nextYMD.date == today.date) {//连续签到几天,今天未签
                _this.state.continueTimes = this.state.signinRecord[0].integral - 4;
            } else if (nearYMD.year == today.year && nearYMD.month == today.month && nearYMD.date == today.date) {//连续签到几天,今天已签
                _this.state.continueTimes = this.state.signinRecord[0].integral - 4;
            } else { //连续签到已断
                _this.state.continueTimes = 0;
            }
            if(_this.state.continueTimes == 0) { //未开始签到
                // _this.state.signinDays.splice(1, 1, '1');
                _this.state.isSignIn = true;
                for (let i = 1; i < 6; i++) {
                    _this.state.integrals.splice(i, 1, '+' + (i + 4));
                }
                return;
            }
            if (_this.state.continueTimes == 1) { //签到次数1天
                if (nearYMD.year == today.year && nearYMD.month == today.month && nearYMD.date == today.date) {
                    _this.state.signinDays.splice(1, 1, '1');
                    _this.state.isSignIn = false;
                    for (let i = 1; i < 6; i++) {
                        _this.state.integrals.splice(i, 1, '+' + (i + 4));
                    }
                    return;
                } else if (nextYMD.year == today.year && nextYMD.month == today.month && nextYMD.date == today.date) {
                    _this.state.signinDays.splice(0, 1, '1');
                    _this.state.isSignIn = true;
                    for (let i = 0; i < 6; i++) {
                        _this.state.integrals.splice(i, 1, '+' + (i + 5));
                    }
                    return;
                }
            } else { //签到次数大于1或连续签到已断
                if (nextYMD.year == today.year && nextYMD.month == today.month && nextYMD.date == today.date) { //代表今天未签状态
                    let max = _this.state.continueTimes - 5 < 0 ? _this.state.continueTimes : 5;
                    let yesterdayIntegral = this.state.signinRecord[0].integral;
                    _this.state.isSignIn = true;

                    for (let i = 0; i < max; i++) {
                        _this.state.signinDays.splice(i, 1, '1');
                    }
                    if (yesterdayIntegral <= 8) {
                        for (let i = 0; i < 6; i++) {
                            _this.state.integrals.splice(i, 1, '+' + (i + 5));
                        }
                    } else {
                        for (let i = 0; i < 6; i++) {
                            if (yesterdayIntegral - (5 - i - 2) > 11) {
                                _this.state.integrals.splice(i, 1, '+' + (yesterdayIntegral - (5 - i + 5)));
                            } else {
                                _this.state.integrals.splice(i, 1, '+' + (yesterdayIntegral - (5 - i - 2)));
                            }
                        }
                    }
                    return;
                } else if (nearYMD.year == today.year && nearYMD.month == today.month && nearYMD.date == today.date) { //代表今天已签状态
                    let max = _this.state.continueTimes - 5 < 0 ? _this.state.continueTimes : 5;
                    _this.state.isSignIn = false;
                    for (let i = 0; i < max; i++) {
                        _this.state.signinDays.splice(i, 1, '1');
                    }
                    if (this.state.signinRecord[0].integral > 8) {
                        for (let i = 0; i < 6; i++) {
                            _this.state.integrals.splice(i, 1, '+' + (i + 5));
                        }
                    }
                    return;
                } else { //连续签到已断
                    for (let i = 0; i < 6; i++) {
                        _this.state.signinDays.splice(i, 1, '0');
                    }
                    _this.state.isSignIn = false;
                    for (let i = 1; i < 6; i++) {
                        _this.state.integrals.splice(i, 1, '+' + (i + 4));
                    }
                    return;
                }
            }
        },
        prefixTrap(obj, data) { //日期前缀补充
            var today = data.today;
            let len = data.len;
            let _this = this;
            for (let i = 0; i < len; i++) {
                _this.state.daysArr[i] = new Date(today - (2 - i) * 86400000).getMonth() + 1 + '月' + new Date(today - (2 - i) * 86400000).getDate() + '日';
            }
        },
        suffixTrap(obj, data) { //日期后缀补充
            for (let i = 0; i < data.len; i++) {
                this.state.daysArr[i + 5] = new Date(data.today + (i + 2) * 86400000).getMonth() + 1 + '月' + new Date(data.today + (i + 2) * 86400000).getDate() + '日';
            }
        },
        calculationDays() { //初始化日期
            let times = this.state.signinRecord[0].integral - 4;
            let prefix;
            let todayDate = this.state.curDataArr; //今天日期
            this.state.curDataArr['year'] = new Date().getFullYear();
            this.state.curDataArr['month'] = new Date().getMonth() + 1;
            this.state.curDataArr['date'] = new Date().getDate();

            let prevYMD = [];
            let prevDay = new Date(new Date().getTime() - 86400000); //最近一次签到时间的第二天
            prevYMD['year'] = prevDay.getFullYear();
            prevYMD['month'] = prevDay.getMonth() + 1;
            prevYMD['date'] = prevDay.getDate();

            let nextYMD = [];
            let nextDay = new Date(this.state.signinRecord[0].createDate + 86400000); //最近一次签到时间的第二天
            nextYMD['year'] = nextDay.getFullYear();
            nextYMD['month'] = nextDay.getMonth() + 1;
            nextYMD['date'] = nextDay.getDate();

            let nearYMD = [];
            let nearDay = new Date(this.state.signinRecord[0].createDate); //最近一次签到时间
            nearYMD['year'] = nearDay.getFullYear();
            nearYMD['month'] = nearDay.getMonth() + 1;
            nearYMD['date'] = nearDay.getDate();

            if (nextYMD.year == todayDate.year && nextYMD.month == todayDate.month && nextYMD.date == todayDate.date) { //今天未签
                prefix = times > 3 ? 3 : times - 1;
            } else if (nearYMD.year != prevYMD.year || nearYMD.month != prevYMD.month || nearYMD.date != prevYMD.date) { //连续签到已断
                prefix = 0;
            } else { //今天已签
                prefix = times - 1 > 3 ? 3 : times - 2 < 0 ? 0 : times - 2;
            }
            let suffix = 6 - 3 - prefix;
            let today = new Date().getTime();
            this.state.daysArr[prefix] = '昨天';
            this.state.daysArr[prefix + 1] = '今天';
            this.state.daysArr[prefix + 2] = '明天';
            this.commit('prefixTrap', { 'len': prefix, 'today': today }); //填补日期前缀空缺
            this.commit('suffixTrap', { 'len': suffix, 'today': today }); //填补日期后缀空缺
            this.state.isblur = 0;
        },
        signIn() { //签到触发
            let _this = this;
            let times;

            let prevYMD = [];
            let prevDay = new Date(new Date().getTime() - 86400000); //最近一次签到时间的第二天
            prevYMD['year'] = prevDay.getFullYear();
            prevYMD['month'] = prevDay.getMonth() + 1;
            prevYMD['date'] = prevDay.getDate();

            let nearYMD = [];
            let nearDay = new Date(this.state.signinRecord[0].createDate); //最近一次签到时间
            nearYMD['year'] = nearDay.getFullYear();
            nearYMD['month'] = nearDay.getMonth() + 1;
            nearYMD['date'] = nearDay.getDate();

            if (nearYMD.year != prevYMD.year || nearYMD.month != prevYMD.month || nearYMD.date != prevYMD.date) { //连续签到已断
                times = 1;
            } else {
                times = this.state.signinRecord[0].integral - 4;
            }

            this.commit('GetCookie', { cvalue: 'id' })
            let params = {
                'memberId': _this.state.cookieVals.id
            }
            let curParams = Qs.stringify(params);
            axios.post('/zzjj-app/memberintegral/addSave.do', curParams).then(response => {
                _this.state.continueTimes = _this.state.signinRecord[0].integral - 5 + 1;
                if (response.status == 200) {
                    _this.commit('signInTip', { msg: '签到成功', status: 1 });
                    _this.state.isSignIn = false;
                    _this.state.signinDays.splice(times, 1, 1);
                } else {
                    _this.commit('signInTip', { msg: '签到失败', status: 0 });
                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        signInTip(obj, data) { //签到弹窗控制
            this.state.signInStatus = data.msg;
            this.state.signInStatusNum = data.status;
            this.state.isshow = 1;
            setTimeout(() => {
                this.state.isshow = 0;
            }, 1500)
        },
        getSceneList() {
            var _this = this;
            _this.commit('GetCookie', { cvalue: "id" });
            let params = {
                'accountId': _this.state.cookieVals.id
            }
            let curParams = Qs.stringify(params);
            axios.post('/zzjj-app/customScene/sceneList.do', curParams).then(response => {
                console.log('场景查询列表', response);
                if (response.status == 200) {

                } else {

                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        initGoodsList() { //积分商品列表
            var _this = this;
            axios.get('/zzjj-app/goodschange/grid.do?pageSize=10&pageNo=1').then(response => {
                if (response.status == 200) {
                    _this.state.goodsList.length = 0;
                    storage.setStorage('giftList', response.data.data.rows, 1);
                    response.data.data.rows.map((item) => {
                        _this.state.goodsList.push(item);
                    })
                } else {
                    _this.commit('signInTip', { msg: '获取积分商品列表失败', status: 0 });
                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        initHouseList() { //获取房屋管理列表
            var _this = this;
            _this.commit('GetCookie', { cvalue: "id" });
            let params = {
                'memberId': _this.state.cookieVals.id
            }
            let curParams = Qs.stringify(params);
            axios.post('/zzjj-app/account/getMemberAllAccount.do', curParams).then(response => {
                console.log('房屋列表', response);
                if (response.data.isSuccess == 0) {
                    _this.state.houseManagerList.length = 0;
                    response.data.accountList.map((item) => {
                        _this.state.houseManagerList.push(item)
                    })
                } else {
                    console.log('获取数据失败');
                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        getLinkageList() {
            var _this = this;
            _this.commit('GetCookie', { cvalue: "id" });
            let params = {
                'accountId': _this.state.cookieVals.id
            }
            let curParams = Qs.stringify(params);
            axios.post('/zzjj-app/customlinkage/linkageList.do', curParams).then(response => {
                console.log('联动查询列表', response);
                return;
                if (response.status == 200) {

                } else {

                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        houseList() {
            let _this = this;
            _this.commit('GetCookie', { cvalue: "id" });
            let params = {
                'userId': _this.state.cookieVals.id,
                'houseId': '488'
            }
            let curParams = Qs.stringify(params);
            axios.post('/zzjj-app/group/listGroup.do', curParams).then(response => {
                console.log('获取房间列表', response);
                return;
                if (response.status == 200) {

                } else {

                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        initRecommend() { //推荐有礼初始化数据
            let _this = this;
            _this.commit('GetCookie', { cvalue: "telephone" });
            let params = {
                'introducer': _this.state.cookieVals.telephone,
            }
            let curParams = Qs.stringify(params);
            axios.post('/zzjj-app/register/introducerList.do', curParams).then(response => {
                console.log('推荐有礼', response);
                if (response.status == 200) {
                    this.state.successNum = response.data.total;
                    this.state.isblur = 0;
                } else {

                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        initCountPoint() { //获得初始化积分数据
            let _this = this;
            _this.commit('GetCookie', { cvalue: "id" });
            let params = {
                'memberId': _this.state.cookieVals.id,
            }
            let curParams = Qs.stringify(params);
            axios.post('/zzjj-app/memberintegrallog/userRewardScoreCnt.do', curParams).then(response => {
                console.log('已获得积分', response);
                if (response.status == 200) {
                    this.state.countPoint = response.data.countPoint;
                } else {

                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        initRecommendIntegral() { //绑定送积分
            let _this = this;
            _this.commit('GetCookie', { cvalue: "id" });
            let params = {
                'memberId': _this.state.cookieVals.id,
                'type': 13
            }
            let curParams = Qs.stringify(params);
            axios.post('/zzjj-app/memberintegrallog/gridBindDevice.do', curParams).then(response => {
                console.log('绑定送积分', response.data.data);
                return;
                if (response.status == 200) {
                    response.data.data.rows.map((item) => {
                        this.state.recommendIntegrals.push(item);
                    })
                } else {

                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })

        },
        sersorInit(obj, data) { //初始化传感器
            let origin = data.shortAddress;
            let curShortaddress = origin.slice(2, 4) + origin.slice(0, 2);
            this.state.sersorName = data.name;
            this.state.curShort = origin;
            let params = {
                deviceId: this.commit('GetCookie', { cvalue: "hostId" }),
                platformType: 1,
                shortaddress: curShortaddress,
                endpoint: data.Endpoint,
                pageNo: 1,
                pageSize: 20
            }
            let curParams = Qs.stringify(params);
            axios.post('/zzjj-app/sensorreport/grid.do', curParams).then(response => {
                console.log('传感器', response);
                return;
                if (response.status == 200) {

                } else {

                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        //初始化sdk
        initSdk() {
            let _this = this;
            _this.commit('GetCookie', { cvalue: "authorize" });
            _this.state.ws = new XSDK('mqtt', {
                type: 'app',
                host: 'ws://118.190.126.197:1884/mqtt',
                userid: _this.state.cookieVals.user_id, // 用户在云智易平台的user_id，通过获取OpenID接口获取
                authorize: _this.state.cookieVals.authorize, // 用户在云智易平台的authorize，通过获取OpenID接口获取
                keepAliveInterval: 40, // 非必填，mqtt通讯时长，默认为40s，每40s发送ping请求
            });
            _this.state.ws.on('ready', function() {
                console.log('成功连上了');
                _this.state.ws && _this.state.ws.emit('adddevices', _this.state.devices) //devices 表示用户绑定设备列表
            });

            _this.state.ws.on('devicesready', function(devicesArray) {
                _this.state.socketObj = devicesArray[0];
                _this.commit('changeSdkMsg', { val: "0800FFFFFFFFFE9D" });
                _this.commit('getListen');
                _this.commit('getSend');
                _this.commit('getSdkEqMsg');
            })
        },
        //sdk发送数据
        changeSdkMsg(obj, data) {
            let dataArr = [{
                index: 1, // 数据端点索引
                value: data.val, // 数据端点值
                type: 7 // 这个要看文档上的数据端点的列表枚举，string为6
            }];
            this.state.socketObj.emit('senddata', {
                type: 'datapoint',
                data: dataArr
            }, function(res) {
                if (res.status === 0) {
                    console.log('sdk发送数据发送成功');
                } else {
                    alert("发送失败,状态:" + res.status)
                }
            });
        },
        SetCookie(obj, cvalue) {
            let name = cvalue.cname;
            let value = cvalue.cvalue;
            let days = cvalue.exdays;
            let d = new Date();
            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toGMTString();
            document.cookie = encodeURI(name) + "=" + encodeURI(value) + ";" + expires + "; path=/";
        },
        GetCookie(obj, data) {
            let cvalue = data.cvalue;
            let name = encodeURI(cvalue) + "=";
            let ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i].trim();
                if (c.indexOf(cvalue) == 0) {
                    this.state.cookieVals[cvalue] = c.substring(cvalue.length + 1, c.length);
                    return;
                }
            }
            return "";
        },
        getToken() {
            let _this = this;
            this.commit('GetCookie', { cvalue: 'user_id' });
            this.commit('GetCookie', { cvalue: 'access_token' });
            if (_this.state.cookieVals.user_id) {
                let params = {
                    email: '2018030619252147527@sslj.com',
                    corp_id: '100fa4b41cb5c000',
                    password: 'Znjj123456'
                };
                let curParams = JSON.stringify(params);
                let config = {
                    'Access-Token': _this.state.cookieVals.access_token
                };
                axios.post('/v2/user_auth', curParams, config).then(response => {
                    if (response.status == 200) {
                        _this.commit('SetCookie', { cname: "access_token", cvalue: response.data.access_token, exdays: 1 });
                        _this.commit('SetCookie', { cname: "refresh_token", cvalue: response.data.refresh_token, exdays: 1 });
                        _this.commit('SetCookie', { cname: "user_id", cvalue: response.data.user_id, exdays: 1 });
                        _this.commit('SetCookie', { cname: "authorize", cvalue: response.data.authorize, exdays: 1 });
                        _this.commit('getYzyDevices');
                    } else {

                    }
                }).catch(error => {
                    alert("服务器返回数据错误");
                })
            } else {
                _this.commit('getYzyDevices');
            }
        },
        getYzyDevices() {
            let _this = this;
            _this.commit('GetCookie', { cvalue: "access_token" });
            _this.commit('GetCookie', { cvalue: "user_id" });
            let config = {
                headers: { 'Access-Token': _this.state.cookieVals.access_token }
            };
            axios({
                method: 'get',
                url: `/v2/user/${_this.state.cookieVals.user_id}/subscribe/devices`,
                headers: { 'Access-Token': _this.state.cookieVals.access_token }
            }).then(function(response) {
                if (response.status == 200) {
                    _this.state.devices = response.data.map((item) => {
                        return {
                            device_id: item.id.toString(),
                            device_name: item.name,
                            device_mac: item.mac,
                            device_pid: item.product_id
                        }
                    });
                    if (!response.data.length) {
                        _this.state.nodata = true;
                    } else {
                        _this.commit('SetCookie', { cname: "hostId", cvalue: response.data[0].id, exdays: 1 });
                        _this.commit('initSdk');
                    }
                } else {
                    let text = JSON.parse(data.responseText);
                    if (text.error.msg == "Access-Token Refresh") {
                        _this.commit('refreshToten');
                        return false;
                    }
                    if (text.error.msg == "Access-Token Expired") {
                        _this.commit('refreshToten');
                        return false;
                    }
                    alert(text.error.msg);
                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })
        },
        //监听云智易数据上报
        getListen() {
            let _this = this;
            _this.state.socketObj.on('data', function(data) {
                if (data.type === 'datapoint') {
                    let eqLi,
                        shortAddress,
                        Endpoint,
                        DeviceId,
                        status,
                        nameLength,
                        name,
                        online,
                        m,
                        czName,
                        IEEE,
                        SNLength,
                        eqSN,
                        ZoneType,
                        des,
                        id,
                        equipments = [];
                    let ableData = data.data[0].value;
                    let type = ableData.substring(0, 2);
                    console.log(type);
                    switch (type) {
                        case "15":
                            break;
                        case "07":
                            console.log('type为07');
                            shortAddress = ableData.substring(4, 8);
                            Endpoint = ableData.substring(8, 10);
                            status = ableData.substring(10, 12);
                            _this.state.YzyEqUl.map(function(item, index) {
                                if (shortAddress == item.shortAddress && Endpoint == item.Endpoint) {
                                    item.status = status;
                                    if (item.status == "00") {
                                        item.des = "关";
                                    } else {
                                        item.des = "开";
                                    }
                                }
                            });
                            break;
                        case "01":
                            shortAddress = ableData.substring(4, 8);
                            Endpoint = ableData.substring(8, 10);
                            DeviceId = ableData.substring(14, 18);
                            status = ableData.substring(18, 20);
                            nameLength = parseInt(ableData.substring(20, 22), 16);
                            name = ableData.substring(22, nameLength * 2 + 22);
                            online = ableData.substring(nameLength * 2 + 22, nameLength * 2 + 24);
                            m = _this.commit('prePro', { name: name });
                            czName = !m ? '' : decodeURI(m);
                            IEEE = ableData.substring(nameLength * 2 + 24, nameLength * 2 + 40);
                            SNLength = parseInt(ableData.substring(nameLength * 2 + 40, nameLength * 2 + 42), 16);
                            eqSN = ableData.substring(nameLength * 2 + 42, (nameLength + SNLength) * 2 + 42);
                            ZoneType = ableData.substring((nameLength + SNLength) * 2 + 42, (nameLength + SNLength) * 2 + 46);
                            des = "";
                            if (status == 0) {
                                des = "关";
                            } else {
                                des = "开";
                            }

                            eqLi = [{
                                "shortAddress": shortAddress,
                                "DeviceId": DeviceId.substring(2, 4) + DeviceId.substring(0, 2),
                                "name": czName,
                                "status": status,
                                "online": online,
                                "Endpoint": Endpoint,
                                "IEEE": IEEE,
                                "ZoneType": ZoneType.substring(2, 4) + ZoneType.substring(0, 2),
                                "toUrl": "",
                                "all": ableData,
                                "des": des,
                                "click": 0,
                                "eqSN": eqSN,
                                "trans": false,
                                "onSrc": "",
                                "offSrc": ""
                            }];
                            _this.state.eqUl.map(function(item, index) {
                                if (item.Endpoint == Endpoint && item.IEEE == IEEE) {
                                    item.shortAddress = shortAddress;
                                    item.DeviceId = DeviceId.substring(2, 4) + DeviceId.substring(0, 2);
                                    item.name = czName;
                                    item.status = status;
                                    item.online = online;
                                    item.all = ableData;
                                    item.ZoneType = ZoneType.substring(2, 4) + ZoneType.substring(0, 2);
                                    eqLi = null;
                                }
                            });

                            if (eqLi == null || (DeviceId.substring(2, 4) + DeviceId.substring(0, 2)) == "0000" || DeviceId == "0400") {} else {
                                _this.commit('addToUrl', { datas: eqLi });
                            }
                            break;
                        case "0E":
                            id = ableData.substring(4, 8);
                            nameLength = parseInt(ableData.substring(8, 10), 16);
                            name = ableData.substring(10, nameLength * 2 + 10);
                            m = _this.commit('prePro', { name: name });
                            czName = !m ? '' : decodeURI(m);
                            eqLi = [{
                                'id': id,
                                'name': czName,
                                'orderBy': 999
                            }];
                            if (czName == "回家场景" || czName == "起床场景" || czName == "睡眠场景" || czName == "离家场景") {} else {
                                eqLi = null;
                            }
                            _this.state.baseScene.map(function(item, index) {
                                if (item.name == "回家场景" || item.name == "起床场景" || item.name == "睡眠场景" || item.name == "离家场景") {
                                    item.orderBy = index;
                                } else {
                                    item.orderBy = 999;
                                }
                                if (item.id == id) {
                                    item.name = czName;
                                    eqLi = null;
                                }
                            });
                            if (eqLi != null) {
                                _this.state.baseScene.splice(0, 1, eqLi);
                            }
                            break;
                        default:
                            break;
                    }
                }
            });
        },
        //发送获取获取云智易网关下面飞比的设备列表
        getSend() {
            let _this = this;
            _this.commit('GetCookie', { cvalue: "SN" });
            let opValue = `0800${_this.state.cookieVals.SN}FE90`;
            _this.commit('changeSdkMsg', { val: opValue });
        },
        //获取所有设备
        getSdkEqMsg() {
            let opValue = `0800${this.state.cookieVals.SN}FE81`;
            if (!this.state.cookieVals.SN) {
                opValue = "0800FFFFFFFFFE81";
            }
            this.commit('changeSdkMsg', { val: opValue });
        },
        //设备名字转码
        prePro(obj, data) {
            if (data.name.length % 2) return '';
            let tmp = '';
            for (let i = 0; i < data.length; i += 2) {
                tmp += '%' + data.name.charAt(i) + data.name.charAt(i + 1);
            }
            return tmp;
        },
        refreshToten() {
            _this.commit('GetCookie', { cvalue: "refresh_token" });
            _this.commit('GetCookie', { cvalue: "access_token" });
            _this.commit('GetCookie', { cvalue: "user_id" });
            axios({
                method: 'post',
                url: `/v2/user/token/refresh`,
                headers: { 'Access-Token': _this.state.cookieVals.access_token },
                data: { 'refresh_token': _this.state.cookieVals.refresh_token }
            }).then(function(response) {
                console.log('重新获取token', response);
                if (response.status == 200) {
                    this.commit('SetCookie', { cname: "access_token", cvalue: response.access_token, exdays: 1 });
                    this.commit('SetCookie', { cname: "refresh_token", cvalue: response.refresh_token, exdays: 1 });
                } else {
                    this.commit('SetCookie', { cname: "account", cvalue: '', exdays: 1 });
                    this.commit('SetCookie', { cname: "otherId", cvalue: '', exdays: 1 });
                    this.commit('SetCookie', { cname: "yPassword", cvalue: '', exdays: 1 });
                    this.commit('SetCookie', { cname: "id", cvalue: '', exdays: 1 });
                    this.commit('SetCookie', { cname: "telephone", cvalue: '', exdays: 1 });
                    this.commit('SetCookie', { cname: "username", cvalue: '', exdays: 1 });
                    this.commit('SetCookie', { cname: "access_token", cvalue: '', exdays: 1 });
                    this.commit('SetCookie', { cname: "refresh_token", cvalue: '', exdays: 1 });
                    this.commit('SetCookie', { cname: "user_id", cvalue: '', exdays: 1 });
                    this.commit('SetCookie', { cname: "authorize", cvalue: '', exdays: 1 });
                }
            }).catch(error => {
                alert("服务器返回数据错误");
            })


            var params = {
                "refresh_token": GetCookie("refresh_token")
            };
            $.ajax({
                data: JSON.stringify(params),
                success: function(data) {
                    SetCookie("access_token", data.access_token, 1);
                    SetCookie("refresh_token", data.refresh_token, 1);
                },
                error: function(data) {
                    SetCookie("account", "", 1);
                    SetCookie("otherId", "", 1);
                    SetCookie("yPassword", "", 1);
                    SetCookie("id", "", 1);
                    SetCookie("telephone", "", 1);
                    SetCookie("username", "", 1);
                    SetCookie("access_token", "", 1);
                    SetCookie("refresh_token", "", 1);
                    SetCookie("user_id", "", 1);
                    SetCookie("authorize", "", 1);
                }
            });
        },
        addToUrl(obj, data) {
            let _this = this;
                console.log(data);
            data.datas.map(function(item, index) {
                switch (item.DeviceId) {
                    case "0000":
                        if (!item.name) {
                            item.name = "随意贴";
                        }
                        if (item.online == "00") {
                            item.des = "不在线";
                        } else {
                            item.des = "在线";
                        }
                        item.offSrc = require('../assets/index/switch_nor.png');
                        item.onSrc = require('../assets/index/switch_pre.png');
                        item.toUrl = "/sersor/" + item.name + "/" + item.shortAddress + "/" + item.Endpoint;
                        break;
                    case "0002":
                        if (!item.name) {
                            item.name = "开关";
                        }
                        if (item.online == "00") {
                            item.des = "不在线";
                        }
                        item.offSrc = require('../assets/index/lamp_nor.png');
                        item.onSrc = require('../assets/index/lamp_pre.png');
                        item.toUrl = "/sersor/" + item.name + "/" + item.shortAddress + "/" + item.Endpoint;
                        break;
                    case "0004":
                        if (!item.name) {
                            item.name = "场景";
                        }
                        item.offSrc = require('../assets/index/scene_nor.png');
                        item.onSrc = require('../assets/index/scene_pre.png');
                        item.toUrl = "#/scene/sceneEdit/1/" + item.name;
                        break;
                    case "0009":
                        if (!item.name) {
                            item.name = "插座";
                        }
                        if (item.online == "00") {
                            item.des = "不在线";
                        }
                        item.offSrc = require('../assets/index/socket_nor.png');
                        item.onSrc = require('../assets/index/socket_pre.png');
                        item.toUrl = "/sersor/" + item.name + "/" + item.shortAddress + "/" + item.Endpoint;
                        break;
                    case "0051":
                        if (!item.name) {
                            item.name = "智能插座";
                        }
                        if (item.online == "00") {
                            item.des = "不在线";
                        }
                        item.offSrc = require('../assets/index/socket_nor.png');
                        item.onSrc = require('../assets/index/socket_pre.png');
                        item.toUrl = "/sersor/" + item.name + "/" + item.shortAddress + "/" + item.Endpoint;
                        break;
                    case "0053":
                        if (!item.name) {
                            item.name = "智能测量设备";
                        }
                        if (item.online == "00") {
                            item.des = "不在线";
                        } else {
                            item.des = "在线";
                        }
                        item.offSrc = require('../assets/index/air_nor.png');
                        item.onSrc = require('../assets/index/air_pre.png');
                        item.toUrl = "/sersor/" + item.name + "/" + item.shortAddress + "/" + item.Endpoint;
                        break;
                    case "0100":
                    case "0101":
                    case "0200":
                        if (!item.name) {
                            item.name = "调光灯";
                        }
                        if (item.online == "00") {
                            item.des = "不在线";
                        }
                        item.click = 1;
                        item.offSrc = require('../assets/index/lamp_nor.png');
                        item.onSrc = require('../assets/index/lamp_pre.png');
                        item.toUrl = "/sersor/" + item.name + "/" + item.shortAddress + "/" + item.Endpoint;
                        break;
                    case "0102":
                        if (!item.name) {
                            item.name = "彩灯";
                        }
                        if (item.online == "00") {
                            item.des = "不在线";
                        }
                        item.offSrc = require('../assets/index/lamp_nor.png');
                        item.onSrc = require('../assets/index/lamp_pre.png');
                        item.toUrl = "/sersor/" + item.name + "/" + item.shortAddress + "/" + item.Endpoint;
                        break;
                    case "0110":
                    case "0220":
                        if (!item.name) {
                            item.name = "色温灯";
                        }
                        if (item.online == "00") {
                            item.des = "不在线";
                        }
                        item.offSrc = require('../assets/index/lamp_nor.png');
                        item.onSrc = require('../assets/index/lamp_pre.png');
                        item.toUrl = "/sersor/" + item.name + "/" + item.shortAddress + "/" + item.Endpoint;
                        break;
                    case "0210":
                        if (!item.name) {
                            item.name = "彩灯";
                        }
                        if (item.online == "00") {
                            item.des = "不在线";
                        }
                        item.offSrc = require('../assets/index/lamp_nor.png');
                        item.onSrc = require('../assets/index/lamp_pre.png');
                        item.toUrl = "/sersor/" + item.name + "/" + item.shortAddress + "/" + item.Endpoint;
                        break;
                    case "0202":
                        if (!item.name) {
                            item.name = "窗帘";
                        }
                        if (item.online == "00") {
                            item.des = "不在线";
                        } else {}
                        item.offSrc = require('../assets/index/curtain_nor.png');
                        item.onSrc = require('../assets/index/curtain_pre.png');
                        item.toUrl = "/sersor/" + item.name + "/" + item.shortAddress + "/" + item.Endpoint;
                        break;
                    case "0800":
                    case "0810":
                        if (!item.name) {
                            item.name = "遥控器";
                        }
                        if (item.online == "00") {
                            item.des = "不在线";
                        } else {
                            item.des = "在线";
                        }
                        item.offSrc = require('../assets/index/scene_nor.png');
                        item.onSrc = require('../assets/index/scene_pre.png');
                        item.toUrl = "/sersor/" + item.name + "/" + item.shortAddress + "/" + item.Endpoint;
                        break;
                    case "0403":
                        if (!item.name) {
                            item.name = "声光报警器";
                        }
                        if (item.online == "00") {
                            item.des = "不在线";
                        } else {
                            item.des = "在线";
                        }
                        item.toUrl = "/sersor/" + item.name + "/" + item.shortAddress + "/" + item.Endpoint;
                        break;
                    case "0161":
                    case "0163":
                        if (!item.name) {
                            item.name = "红外转发器";
                        }
                        if (item.online == "00") {
                            item.des = "不在线";
                        } else {
                            item.des = "在线";
                        }
                        item.trans = true;
                        item.offSrc = require('../assets/index/infrared_nor.png');
                        item.onSrc = require('../assets/index/infrared_pre.png');
                        item.toUrl = "/sersor/" + item.name + "/" + item.shortAddress + "/" + item.Endpoint;
                        break;
                    case "0106":
                        if (!item.name) {
                            item.name = "光照";
                        }
                        if (item.online == "00") {
                            item.des = "不在线";
                        } else {}
                        item.offSrc = require('../assets/index/lamp_nor.png');
                        item.onSrc = require('../assets/index/lamp_pre.png');
                        item.toUrl = "/sersor/" + item.name + "/" + item.shortAddress + "/" + item.Endpoint;
                        break;
                    case "0301":
                        if (!item.name) {
                            item.name = "温控器";
                        }
                        if (item.online == "00") {
                            item.des = "不在线";
                        } else {}
                        item.offSrc = require('../assets/index/temperature_nor.png');
                        item.onSrc = require('../assets/index/temperature_nor_pre.png');
                        item.toUrl = "/sersor/" + item.name + "/" + item.shortAddress + "/" + item.Endpoint;
                        break;
                    case "0302":
                    case "0303":
                        if (!item.name) {
                            item.name = "温湿度传感器";
                        }
                        if (item.online == "00") {
                            item.des = "不在线";
                        } else {}
                        item.offSrc = require('../assets/index/Temperature_humidity_nor.png');
                        item.onSrc = require('../assets/index/Temperature_humidity_pre.png');
                        item.toUrl = "/sersor/" + item.name + "/" + item.shortAddress + "/" + item.Endpoint;
                        break;
                    case "0309":
                        if (!item.name) {
                            item.name = "PM 2.5";
                        }
                        if (item.online == "00") {
                            item.des = "不在线";
                        } else {}
                        item.offSrc = require('../assets/index/air_nor.png');
                        item.onSrc = require('../assets/index/air_pre.png');
                        item.toUrl = "/sersor/" + item.name + "/" + item.shortAddress + "/" + item.Endpoint;
                        break;
                    case "000A":
                        if (!item.name) {
                            item.name = "门锁";
                        }
                        if (item.online == "00") {
                            item.des = "不在线";
                        }
                        item.click = 1;
                        item.offSrc = require('../assets/index/door_nor.png');
                        item.onSrc = require('../assets/index/door_pre.png');
                        item.toUrl = "/sersor/" + item.name + "/" + item.shortAddress + "/" + item.Endpoint;
                        break;
                    case "0402":
                        switch (item.ZoneType) {
                            case "0015":
                                if (!item.name) {
                                    item.name = "门磁传感器";
                                }
                                if (item.online == "00") {
                                    item.des = "不在线";
                                } else {}
                                item.offSrc = require('../assets/index/door_window_nor.png');
                                item.onSrc = require('../assets/index/door_window_pre.png');
                                break;
                            case "000D":
                                if (!item.name) {
                                    item.name = "人体传感器";
                                }
                                if (item.online == "00") {
                                    item.des = "不在线";
                                } else {
                                    item.des = "在线";
                                }
                                item.offSrc = require('../assets/index/body_nor.png');
                                item.onSrc = require('../assets/index/body_pre.png');
                                break;
                            case "0028":
                            case "8000":
                                if (!item.name) {
                                    item.name = "烟雾传感器";
                                }
                                if (item.online == "00") {
                                    item.des = "不在线";
                                } else {
                                    item.des = "在线";
                                }
                                item.offSrc = require('../assets/index/fuel_gas_nor.png');
                                item.onSrc = require('../assets/index/fuel_gas_pre.png');
                                break;
                            case "002B":
                            case "8001":
                                if (!item.name) {
                                    item.name = "气体传感器";
                                }
                                if (item.online == "00") {
                                    item.des = "不在线";
                                } else {
                                    item.des = "在线";
                                }
                                item.offSrc = require('../assets/index/dangerous_gas_nor.png');
                                item.onSrc = require('../assets/index/dangerous_gas_pre.png');
                                break;
                            case "002D":
                                if (!item.name) {
                                    item.name = "振动传感器";
                                }
                                if (item.online == "00") {
                                    item.des = "不在线";
                                } else {
                                    item.des = "在线";
                                }
                                item.offSrc = require('../assets/index/alarm_nor.png');
                                item.onSrc = require('../assets/index/alarm_pre.png');
                                break;
                            case "002A":
                                if (!item.name) {
                                    item.name = "水浸传感器";
                                }
                                if (item.online == "00") {
                                    item.des = "不在线";
                                } else {
                                    item.des = "在线";
                                }
                                item.offSrc = require('../assets/index/water_nor.png');
                                item.onSrc = require('../assets/index/water_pre.png');
                                break;
                            case "002C":
                                if (!item.name) {
                                    item.name = "紧急按钮";
                                }
                                if (item.online == "00") {
                                    item.des = "不在线";
                                } else {
                                    item.des = "在线";
                                }
                                item.offSrc = require('../assets/index/button_nor.png');
                                item.onSrc = require('../assets/index/button_pre.png');
                                break;
                            case "0115":
                                if (!item.name) {
                                    item.name = "安防传感器";
                                }
                                if (item.online == "00") {
                                    item.des = "不在线";
                                } else {
                                    item.des = "在线";
                                }
                                item.offSrc = require('../assets/index/body_nor.png');
                                item.onSrc = require('../assets/index/body_pre.png');
                                break;
                            default:
                                break;
                        }
                        item.toUrl = "/sersor/" + item.name + "/" + item.shortAddress + "/" + item.Endpoint;
                        break;

                    default:
                        item.toUrl = "#/equipment/defaultEquip";
                        break;
                }
                if (item.name) {
                    _this.state.eqUl.push(item);
                }
            });
            _this.state.eqLen = _this.state.eqUl.length;
            _this.commit('SetCookie', { cname: "eqLength", cvalue: _this.state.eqUl.length, exdays: 1 });
            return _this.state.eqUl;
        },
        emergency(ableData) {
            setTimeout(function() {
                emergencyValue = true;
            }, 1000);
            if (emergencyValue == false) {
                return false;
            }
            emergencyValue = false;
            var shortAddress = ableData.slice(4, 8);
            var cluster = ableData.slice(10, 14);
            var type = ableData.slice(16, 20);
            var value = ableData.slice(22, 26);
            var trueValue = value.slice(2, 4) + value.slice(0, 2);
            var doorOpen = ableData.slice(24, 26);
            var doorStatu = ableData.slice(26, 28);
            if (cluster == "0101") {
                var interType = ableData.slice(20, 22);
                if (interType == "42") {
                    var interPassType = ableData.slice(24, 28);
                    var interPassStatu = ableData.slice(28);
                    if (interPassType.toString() == "0") {
                        if (interPassStatu.toString() == "0") {
                            SetCookie("doorDate", GetCookie("doorDateF"), 10);
                            SetCookie("doorTime", GetCookie("doorTimeF"), 10);
                            SetCookie("doorPassword", GetCookie("doorPasswordF"), 10);
                            $("#controller_interim").click();
                        } else {
                            alert("临时密码获取失败，请重新获取！");
                        }
                    }
                    if (interPassStatu == "FFFF") {
                        $("#loading").css("display", "none");
                        if (interPassStatu.toString() == "0") {
                            SetCookie("doorDate", "", 1);
                            SetCookie("doorTime", "", 1);
                            SetCookie("doorTime", "", 1);
                            $("#interim_msg").css("display", "none");
                        }
                    }
                }
                $("#loading").css("display", "none");
                window.clearTimeout(doorTimer);
                if (doorStatu == "00") {
                    if (doorOpen == "00") {
                        alert("关锁成功");
                    }
                    if (doorOpen == "01") {
                        alert("开锁成功");
                    }
                } else if (doorStatu == "01") {
                    alert("门锁操作失败");
                } else if (doorStatu == "02" || doorStatu == "7f") {
                    alert("远程开门未允许");
                } else {
                    alert("门锁操作失败");
                }
                return false;
            }
            publicEqUl.map(function(item, index) {
                if (item.shortAddress == shortAddress) {
                    switch (item.DeviceId) {
                        case "0402":
                            switch (item.ZoneType) {
                                case "0015":
                                    if (item.value == "0000") {} else {
                                        alert("门被打开");
                                    }
                                    break;
                                case "000D":
                                    if (item.value == "0000") {} else {
                                        alert("有人经过");
                                    }
                                    break;
                                case "0028":
                                case "8000":
                                    if (item.value == "0000") {} else {
                                        alert("烟雾超标");
                                    }
                                    break;
                                case "002B":
                                case "8001":
                                    if (item.value == "0000") {} else {
                                        alert("气体异常");
                                    }
                                    break;
                                case "002D":
                                    if (item.value == "0000") {} else {
                                        alert("有振动");
                                    }
                                    break;
                                case "002A":
                                    if (item.value == "0000") {} else {
                                        alert("有水浸入");
                                    }
                                    break;
                                case "002C":
                                    if (item.value == "0000") {} else {
                                        alert("有人按下紧急按钮");
                                    }
                                    break;
                                default:
                                    if (item.value == "0000") {
                                        item.desc = "关";
                                    } else {
                                        item.desc = "开";
                                    }
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                }
            });
        }
    },
    getters: {
        hostNum(state){
            return state.cookieVals.eqLength;
        }
    }
})

export default store
