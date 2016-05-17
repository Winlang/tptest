//主题基本信息
function iteminfo(){
    api.ajax({
        url:ApiUrl+'/api/iteminfo?recomm=1&callback=?',
        method:'post',
        data:{}
    },function(data,err){
        if(data.status == 0){
            //设置图片
            data.data.item_titleimg = set_item_titleimg(data.data.item_titleimg);

            var html = template('item', data);
            document.getElementById('iteminfo').innerHTML = html;
            var member_id = is_login();
            itemoptions(data.data.id,member_id);
        }else{
            $('div').empty();
            $('#iteminfo').html(data.data);
        }
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

//取消投票
function cancel_toupiao(obj){
    var itemopt_id = $(obj).val();
    var member_id = is_login();
    if(member_id == '-1'){
        api.alert({msg: '请先登录'});
        login_page();
        return false;
    }

    api.ajax({
        url:ApiUrl+'/api/cancel_toupiao?itemopt_id='+itemopt_id+'&member_id='+member_id+'&callback=?',
    },function(data,err){
        if(data.status == 0){
            $(obj).removeAttr('checked');
            $(obj).attr('onclick','showToast(this);');
            $("#n_"+itemopt_id).text(data.itemopt_num);
            $(".n_"+itemopt_id).text(data.itemopt_num);
            $('#default_succ div').html(data.msg);
                $api.css($api.byId("default_succ"),"display:block");
                setTimeout(function(){
                    $api.css($api.byId("default_succ"),"display:none");
                },2000)
        }else{
            $(obj).removeAttr('checked');
            $('#default_fail div').html(data.msg);
            $api.css($api.byId("default_fail"),"display:block");
            setTimeout(function(){
                $api.css($api.byId("default_fail"),"display:none");
            },2000)
        }
    });
}

//搜索
function search_info(item_title){
    var item_id = $("#item_id").val();
    var member_id = is_login();
    api.ajax({
        url:ApiUrl+'/api/search_info?id='+item_id+'&item_title='+item_title+'&member_id='+member_id+'&callback=?',
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