$(function() {
        //最热 半小时更新一次 即半小时删除本地存储
        // if(getNowTime() - $api.getStorage('entertime') > 1800000){
        //         alert(111);
        //         $api.setStorage('storage_data','');
        // }
        if(getNowTime() - $api.getStorage('entertime') > 10){
                $api.setStorage('storage_data','');
        }      

        //获取缓存数据
        var storage_data = $api.getStorage('storage_data');
        
        if(storage_data != '' ){
               var data = JSON.parse(storage_data);
               //处理图片
                for (var i = data.list.length - 1; i >= 0; i--) {
                        data.list[i].item_titleimg = set_item_titleimg(data.list[i].item_titleimg);
                }

                
                var html = template('test', data);
                document.getElementById('aui-content').innerHTML = html;
        }else{
        	//alert('hello'+$api.getStorage('is_login'));







                /****************************实时数据 开始****************************/            
                //最新
                $.post(ApiUrl+'/api/index/?callback=?',{},function(data){
                        //记录设置缓存时间
                        $api.setStorage('entertime',getNowTime());
                        //设置缓存
                        $api.setStorage('storage_data',data);

                        var data = JSON.parse(data);


                        //处理图片
                        for (var i = data.list.length - 1; i >= 0; i--) {
                                data.list[i].item_titleimg = set_item_titleimg(data.list[i].item_titleimg);
                        }

                        
                        var html = template('test', data);
                        document.getElementById('aui-content').innerHTML = html;
                });
                //最热
                $.post(ApiUrl+'/api/index/?callback=?',{},function(data){
                        //记录设置缓存时间
                        $api.setStorage('entertime',getNowTime());
                        //设置缓存
                        $api.setStorage('storage_data',data);

                        var data = JSON.parse(data);


                        //处理图片
                        for (var i = data.list.length - 1; i >= 0; i--) {
                                data.list[i].item_titleimg = set_item_titleimg(data.list[i].item_titleimg);
                        }

                        
                        var html = template('test1', data);
                        document.getElementById('aui-content1').innerHTML = html;
                });
                /****************************实时数据 结束****************************/ 

        }
})


