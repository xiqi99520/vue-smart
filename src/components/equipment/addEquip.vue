<template>
    <div>
        <publicHead :title="msg"></publicHead>
        <div class="upload flex">
            <div class="btn-upload">上传设备二维码
                <input id="file" ref="myFiles" class="file" type="file" name="file" accept="image/jpeg,image/png,image/gif" @change="changeFile">
            </div>
            <div class="fullpath">{{ fullpath }}</div>
        </div>
        <div class="footer">
            <button class="btn-add-equip" @click="uploadFile">添加设备</button>
        </div>
        <layer v-if="isshow" :isStatus="1" :msg="statusMsg"></layer>
    </div>
</template>
<script>
import publicHead from '../common/publicHeader'
import layer from '../common/layer'
export default {
    data() {
        return {
            msg: '添加设备',
            statusMsg: '状态信息',
            fullpath: '',
            isshow: false,
            isclick: false
        }
    },
    components: {
        publicHead,
        layer
    },
    methods: {
        changeFile() {
            let file = this.$refs.myFiles.files[0]; //获取file对象
            this.fullpath = file.name;
        },
        uploadFile() {
            if (this.isclick) return;
            this.isclick = !this.isclick;
            let file = this.$refs.myFiles.files[0]; //获取file对象
            let param = new FormData(); //创建form对象  
            param.append('file', file, file.name); //通过append向form对象添加数据

            let config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };

            this.$axios.post('/zzjj-app/qrcode/analysisQrcode.do', param, config).then(response => {
                this.getQrcode(response.data.resultValue);
            }).catch(error => {
                console.log(error);
            })
        },
        getQrcode(data) {
            var _this = this;
            if (data.indexOf("GT") < 0) {
                _this.addYzyEq(data);
                return false;
            }

            var newMsg = data.split("GT");
            var arrayMsg = newMsg[1].split("pass");
            console.log(newMsg);
            console.log(arrayMsg);
            return;

            let param = {
                account: arrayMsg[0],
                password: arrayMsg[1]
            }

            this.$axios.post('/zzjj-app/feibiuser/findUrl.do', param).then(response => {
                if (response.status == 200) {
                    _this.addYzyEq(data.qrcode);
                }
            }).catch(error => {
                console.log(error);
            })
        },
        addYzyEq(data) {
            let _this = this;
            let params = {
                "qrcode": data
            };
            let newparams = JSON.stringify(params);
            let config = {
                headers: { 'Access-Token': 'OEJFMzQzNThGNjA0N0U0MUQ4M0UzNzBBMjc3Mjg1NTc2RjZBRUQ5QzA0Mjg3QjQ0N0YwRDM3RkE3NTgwODhEQQ==' }
            }
            this.$axios.post('/v2/user/452872041/qrcode_subscribe', newparams, config).then(response => {
                _this.setHostType();
            }).catch((error) => {
                console.log('您已绑定设备');
                this.$store.state.nodata = false;
                this.$router.push('/');
                let text = JSON.parse(error.responseText);

                if (text.error.error == "Access-Token Refresh") {
                    window.refreshToten();
                    return false;
                }

                if (text.error.error == "Access-Token Expired") {
                    window.refreshToten();
                    return false;
                }

                if (text.error.error == "device subscribe faild by scan mode.") {
                    alert("主机被其他人员绑定了");
                    return false;
                }
                alert(text.error.data);
            })
        },
        setHostType() {
            let _this = this;
            let param = {
                id: 452872041,
                uid: 452875336,
                type: 1
            }
            this.$axios.post('/zzjj-app/account/updateSave.do', param).then(response => {
                if (response.status == 200) {
                    _this.isshow = !_this.isshow;
                    _this.statusMsg = '成功添加设备';
                    setTimeout(function() {
                        _this.$router.push('/');
                        _this.isshow = !_this.isshow;
                        _this.isclick = !_this.isclick;
                    }, 1500);
                } else {
                    _this.isclick = !_this.isclick;
                    alert(response.msg);
                }
            }).catch(error => {
                _this.isclick = !_this.isclick;
                alert("服务器返回数据错误");
            })
        }
    }
}
</script>
<style scoped>
.upload {
    padding: 5rem 2.6rem;
}

.upload .btn-upload {
    width: 50%;
    height: 2.6rem;
    line-height: 2.6rem;
    font-size: .8rem;
    color: #fff;
    text-align: center;
    background-color: #428bca;
    position: relative;
}

.upload .file {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
}

.upload .fullpath {
    width: 50%;
    height: 2.6rem;
    line-height: 2.6rem;
    font-size: .8rem;
    border: 1px solid #f1f1f1;
    margin-left: .4rem;
    overflow: hidden;
}

.footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    padding-bottom: 1.2rem;
}

.footer .btn-add-equip {
    width: 92%;
    height: 2.6rem;
    line-height: 2.6rem;
    font-size: 1rem;
    text-align: center;
    color: #fff;
    background-color: #ff9c00;
    border: none;
    border-radius: 6px;
    margin: auto;
    margin-top: 1.2rem;
}
</style>