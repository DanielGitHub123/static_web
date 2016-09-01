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
    
    $('.content-header .toolbar button[data-handler=search]').click(function(e){
    	$.globalMessenger().post({
			message: '你点击了查询',
			hideAfter: 55,
			hideOnNavigate : true,
			showCloseButton: true
		});
    });
    
    //工具条上的删除
    $('.content-header .toolbar a[data-handler]').click(function(e) {
    	var handler = $(this).attr('data-handler');
    	if(handler == 'delete'){
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
    	}else if(handler == 'return'){
    		bootbox.confirm("您确定要退回选定的记录", function(result) {
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
    	}
		
	});
	
	//工具条上的退回
	 $('.content-body .dropdown-menu a[data-handler]').click(function(e) {
		var handler = $(this).attr('data-handler');
    	if(handler == 'delete'){
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
    	}else if(handler == 'return'){
    		bootbox.confirm("您确定要退回选定的记录", function(result) {
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
    	}
	});
});
