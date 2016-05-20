//主题分类信息
function myitem_data(){
	var member_id = is_login();
	api.ajax({
        url:ApiUrl+'/api/myitem_data?member_id='+member_id+'&callback=?',
        method:'post',
        data:{}
    },function(data,err){
        var html = template('item', data);
        document.getElementById('iteminfo').innerHTML = html;
    });
}