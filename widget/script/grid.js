$(function() {
    //分类列表
	$.post(ApiUrl+'/api/cates/?callback=?',{},function(data){
                var data = JSON.parse(data);
                
                //alert(data.data.id);
                var html = template('cates', data);
                document.getElementById('cates_list').innerHTML = html;
	});
})