//主题分类信息
function myitem_data(page){
	var member_id = is_login();
	var page = page?page:1;
	var next_page = page+1;
	if(member_id == '-1'){
		api.alert({msg: '请先登录'});
		login_page();
		return false;
	}
	api.ajax({
        url:ApiUrl+'/api/myitem_data?member_id='+member_id+'&page='+page+'&callback=?',
        method:'post',
        data:{}
    },function(data,err){
        if(data.status == 0){
        	$('#iteminfo').append(data.msg);
        	$('#but').attr('onclick','myitem_data('+next_page+')');
        	$('#but').html('查看更多');
        }else if(data.status == 10){
        	$('#but').removeAttr('onclick');
        	$('#but').html(data.msg);
        }else{
        	$('#but').removeAttr('onclick');
        	$('#but').html(data.msg);
        }
    });
}