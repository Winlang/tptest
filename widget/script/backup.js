//缓存策略
1, 首页最新 客户端实时获取数据
2, 首页热门 客户端半小时更新      服务器端缓存半小时更新
3，找活动   分类做成静态 数据5分钟更新  服务器端缓存5分钟更新

//缓存数据开始
// var db = api.require('db');
// db.openDatabase({
//     name: 'test'
// }, function(ret, err){
//     if(ret.status){
//         //操作数据缓存
//         var sql = 'CREATE TABLE Persons(Id_P int, LastName varchar(255), FirstName varchar(255), Address varchar(255), City varchar(255))';
//         db.executeSql({
//             name: 'test',
//             sql: sql
//         }, function(ret, err){
//             if(ret.status){
//                 api.alert({msg:'执行SQL成功'});
//             }else{
//                 api.alert({msg:err.msg});
//             }
//         });
//     }else{
//         api.alert({msg:err.msg});
//     }
// });
//缓存数据结束