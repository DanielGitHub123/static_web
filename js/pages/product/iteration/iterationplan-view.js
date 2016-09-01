$(document).ready(function(){
	//初始化选择框插件
	$("select").select2({
		enableSearch : false
	});
	
	$('#datetimepicker1,#datetimepicker2').datetimepicker({
		maskInput: true,
		pick24HourFormat: true
	}); 
});
