//主题基本信息
function iteminfo(item_id){
    api.ajax({
        url:ApiUrl+'/api/iteminfo?id='+item_id+'&callback=?',
        method:'post',
        data:{}
    },function(data,err){
        //设置图片
        data.data.item_titleimg = set_item_titleimg(data.data.item_titleimg);

        var html = template('item', data);
        document.getElementById('iteminfo').innerHTML = html;
    });
}
//主题对应选项列表
function itemoptions(item_id,member_id){
    api.ajax({
        url:ApiUrl+'/api/itemoptions?id='+item_id+'&member_id='+member_id+'&callback=?',
        method:'post',
        data:{}
    },function(data,err){
        //处理图片
        for (var i = data.data.length - 1; i >= 0; i--) {
                data.data[i].item_optimg = set_item_optimg(data.data[i].item_optimg);
        }
        var html = template('itemoptions', data);
        document.getElementById('itemoption_list').innerHTML = html;
    });
}

//搜索
function search_info(item_title){
    var item_id = getQueryString('item_id');
    api.ajax({
        url:ApiUrl+'/api/search_info?id='+item_id+'&item_title='+item_title+'&callback=?',
        method:'post',
        data:{}
    },function(data,err){
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