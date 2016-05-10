$(function() {
        //获取主题id
        var item_id = getQueryString('item_id');
        //获取登录用户id
        var member_id = is_login();

        //主题基本信息
	$.post(ApiUrl+'/api/iteminfo?id='+item_id+'&callback=?',{},function(data){

                var data = JSON.parse(data);

                //设置图片
                data.data.item_titleimg = set_item_titleimg(data.data.item_titleimg);

                var html = template('item', data);
                document.getElementById('iteminfo').innerHTML = html;
	});

        //主题对应选项列表
        $.post(ApiUrl+'/api/itemoptions?id='+item_id+'&member_id='+member_id+'&callback=?',{},function(res){
                
                var data = JSON.parse(res);
                
                //处理图片
                for (var i = data.data.length - 1; i >= 0; i--) {
                        data.data[i].item_optimg = set_item_optimg(data.data[i].item_optimg);
                }

                //alert(typeof(data));
                var html = template('itemoptions', data);
                document.getElementById('itemoption_list').innerHTML = html;
        });
})

function search_info(item_title){
                var item_id = getQueryString('item_id');
         $.post(ApiUrl+'/api/search_info?id='+item_id+'&item_title='+item_title+'&callback=?',{},function(data){
                
                var data = JSON.parse(data);
               if(data.status=='0'){
                $('#itemoption_l').css('display','block');
                $('#itemoption_list').css('display','none');
                document.getElementById('itemoption_l').innerHTML = data.data;
               }else{
                api.alert({msg:data.data});
                $('#itemoption_l').css('display','none');
                $('#itemoption_list').css('display','block');
               }
                
                
        });
}