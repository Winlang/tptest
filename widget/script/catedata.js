function cateitems() {
    
    var cateid=getQueryString('cateid');

    api.ajax({
        url:ApiUrl+'/api/cateitems?id='+cateid+'&callback=?',
        method:'post',
        data:{}
    },function(data,err){
            if(data.status=='1'){
                document.getElementById('aui-content').innerHTML = "<span class='aui-text-center aui-text-default'>"+data.data+"</span>";
                return false;
            }

            // 处理图片
            for (var i = data.list.length - 1; i >= 0; i--) {
                data.list[i].item_titleimg = set_item_titleimg(data.list[i].item_titleimg);
            }

            var html = template('test', data);

            document.getElementById('aui-content').innerHTML = html;
    });
}