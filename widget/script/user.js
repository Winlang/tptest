function sendVerify(){
		var mobile = $('#mobile').val();

		//验证是否是争取的手机号码
		if(!mobile.match(/^1[3|4|5|8][0-9]\d{4,8}$/)){
		    alert("手机号码格式不正确，请重新输入"); 
		    return false;
		}

		if(mobile == "" || mobile == null){
			alert('手机号不能为空');
			return false;
		}
		

		//发送短信 并显示 倒计时
		var sms_status = sendMsg(mobile);
		if(sms_status == 0){
			alert('发送失败');
			return false;
		}

		//倒计时
		$(this).html(60);

		//不能被点击
		$(this).attr("disabled", "disabled");

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

        if(password != password2){
        	alert('两次密码不一致密码');
        	return false;
        }

        //提交数据
        $.post(ApiUrl+'/api/register_one',{'mobile':mobile,'code':code,'password':password,'password2':password2},function(data){
        	//注册成功 进入个人中心
        	if(data.status == 1){

	        	//设置 登陆表识
        		var uid = data.msg;
        		$api.setStorage('uid',uid);
        		
    			//     api.setPrefs({
				//     key: 'uid',
				//     value: data.msg
				// });

        		//用户中心信息
				$.post(ApiUrl+'/api/userinfo',{'uid':uid},function(data){

			        // 广播事件
		            api.sendEvent({
			            name : 'reg_login_successEvent',
			            extra : {
			               name : data.mobile,
			            }
			        });

		          
		           	//跳至信息设置页面
		      //      	api.openWin({
				    //     name: 'register_two',
				    //     url: 'register_two_frm.html',
				    // });

				    api.openFrame({
			            name : 'register_two_frm',
			            url : 'register_two_frm.html',
			        });
		           
			    });

	        }else{
	        	alert('注册失败,请重新注册~');
	        }
        },'json');
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
        $.post(ApiUrl+'/api/login',{'mobile':mobile,'passwd':password},function(data){
        	
        	//登陆成功 进入个人中心
        	if(data.status == 1){
        		//设置 登陆表识
        		var uid = data.msg;
        		$api.setStorage('uid',uid);

        		//用户中心信息
				$.post(ApiUrl+'/api/userinfo',{'uid':uid},function(data){

			        // 广播事件
		            api.sendEvent({
			            name : 'reg_login_successEvent',
			            extra : {
			               name : data.mobile,
			               callback : type,
			            }
			        });

		            api.closeWin();
		           
		           
			    },'json');

	        }else{
	        	alert('登陆失败,请重新登陆~');
	        }
        },'json');
}