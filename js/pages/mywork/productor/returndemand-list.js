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
});
