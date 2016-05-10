//投票方法
function toupiao(obj,id){
	var member_id = is_login();
	if(member_id == '-1'){
		api.alert({msg: '请先登录'});
		login_page('toupiao');
		return false;
	}
	api.ajax({
		url:ApiUrl+'/api/toupiao?id='+id+'&member_id='+member_id+'&callback=?',
		method:'post',
		data:{}
	},function(data,err){
		if(data.status == 0){
            api.alert({msg: data.data});
            $('#vote_num').html(data.item_optnum);
            $(obj).removeAttr('onclick');
            $(obj).children('span').removeClass('aui-icon-roundcheck');
        	$(obj).children('span').addClass('aui-icon-roundcheckfill');
            $(obj).children('a').html("已投票");
        }else{
            api.alert({msg: data.data});
        }
	});
}

//发表评论
function pinglun(){
	var id = getQueryString('itemoptid');
	var comment = $('#ask-text textarea').val();
	var member_id = is_login();
	if(member_id == '-1'){
		api.alert({msg: '请先登录'});
		login_page();
		return false;
	}
	if(comment == ''){
		api.alert({msg:'评论内容不能为空'});
		return false;
	}
	if(comment.length > 200){
		api.alert({msg:'评论内容不能超过200个字符'});
		return false;
	}

	api.ajax({
		url:ApiUrl+'/api/item_comment?id='+id+'&comment='+comment+'&member_id='+member_id+'&callback=?',
		method:'post',
		data:{}
	},function(data,err){
		if(data.status == 0){
		    api.alert({msg: data.data});
		    $('#ask-text textarea').val(' ');
            hideReply();
		    //最新评论显示在最上面
        	var hh = '';
			hh += '<li class="aui-list-view-cell aui-img">';                  
				hh += '<div class="aui-img-object aui-pull-left ">';
			  		hh += '<img class="avatar" src="/Uploads/avatar"'+data.comm_data.avatar+' alt="" /> ';
				hh += '</div>';
				hh += '<div class="aui-img-body">';
					hh += '<div class="commemt-caption">';
						hh += '<div class="aui-pull-left">';
							hh += '<h5>'+data.comm_data.member_nick+'</h5>';
							hh += '<span>'+data.comm_data.comm_ctime+'</span>';
						hh += ' </div>';
						hh += '<div class="aui-pull-right appreciate">';
							hh += '<span onclick="good_bad(this,'+data.comm_data.id+',\'good\')" class="aui-iconfont aui-icon-appreciate"></span>';
							hh += '<span>0</span>';
							hh += '<span onclick="good_bad(this,'+data.comm_data.id+',\'bad\')" class="aui-iconfont aui-icon-appreciate reverse"></span>';
							hh += '<span>0</span>';
						hh += '</div>';
					hh += '</div>';
					hh += '<p>'+data.comm_data.comm_con+'</p>';
				hh += '</div>';
			hh += '</li>';
			$('#new_comm').after(hh);
	  	}else{
		    api.alert({msg: data.data});
		}
	});
}

//点赞和点扯ajax
function good_bad(obj,commid,status){
	var member_id = is_login();
	if(member_id == '-1'){
		api.alert({msg: '请先登录'});
		login_page();
		return false;
	}
	//请求接口
	api.ajax({
		url:ApiUrl+'/api/comm_goodbad?id='+commid+'&status='+status+'&member_id='+member_id+'&callback=?',
		method:'post',
		data:{}
	},function(data,err){
		if(data.status == 0){
            api.alert({msg: data.data});
            $(obj).attr('onclick','cancel_goodbad(this,'+data.comm_id+');');
        	$(obj).removeClass('aui-icon-appreciate');
        	$(obj).addClass('aui-icon-appreciatefill');
        	$(obj).addClass('aui-text-theme');
        	$(obj).next('span').html(data.num);
        }else{
            api.alert({msg: data.data});
        }
	});
}

//取消点赞点扯
function cancel_goodbad(obj,comm_id){
	var member_id = is_login();
	if(member_id == '-1'){
		api.alert({msg: '请先登录'});
		login_page();
		return false;
	}
	//请求接口
	api.ajax({
		url:ApiUrl+'/api/cancel_goodbad?comm_id='+comm_id+'&member_id='+member_id+'&callback=?',
		method:'post',
		data:{}
	},function(data,err){
		if(data.status == 0){
            api.alert({msg: data.msg});
            $(obj).attr('onclick','good_bad(this,'+data.comm_id+',"'+data.good_bad+'")');
        	$(obj).addClass('aui-icon-appreciate');
        	$(obj).removeClass('aui-icon-appreciatefill');
        	$(obj).removeClass('aui-text-theme');
        	$(obj).next('span').html(data.num);
        }else{
            api.alert({msg: data.msg});
        }
	});
}

//点击加载更多最新评论
function loading_new_comm(page,good_new){
	//获取主题选项id
    var itemoptid = getQueryString('itemoptid');
    //获取当前登陆用户的id
    var member_id = is_login();
	var next_page = page+1;

	api.ajax({
		url:ApiUrl+'/api/loading_comm?itemoptid='+itemoptid+'&member_id='+member_id+'&good_new='+good_new+'&page='+page+'&callback=?',
		method:'post',
		data:{}
	},function(data,err){
		if(data.status == 0){
			$('#itemopt_new_comminfo').append(data.msg);
			$('#loading').html('查看更多最新评论');
			$('#loading').attr('onclick','loading_new_comm('+next_page+',"new")');
		}else if(data.status == 2){
			$('#loading').removeAttr('onclick');
			$('#loading').html('没有更多评论了');
		}else{
			$('#loading').parent('li').remove();
		}
	});
}

// $(function() {

// 	主题选项最新评论列表
// 	$.post(ApiUrl+'/api/option_new_comm?id='+itemoptid+'&member_id='+member_id+'&callback=?',{},function(data){
// 		var data = JSON.parse(data);
		
// 		var html = template('itemopt_new_commdata', data);
// 		document.getElementById('itemopt_new_comminfo').innerHTML = html;
// 	});
// })

//主题选项基本信息
function itemoption(itemoptid,member_id){
	api.ajax({
        url:ApiUrl+'/api/itemoption?id='+itemoptid+'&member_id='+member_id,
        method:'post',
        data:{}
    },function(data,err){
        $('.aui-title').html(data.data.item_opttitle);
        var html = template('itemoptdata', data);
        document.getElementById('itemoptinfo').innerHTML = html;
    });
}

//主题选项精彩评论列表
function option_good_comm(itemoptid,member_id){
	api.ajax({
        url:ApiUrl+'/api/option_good_comm?id='+itemoptid+'&member_id='+member_id+'&callback=?',
        method:'post',
        data:{}
    },function(data,err){
        var html = template('itemopt_good_commdata', data);
        document.getElementById('itemopt_good_comminfo').innerHTML = html;
    });
}
        

//收藏
function collectionInfo(obj){

	var member_id=is_login();
	if(member_id==-1){
		alert('请先登录');
		login_page('shoucang');return false;
	}
	var item_optid=obj;
	api.ajax({
		url:ApiUrl+'/api/collectionInfo?member_id='+member_id+'&item_optid='+item_optid+'&callback=?',
		method:'post',
		data:{}
	},function(data,err){
		if(data.status=='0' || data.status=='2'){
			api.alert({msg: data.data});
			$('#collectionInfo').removeAttr('onclick');
			$('#class_shoucang').removeClass('aui-icon-like');
			$('#class_shoucang').addClass('aui-icon-likefill');
			$('.shoucang').html("已收藏");
		}else{
			api.alert({msg: data.data});
		}
	});
}