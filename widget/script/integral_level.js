//调取用户信息
function userinfo(){
	var member_id = is_login();
	api.ajax({
		url:ApiUrl+'/api/userinfo?uid='+member_id+'&callback=?',
		method:'post',
		data:{}
	},function(data,err){
		data.avatar = UploadUrl+'/avatar/'+data.avatar;
		$('#avatar').attr('src',data.avatar);
		//当前等级
		$('#lev').html('Lv.'+data.level.lev);
		//下一等级
		var next_lev = data.level.lev+1;
		$('#next_lev').html('Lv.'+next_lev);
		//积分
		$('.charts').attr('ps',data.level.integral);
		animate();
	});
}