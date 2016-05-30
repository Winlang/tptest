//主题基本信息
function iteminfo(item_id){
    api.ajax({
        url:ApiUrl+'/api/iteminfo?id='+item_id+'&callback=?',
        method:'post',
        data:{}
    },function(data,err){
        //限制投票数
        $("#item_setnum").html(data.data.item_setnum);
        //设置图片
        data.data.item_titleimg = set_item_titleimg(data.data.item_titleimg);

        var html = template('item', data);
        document.getElementById('iteminfo').innerHTML = html;

        //展示头像
        for(var i = 0;i<data.data.member_avatar.length;i++){
            data.data.member_avatar[i].avatar = set_avatar(data.data.member_avatar[i].avatar);
        }

        //参与的人数
        $('#member_num').html(data.data.member_num);
        //参与的用户分配模板
        var touxiang = template('item_user_data', data);
        document.getElementById('item_user_data_info').innerHTML = touxiang;
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

//点击加载更多选项
function loading_itemopt(page){
    //获取主题的id
    var item_id = getQueryString('item_id');
    //获取当前登陆用户的id
    var member_id = is_login();
    var next_page = page+1;

    api.ajax({
        url:ApiUrl+'/api/loading_itemopt?item_id='+item_id+'&member_id='+member_id+'&page='+page+'&callback=?',
        method:'post',
        data:{}
    },function(data,err){
        if(data.status == 0){
            $('#itemoption_list').append(data.msg);
            $('#loading').html('查看更多选项');
            $('#loading').attr('onclick','loading_itemopt('+next_page+')');
        }else if(data.status == 2){
            $('#loading').removeAttr('onclick');
            $('#loading').html('没有更多选项了');
        }else{
            $('#loading').parent('li').remove();
        }
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
    var item_id = getQueryString('item_id');
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