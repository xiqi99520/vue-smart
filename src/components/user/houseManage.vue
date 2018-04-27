<template>
	<div>
		<publicHead :title="msg" :rightMenu="rightMenu"></publicHead>
		<ul>
			<li class="clear manage">
				<a href=""></a>
				<p class="pull-left title">名称</p>
				<span class="pull-right cur-house-name">{{ curName }}</span>
				<img class="pull-right arrow-right" :src="iconRight" alt="" />
			</li>
			<li class="clear manage">
				<input class="uploadfile" id="file_input" @click="filechange" ref="myFiles" type="file" accept="image/jpeg,image/png,image/gif" />
				<p class="pull-left title">图片</p>
				<div class="pull-right cur-house-pic">
					<img id="pic" :src="curHouseSrc" alt="" />
				</div>
				<img class="pull-right arrow-right" :src="iconRight" alt="" />
			</li>
		</ul>
		<div class="btn-group">
			<button class="btn">保存</button>
			<button class="btn">删除</button>
		</div>
	</div>
</template>

<script>
	import publicHead from '../common/publicHeader'
	export default {
		data() {
			return {
				iconRight: require('../../assets/common/arrow_right.png'),
				msg: '房屋管理',
				rightMenu: '创建',
				curName: this.$route.params.name,
				curHouseSrc: require('../../assets/index/avatar.png')
			}
		},
		components: {
			publicHead
		},
		methods: {
			/*handkeFileChange() { //图片上传 - 老方法
				let oFile = this.$refs.myFiles.files;
				if(!oFile || !oFile[0]){  
		          return;  
		        }
		        console.log(oFile[0]);
		        alert(oFile[0].toString());
		        // document.getElementById('text').innerHTML = eval('(' + oFile[0] + ')');
		        //此处逻辑: 将获取到的图片传给后台,后台存储后返回前端一个图片地址,最后给src赋上图片地址
		        // document.getElementById('pic').src = oFile[0].name;
		    },*/
		    filechange(){
				var input = document.getElementById("file_input"); 
		    	if(typeof FileReader==='undefined'){ 
				    input.setAttribute('disabled','disabled'); 
				    alert("抱歉，你的浏览器不支持 FileReader"); 
				}else{ 
				    input.addEventListener('change',this.readFile,false); 
				} 
		    },
		    readFile(){ //图片上传 - H5新方法
			    var file = this.$refs.myFiles.files[0]; //获取file对象
			    //判断file的类型是不是图片类型。
			    if(!/image\/\w+/.test(file.type)){ 
			        alert("文件必须为图片！"); 
			        return false;  
			    } 
			    var reader = new FileReader(); //声明一个FileReader实例
			    reader.readAsDataURL(file); //调用readAsDataURL方法来读取选中的图像文件
			    reader.onload = function(e){ 
			    	document.getElementById('pic').src = this.result;
			    } 
			}
		}
	}
</script>

<style scoped>
	.manage {
		position: relative;
		padding: .6rem;
		border-bottom: 1px solid #f2f2f2;
	}
	.manage a, .manage .uploadfile{
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 9;
	}
	.uploadfile {
		opacity: 0;
	}
	.manage .arrow-right {
		width:.5rem;
		height: 1rem;
		position: absolute;
		right: 1rem;
		top: 50%;
		margin-top: -.5rem;
	}
	.manage .title {
		height: 2.4rem;
		line-height: 2.4rem;
		font-size: .9rem;
		margin-left: 1rem;
	}
	.manage .house-avatar {
		width: 2.4rem;
		height: 2.4rem;
	}
	.manage .cur-house-pic {
		width: 2.4rem;
		height: 2.4rem;
		border-radius: 50%;
		margin-right: 2rem;
		overflow: hidden;
	}
	.manage .cur-house-pic img {
		width: 100%;
		height: 100%;
	}
	.manage .cur-house-name {
		display: inline-block;
		font-size: .8rem;
		height: 2.4rem;
		line-height: 2.4rem;
		margin-right: 2rem;
	}
	.btn-group {
		margin-top: 4rem;
	}
	.btn-group .btn {
		width: 90%;
		height: 2.6rem;
		line-height: 2.6rem;
		text-align: center;
		color: #fff;
		background-color: #f2a038;
		border: 1px solid #f2a038;
		border-radius: 4px;
		margin: auto;
		margin-top: 1rem;
	}
</style>