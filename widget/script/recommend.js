$(function() {
    
    
       var item_id;
       var member_id=is_login();

    $.post(ApiUrl+'/api/recommend_item/?callback=?',{},function(data){
                var data = JSON.parse(data);
                data.data.item_titleimg = set_item_titleimg(data.data.item_titleimg);

                var html = template('item', data);

                item_id=data.data.id;
                $('#item_id_hidden').val(item_id);
                
                document.getElementById('iteminfo').innerHTML = html;

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
    });
     
})



function search_info_two(item_title){
                var item_id=$('#search_id').val();
                var item_title=$('#search-input').val();
         $.post(ApiUrl+'/api/search_info?id='+item_id+'&item_title='+item_title+'&callback=?',{},function(data){
                
                var data = JSON.parse(data);
               if(data.status=='0'){
                $('#itemoption_list_two').css('display','block');
                $('#itemoption_list').css('display','none');
                document.getElementById('itemoption_list_two').innerHTML = data.data;
               }else{
                api.alert({msg:data.data});
                $('#itemoption_list_two').css('display','none');
                $('#itemoption_list').css('display','block');
               }
                
                
        });
}