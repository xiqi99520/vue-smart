<template>
	<div class="equipment">
        <div v-if="noData" class="add" @click="addUrl">
            <span class="add-symbol">+</span><span class="add-tip">点击添加设备</span>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
	export default {
		data(){
			return {
				noData: true
			}
		},
		methods: {
            ...mapMutations(['getToken']),
            addUrl(){
                this.$router.push('/add');
            },
            //监听云智易数据上报
            getListen(){
                  var that=this;
                  var eqUl=[];
                  var baseScene=[];
                  socketObj.on('data', function(data) {
                    if (data.type === 'datapoint') {
                        var ableData=data.data[0].value;
                        var type=ableData.substring(0,2);
                        switch(type){
                        case "15":
                            break;
                        case "07":
                            var shortAddress=ableData.substring(4,8);
                            var Endpoint=ableData.substring(8,10);
                            var statu=ableData.substring(10,12);
                            that.state.YzyEqUl.map(function(item,index){
                                if(shortAddress==item.shortAddress && Endpoint==item.Endpoint){
                                    item.statu=statu;
                                    if(item.statu=="00"){
                                        item.des="关";
                                    }else{
                                        item.des="开";
                                    }
                                }
                            });
                            that.setState({
                                YzyEqUl:that.state.YzyEqUl
                            });
                            break;
                        case "01":
                                var shortAddress = ableData.substring(4, 8);
                                var Endpoint = ableData.substring(8, 10);
                                var DeviceId = ableData.substring(14, 18);
                                var statu = ableData.substring(18, 20);
                                var nameLength = parseInt(ableData.substring(20, 22), 16);
                                var name = ableData.substring(22, nameLength * 2 + 22);
                                var online = ableData.substring(nameLength * 2 + 22, nameLength * 2 + 24);
                                var m = window.prePro(name);
                                var czName = decodeURI(m);
                                var IEEE = ableData.substring(nameLength * 2 + 24, nameLength * 2 + 40);
                                var SNLength = parseInt(ableData.substring(nameLength * 2 + 40, nameLength * 2 + 42), 16);
                                var eqSN = ableData.substring(nameLength * 2 + 42, (nameLength+SNLength) * 2 + 42);
                                var ZoneType = ableData.substring((nameLength+SNLength) * 2 + 42, (nameLength+SNLength) * 2 + 46);
                                var des="";
                                if(statu==0){
                                    des="关";
                                }else{
                                    des="开";
                                }
                                var eqLi=[{
                                        "shortAddress":shortAddress,
                                        "DeviceId":DeviceId.substring(2,4)+DeviceId.substring(0,2),
                                        "name":czName,
                                        "statu":statu,
                                        "online":online,
                                        "Endpoint":Endpoint,
                                        "IEEE":IEEE,
                                        "ZoneType":ZoneType.substring(2,4)+ZoneType.substring(0,2),
                                        "toUrl":"",
                                        "all":ableData,
                                        "des":des,
                                        "click":0,
                                        "eqSN":eqSN,
                                        "trans":false,
                                        "onSrc":"../../../src/resource/images/index/air_pre.png",
                                        "offSrc":"../../../src/resource/images/index/air_nor.png"
                                }];
                                eqUl.map(function(item,index){
                                    if(item.Endpoint==Endpoint && item.IEEE==IEEE){
                                        item.shortAddress=shortAddress;
                                        item.DeviceId=DeviceId.substring(2,4)+DeviceId.substring(0,2);
                                        item.name=czName;
                                        item.statu=statu;
                                        item.online=online;
                                        item.all=ableData;
                                        item.ZoneType=ZoneType.substring(2,4)+ZoneType.substring(0,2);
                                        eqLi=null;
                                    }
                                });
                                if(eqLi==null || (DeviceId.substring(2,4)+DeviceId.substring(0,2))=="0000" ||DeviceId=="0400"){
                                }else{
                                    eqUl=eqUl.concat(eqLi);
                                }
                                eqUl=window.addToUrl(eqUl);
                                
                                that.setState({
                                    "YzyEqUl":eqUl
                                });
                                wYzyEq=eqUl;
                                break;
                            case "0E":
                                var id=ableData.substring(4,8);
                                var nameLength=parseInt(ableData.substring(8,10),16);
                                var name=ableData.substring(10,nameLength*2+10);
                                var m=window.prePro(name);
                                var czName=decodeURI(m);
                                var eqLi=[{
                                    'id':id,
                                    'name':czName,
                                    'orderBy':999
                                }];
                                if(czName=="回家场景" || czName=="起床场景" || czName=="睡眠场景" || czName=="离家场景"){
                                }else{
                                    eqLi=null;
                                }
                                baseScene.map(function(item,index){
                                    if(item.name=="回家场景" || item.name=="起床场景" || item.name=="睡眠场景" || item.name=="离家场景"){
                                        item.orderBy=index;
                                    }else{
                                        item.orderBy=999;
                                    }
                                    if(item.id==id){
                                        item.name=czName;
                                        eqLi=null;
                                    }
                                });
                                if(eqLi==null){
                                }else{
                                    baseScene=baseScene.concat(eqLi);
                                }
                                that.setState({
                                    "baseScene":baseScene
                                });
                                break;
                        default:
                            break;
                        }
                      }
                  });
            }
        },
        created(){
            if(82437){
                console.log(1);
                if(!this.$store.socketObj){
                    console.log(2);
                    this.getToken();
                }else{
                    console.log(3);
                    /*this.getListen();
                    this.getSend(); 
                    window.getSdkEqMsg();*/
                }
            }else{
                $("#no_login_shadow").css("display","block");
            }
        }
	}
</script>

<style scoped>
	.equipment {
        padding-left: 4.4rem;
    }
    .equipment .add{
        width: calc(100% - 5.1rem);
        height: 6rem;
        line-height: 6rem;
        background: rgba(255,255,255,.9);
        position: absolute;
        top: 1rem;
        border-radius: 6px;
    }
    .equipment .add .add-symbol{
        font-size: 1.5rem;
        margin-right: .4rem;
    }
    .equipment .add .add-tip{
        position: relative;
        top: -.13rem;
    }
</style>