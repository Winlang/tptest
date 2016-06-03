function sendVerify(){
		var mobile = $('#mobile').val();

		//验证是否是争取的手机号码
		if(!mobile.match(/^1[3|4|5|8][0-9]\d{4,8}$/)){
		    alert("手机号码格式不正确，请重新输入"); 
		    return false;
		}

		if(mobile == ""){
			alert('手机号不能为空');
			return false;
		}

    // if(mobile == "" || mobile == null){
    //   alert('手机号不能为空');
    //   return false;
    // }
		
		//发送短信 并显示 倒计时
		var sms_status = sendMsg(mobile);
    
		if(sms_status == 0){
			alert('发送失败');
			return false;
		}

		//倒计时
		$('#sendVerify').html(60);

		//不能被点击
		$('#sendVerify').attr("disabled", "disabled");

		StepTimes();

}

//倒计时函数
function StepTimes() {
	$num = parseInt($('#sendVerify').html());
	$num = $num - 1;
	$('#sendVerify').html($num);
	if ($num <= 0) {
		$('#sendVerify').html("点击再次发送");
		$("#sendVerify").removeAttr("disabled");
	} else {
		setTimeout(StepTimes,1000);
	}
}

//提交下一步   注册功能
function register(){

        //获取value值
        var mobile = $('#mobile').val();
        var code = $('#code').val();
        var password = $('#password').val();
        var password2 = $('#password2').val();

        if(mobile == ''){
          alert('手机号不能为空');
          return false;
        }
        if(password == ''){
          alert('密码不能为空');
          return false;
        }
        if(password != password2){
        	alert('两次密码不一致密码');
        	return false;
        }


        //注册流程
        api.ajax({
              url: ApiUrl+'/api/register_one',
              method: 'post',
              data: {
                values: { 
                    'mobile':mobile,
                    'code':code,
                    'password':password,
                    'password2':password2
                }
              }
          },function(data, err){
              //注册成功 进入个人中心
        	if(data.status == 1){

	        	//设置 登陆表识
        		var uid = data.msg;
        		$api.setStorage('uid',uid);

        		//获取用户数据
      			api.ajax({
                    url: ApiUrl+'/api/userinfo',
                    method: 'post',
                    data: {
                      values: { 
                          'uid':uid
                      }
                    }
                },function(ret_data, err){
                     // 广播事件
		            api.sendEvent({
			            name : 'reg_login_successEvent',
			            extra : {
			               name : ret_data.mobile,
                     avatar : ret_data.avatar,
			            }
			        });

				    api.openFrame({
			            name : 'register_two_frm',
			            url : 'register_two_frm.html',
			        });
              });
	        }else{
	        	alert(data.msg);
	        }
        });
}

//登陆
function login(){
		//接受回调参数
		var type = getQueryString('type');
	
        //获取value值
        var mobile = $('#mobile').val();
        var password = $('#password').val();
        if(mobile == '' || mobile == null){
        	alert('手机号不能为空');
        	return false;
        }
        if(password == '' || password == null){
        	alert('密码不能为空');
        	return false;
        }
        //提交数据
       api.ajax({
              url: ApiUrl+'/api/login',
              method: 'post',
              data: {
                values: { 
                    'mobile':mobile,
                    'passwd':password
                }
              }
          },function(data, err){
              //登陆成功 进入个人中心
        	if(data.status == 1){
        		//设置 登陆表识
        		var uid = data.msg;
        		$api.setStorage('uid',uid);

        		//用户中心信息
    				api.ajax({
                      url: ApiUrl+'/api/userinfo',
                      method: 'post',
                      data: {
                        values: { 
                            'uid':uid
                        }
                      }
                  },function(data, err){
                      //存储常用信息
                      $api.setStorage('nickname',data.nick);
                      $api.setStorage('wx_avatar',data.wx_avatar);
                      $api.setStorage('avatar',data.avatar);


                      
                      // 广播事件
    			            api.sendEvent({
    				            name : 'reg_login_successEvent',
    				            extra : {
                           name : data.mobile,
    				               avatar : data.avatar,
    				               callback : type,
    				            }
    				        });

			            api.closeWin();
                });


	        }else{
	        	alert('登陆失败,请重新登陆~');
	        }
        });

}