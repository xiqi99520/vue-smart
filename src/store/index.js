import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 定义状态
    state: {
        user: false,
        socketObj: null,//当前设备的类
        cookieVals: {}
    },
    mutations: {
    	modifyStatus(){
    		if(!this.state.user){
    			this.state.user = !this.state.user;
    		}
    	},
    	SetCookie(obj, cvalue){
			let name = cvalue.cname;
			let value = cvalue.cvalue;
			let days = cvalue.exdays;
			let d = new Date();
			d.setTime(d.getTime()+(days*24*60*60*1000));
			let expires = "expires="+d.toGMTString();
			document.cookie = encodeURI(name) + "=" + encodeURI(value) + ";" + expires+"; path=/";
		},
		GetCookie(obj, data){
			let cvalue = data.cvalue;
			let name = encodeURI(cvalue) + "=";
			let ca = document.cookie.split(';');
			for(let i=0; i<ca.length; i++){
				let c = ca[i].trim();
				if (c.indexOf(cvalue) == 0){
					this.state.cookieVals[cvalue] = c.substring(cvalue.length+1,c.length);
					// console.log(this.state.cookieVals);
					return;
				}
			}
			return "";
		},
    	getToken(){
			if(452872041){
				let params = {
				  email: '2018030619252147527@sslj.com',
				  corp_id:  '100fa4b41cb5c000',
				  password: 'Znjj123456'
				};
				let curParams = JSON.stringify(params);
				let config = {
					'Access-Token': 'OEJFMzQzNThGNjA0N0U0MUQ4M0UzNzBBMjc3Mjg1NTc2RjZBRUQ5QzA0Mjg3QjQ0N0YwRDM3RkE3NTgwODhEQQ=='
				};
				axios.post('/v2/user_auth', curParams, config).then(response=>{
					if(response.status == 200){
						this.commit('SetCookie', {cname: "access_token", cvalue: response.data.access_token, exdays: 1});
						this.commit('SetCookie', {cname: "refresh_token", cvalue: response.data.refresh_token, exdays: 1});
						this.commit('SetCookie', {cname: "user_id", cvalue: response.data.user_id, exdays: 1});
						this.commit('SetCookie', {cname: "authorize", cvalue: response.data.authorize, exdays: 1});
						this.commit('getYzyDevices');
					}else{
						
					}
				}).catch(error=>{
					alert("服务器返回数据错误");
				})
			  }else{
				  // window.getYzyDevices(cThis);
			  }
		},
		getYzyDevices(){
			this.commit('GetCookie', {cvalue: "access_token"});
			this.commit('GetCookie', {cvalue: "user_id"});
			let config = {
				'Access-Token': this.state.cookieVals.access_token
			};
			return;
			axios.post(`/v2/user/${this.state.cookieVals.user_id}/subscribe/devices`, config).then(response=>{
				console.log(response);return;
				if(response.status == 200){
				devices = data.map(item => {
				        return {
				            device_id: item.id.toString(),
				            device_name: item.name,
				            device_mac: item.mac,
				            device_pid: item.product_id
				        }
				 });
				 if(!devices[0]){
					 $("#no_host").css("display","block");
				 }else{
					 SetCookie("hostId",data[0].id,1);
					 window.initSdk(cThis);
				 }
				}else{
					var text=JSON.parse(data.responseText);
					  if(text.error.msg=="Access-Token Refresh"){
						  window.refreshToten();
						  return false;
					  }
					  if(text.error.msg=="Access-Token Expired"){
						  window.refreshToten();
						  return false;
					  }
					  alert(text.error.msg);
				}
			}).catch(error=>{
				alert("服务器返回数据错误");
			})

			
		}
    }
})

export default store