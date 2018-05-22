import * as types from './mutation-types'
import axios from 'axios'
import Qs from 'qs'

const mutations = {
    modifyStatus() {
        if (!this.state.user) {
            this.state.user = !this.state.user;
        }
    },
    [types.INIT_GIFTS]() {
        let _this = this;
        axios.get('/zzjj-app/goodschange/findDefaultGood.do').then(response => {
            console.log('积分兑换', response);
            _this.state.gifts.length = 0;
            if (response.status == 200) {
                let defaultData = response.data.data;
                defaultData.map(function(item, index) {
                    _this.state.gifts.push(item);
                })
                console.log('gifts:', _this.state.gifts);
            } else {

            }
        }).catch(error => {
            alert("服务器返回数据错误");
        })
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
        if (452872041) {
            let params = {
                email: '2018030619252147527@sslj.com',
                corp_id: '100fa4b41cb5c000',
                password: 'Znjj123456'
            };
            let curParams = JSON.stringify(params);
            let config = {
                'Access-Token': 'OTM2RDJENzk1OTVFMzIxNjZCQ0Q5ODk4QTk0QkU0QjRERkIxNjEyMDQ2MTFENTY0OEFBMURCMzc2Q0RFQTFBRg=='
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
                            // eqLi.map(function(item, index) {
                            // 	_this.state.eqUl.push(item);
                            // })
                            _this.commit('addToUrl', { datas: eqLi });
                        }
                        // _this.commit('addToUrl', {datas: _this.state.eqUl});
                        // console.log('数组集',_this.state.eqUl);
                        // _this.state.YzyEqUl = _this.state.eqUl;
                        // wYzyEq = eqUl;
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
        var params = {
            "refresh_token": GetCookie("refresh_token")
        };
        $.ajax({
            type: "post",
            url: Yzy + "/v2/user/token/refresh",
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Access-Token', GetCookie("access_token"))
            },
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
}

export default mutations