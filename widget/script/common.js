
/*
 * js获取url参数
 */
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}



/**
 * 回到应用的首页
 */
function backtoindex(){
    api.closeToWin({
        name: 'root'
    });
}

//发送短信操作
function sendMsg(mobile){
	// $.post(ApiUrl+'/api/sendMsg/?callback=?',{'mobile':mobile},function(data){
	// 	if(data.status == 1){
	// 		return 1;
	// 	}else{
	// 		return 0;
	// 	}
	// });

     api.ajax({
          url: ApiUrl+'/userapi/sendMsg/?callback=?',
          method: 'post',
          data: {
            values: { 
                'mobile':mobile
            }
          }
      },function(data, err){
          if (data.status == 1) {
                return 1;
          } else {
                return 0;
          }
    });
}

//主题图片
function set_item_titleimg(item_titleimg){
	return UploadUrl+'/admin/'+item_titleimg;
}


//主题选项图片
function set_item_optimg(item_optimg){
	return UploadUrl+'/admin/'+item_optimg;
}

//用户头像图片
function set_avatar(avatar){
    return UploadUrl+'/avatar/'+avatar;
}

function showToast(){
    $api.css($api.byId("default"),"display:block");
    setTimeout(function(){
        $api.css($api.byId("default"),"display:none");
    },2000)
}

function login_page(callback){
  api.openWin({
        name:'login',
        url:'login.html?type='+callback,
        delay:300,
        animation:{
            type:'fade'
        }
    })
}

function is_login(){
	var uid = $api.getStorage('uid');
	if(uid > 0){
		//已登录
		return uid;
	}else{
		//未登录
		return -1;
	}
}
// function is_login(){
// 	$.post(ApiUrl+'/api/is_login',{},function(data){
// 		if(data.status == 1){
// 			return 1;
// 		}else{
// 			return 2;
// 		}
// 	});
// }

function dologout(){
	$api.setStorage('uid','');
	api.sendEvent({
        name : 'logoutEvent',
        extra : {
           name : '登录/注册',
        }
    });
	login_page();
}

function getNowTime(){
	return (new Date()).valueOf();
}


/**********************************头像上传相关函数  开始************************************/
//头像打开系统相册
function getPicture(){
    api.getPicture({
        sourceType: 'library',
        encodingType: 'jpg',
        mediaValue: 'pic',
        destinationType: 'url',
        allowEdit: true,
        quality: 75,
        // targetWidth:200,
        // targetHeight:200,
        saveToPhotoAlbum: false
    }, function(ret, err){
        if(ret.data){
            //打开功能弹层
             api.openWin({
                name: 'avatarclip_frm',
                url: 'avatarclip_frm.html?picUrl='+ret.data,
                bounces: true,
            });
        }else{
            alert('您没有选择图片');
        }
    })
}

 

 //头像剪裁图片
 function imageClip(picUrl){ 
        var imageClip = api.require('imageClip');
        api.parseTapmode();
        var header = $api.byId('aui-header');
        $api.fixStatusBar(header); 
        var headerPos = $api.offset(header);
        var body_h = $api.offset($api.dom('body')).h;
        imageClip.open({
               path: picUrl,
                clipRect : {
                    x : api.winWidth/2-150,
                    y : api.winHeight/2-180,                
                    w : 300,
                    h : 300,
                    fixation:true
                },
                bg:'#080808',     
                x: 0,
                y: headerPos.h,
                w: headerPos.w,
                h: 'auto'                       
        },function( ret, err ){    
            if (ret.status) {
                //功能frame控制保存和关闭功能
//              api.openFrame({
//                  name : 'save',
//                  url : 'avatarclip_frm.html',
//                  rect : {
//                      x : 0,
//                      y : 0,
//                      w : 'auto',
//                      h : 65
//                  },
//                  bounces : true,
//                  opaque : false
//              });
                //功能frame控制保存和关闭功能
                // api.openFrame({
                //     name : 'close',
                //     url : './clipclose.html',
                //     rect : {
                //         x : 0,
                //         y : 0,
                //         w : 'auto',
                //         h : 64
                //     },
                //     bounces : false,
                //     opaque : false
                // });
            }else{
            	alert('打开裁剪头像失败~');
            }
        });
}


//上传头像
function uploadAvatar(picUrl){
 	//上传
    api.ajax({
            url: ApiUrl+'/api/uploadAvatar',
            method: 'post',
            data: {
                values: { 
                    name: 'upfile'
                },
                files: { 
                    file: picUrl
                }
            }
        },function(ret1, err1){
        	//显示等待上传过程
        	//showDialog()
            if (ret1.msg != '') {
                //手机显示预览
                var uid = is_login();
                //记录用户所传图片路径及返回
             //    $.post(ApiUrl+'/api/saveUserAvatar/?callback=?',{'avatar':ret1.msg,'uid':uid},function(ret_data){
             //          var ret_data = JSON.parse(ret_data);
             //          if(ret_data.status == 1){
             //          	  //设置监听 返回设置头像
             //    		  // 广播事件
				         //    api.sendEvent({
					        //     name : 'avatar_upload_successEvent',
					        //     extra : {
					        //        name : ret1.msg,
					        //     }
					        // });

				         //    //关闭当前窗口
				         //    api.closeWin();
                		  	
             //          }else{
             //          	  alert(ret_data.msg);
             //          }
             //    });

                api.ajax({
                      url: ApiUrl+'/api/saveUserAvatar/?callback=?',
                      method: 'post',
                      data: {
                        values: { 
                            'avatar':ret1.msg,
                            'uid':uid
                        }
                      }
                  },function(ret_data, err){
                      if (ret_data) {
                          //设置监听 返回设置头像
                          // 广播事件
                            api.sendEvent({
                                name : 'avatar_upload_successEvent',
                                extra : {
                                   name : ret1.msg,
                                }
                            });

                            //关闭当前窗口
                            api.closeWin();
                            
                      } else {
                           api.alert({msg:JSON.stringify(err)});
                      }
                });
                  
            } else {
                alert('上传失败~');
                //api.alert({msg:JSON.stringify(err)});
            }
        });    

}

//保存剪裁图像
function save(){
    var imageClip = api.require('imageClip');
    imageClip.save(function( ret, err ){        
        if( ret ){
            //alert( JSON.stringify( ret ) );
            uploadAvatar(ret.savePath);
        }else{
            alert( JSON.stringify( err ) );
        }
    })
}



/**********************************头像上传相关函数  结束************************************/


/**********************************主题图片上传相关函数  开始************************************/
//   xx 代表:  选项

//主题图片打开系统相册
function item_getPicture(){
    api.getPicture({
        sourceType: 'library',
        encodingType: 'jpg',
        mediaValue: 'pic',
        destinationType: 'url',
        allowEdit: true,
        quality: 75,
        // targetWidth:200,
        // targetHeight:200,
        saveToPhotoAlbum: false
    }, function(ret, err){
        if(ret.data){
            //打开功能弹层
             api.openWin({
                name: 'itemclip_frm',
                url: 'itemclip_frm.html?picUrl='+ret.data,
                bounces: true,
            });
        }else{
            api.alert({msg:err.msg});
        }
    })
}


 //主题剪裁图片
 function item_imageClip(picUrl){ 
        var imageClip = api.require('imageClip');
        api.parseTapmode();
        var header = $api.byId('aui-header');
        $api.fixStatusBar(header); 
        var headerPos = $api.offset(header);
        var body_h = $api.offset($api.dom('body')).h;
        imageClip.open({
               path: picUrl,
                clipRect : {
                    x : api.winWidth/2-150,
                    y : api.winHeight/2-180,                
                    w : 300,
                    h : 200,
                    fixation:true
                },
                bg:'#080808',     
                x: 0,
                y: headerPos.h,
                w: headerPos.w,
                h: 'auto'                       
        },function( ret, err ){    
            if (ret.status) {
                //功能frame控制保存和关闭功能
//              api.openFrame({
//                  name : 'save',
//                  url : 'avatarclip_frm.html',
//                  rect : {
//                      x : 0,
//                      y : 0,
//                      w : 'auto',
//                      h : 65
//                  },
//                  bounces : true,
//                  opaque : false
//              });
                //功能frame控制保存和关闭功能
                // api.openFrame({
                //     name : 'close',
                //     url : './clipclose.html',
                //     rect : {
                //         x : 0,
                //         y : 0,
                //         w : 'auto',
                //         h : 64
                //     },
                //     bounces : false,
                //     opaque : false
                // });
            }else{
                alert('打开裁剪头像失败~');
            }
        });
}


//上传主题图片
function uploaditempic(picUrl){
    //上传
    api.ajax({
            url: ApiUrl+'/api/uploaditemimg',
            method: 'post',
            data: {
                values: { 
                    name: 'upfile'
                },
                files: { 
                    file: picUrl
                }
            }
        },function(ret, err){
        
            //显示等待上传过程
            //showDialog()
            if (ret.msg != '') {
                //手机显示预览
                var uid = is_login();
                  //设置监听 返回设置头像
                  // 广播事件
                    api.sendEvent({
                        name : 'item_upload_successEvent',
                        extra : {
                           name : ret.msg,
                        }
                    });

                    //关闭当前窗口
                    api.closeWin();
                    
                };
        });   
 }

//主题保存剪裁图像
function item_save(){
    var imageClip = api.require('imageClip');
    imageClip.save(function( ret, err ){        
        if( ret ){
            //alert( JSON.stringify( ret ) );
            uploaditempic(ret.savePath);
        }else{
            alert( JSON.stringify( err ) );
        }
    })
}



/**********************************主题图片上传相关函数  结束************************************/


/**********************************选项图片上传相关函数  开始************************************/
//   xx 代表:  选项

//头像打开系统相册
function xx_getPicture(){
    api.getPicture({
        sourceType: 'library',
        encodingType: 'jpg',
        mediaValue: 'pic',
        destinationType: 'url',
        allowEdit: true,
        quality: 75,
        // targetWidth:200,
        // targetHeight:200,
        saveToPhotoAlbum: false
    }, function(ret, err){
        if(ret.data){
            //打开功能弹层
             api.openWin({
                name: 'xxclip_frm',
                url: 'xxclip_frm.html?picUrl='+ret.data,
                bounces: true,
            });
        }else{
            api.alert({msg:err.msg});
        }
    })
}


 //头像剪裁图片
 function xx_imageClip(picUrl){ 
        var imageClip = api.require('imageClip');
        api.parseTapmode();
        var header = $api.byId('aui-header');
        $api.fixStatusBar(header); 
        var headerPos = $api.offset(header);
        var body_h = $api.offset($api.dom('body')).h;
        imageClip.open({
               path: picUrl,
                clipRect : {
                    x : api.winWidth/2-150,
                    y : api.winHeight/2-180,                
                    w : 300,
                    h : 200,
                    fixation:true
                },
                bg:'#080808',     
                x: 0,
                y: headerPos.h,
                w: headerPos.w,
                h: 'auto'                       
        },function( ret, err ){    
            if (ret.status) {
                //功能frame控制保存和关闭功能
//              api.openFrame({
//                  name : 'save',
//                  url : 'avatarclip_frm.html',
//                  rect : {
//                      x : 0,
//                      y : 0,
//                      w : 'auto',
//                      h : 65
//                  },
//                  bounces : true,
//                  opaque : false
//              });
                //功能frame控制保存和关闭功能
                // api.openFrame({
                //     name : 'close',
                //     url : './clipclose.html',
                //     rect : {
                //         x : 0,
                //         y : 0,
                //         w : 'auto',
                //         h : 64
                //     },
                //     bounces : false,
                //     opaque : false
                // });
            }else{
            	alert('打开裁剪头像失败~');
            }
        });
}


//上传头像
function uploadxxpic(picUrl){
	//上传
    api.ajax({
            url: ApiUrl+'/api/uploaditemoptimg',
            method: 'post',
            data: {
                values: { 
                    name: 'upfile'
                },
                files: { 
                    file: picUrl
                }
            }
        },function(ret, err){
        
        	//显示等待上传过程
        	//showDialog()
            if (ret.msg != '') {
                //手机显示预览
                var uid = is_login();
              	  //设置监听 返回设置头像
        		  // 广播事件
		            api.sendEvent({
			            name : 'xx_upload_successEvent',
			            extra : {
			               name : ret.msg,
			            }
			        });

		            //关闭当前窗口
		            api.closeWin();
                	
                };
        });   
 }

//选项保存剪裁图像
function xx_save(){
    var imageClip = api.require('imageClip');
    imageClip.save(function( ret, err ){        
        if( ret ){
            //alert( JSON.stringify( ret ) );
            uploadxxpic(ret.savePath);
        }else{
            alert( JSON.stringify( err ) );
        }
    })
}



/**********************************选项图片上传相关函数  结束************************************/