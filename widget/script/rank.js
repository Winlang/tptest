$(function() {
    //获取主题id
    var id = getQueryString('item_id');

    //获取主题排行榜选项
	$.post(ApiUrl+'/api/item_rank?id='+id+'&callback=?',{},function(data){
		
		var data = JSON.parse(data);

		$('.rank-title').html(data.data.item_title);
		var html = template('item_rank', data);
		document.getElementById('item_rankinfo').innerHTML = html;
	});
})