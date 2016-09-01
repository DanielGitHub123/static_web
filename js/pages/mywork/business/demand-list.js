
$(document).ready(function(){
	//初始化选择框插件
	$("select").select2({
		enableSearch : false
	});
		
	//初始化树形结构数据表
	$('.tree').treegrid({
        treeColumn: 1,
        initialState : 'collapsed',
        expanderExpandedClass: 'icon-caret-down',
        expanderCollapsedClass: 'icon-caret-right'
    });	
    
    $('.content-body a[data-handler=submit]').click(function(e) {
		bootbox.confirm("您确定要提交选定的记录", function(result) {
			if(result){
				//在这里写ajax请求
				
				$.globalMessenger().post({
					message: '你选择了：'+result,
					hideAfter: 55,
					hideOnNavigate : true,
					showCloseButton: true
				});
			}
		});
	});
			
	$('.content-body a[data-handler=delete]').click(function(e) {
		bootbox.confirm("您确定要删除选定的记录", function(result) {
			if(result){
				//在这里写ajax请求
				
				$.globalMessenger().post({
					message: '你选择了：'+result,
					hideAfter: 55,
					hideOnNavigate : true,
					showCloseButton: true
				});
			}
		});
	});
	
	$('form button[data-handler=search]').click(function(e) {
		$.globalMessenger().post({
			message: '查询',
			hideAfter: 55,
			hideOnNavigate : true,
			showCloseButton: true
		});
	});
});
