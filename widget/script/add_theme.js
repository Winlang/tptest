//主题分类信息
function cates(){
	api.ajax({
        url:ApiUrl+'/api/cates',
        method:'post',
        data:{}
    },function(data,err){
        var html = template('cates', data);
        document.getElementById('catesinfo').innerHTML = html;
    });
}