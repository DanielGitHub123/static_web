$(document).ready(function(){
	//初始化树形结构数据表
	$('.tree').treegrid({
		checkbox : false,
        treeColumn: 1
        // initialState : 'collapsed'
    });	
	
	//初始化选择框插件
	$("select").select2({
		enableSearch : false
	});
});
