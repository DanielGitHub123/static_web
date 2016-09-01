$(document).ready(function(){
	//可编辑组件配置
	$.fn.editable.defaults.mode = 'inline';

	//初始化部门选择框	
	$('#department').editable({
		select2 : {enableSearch : false},
        source: [
            {value: 1, text: '内容部'},
            {value: 2, text: '运营部'},
            {value: 3, text: '产品部'}
        ] 
    });
	
	//初始化申请人选择框
	$('#request-people').editable({
		select2 : {enableSearch : false},
        source: [
            {value: 1, text: '张三'},
            {value: 2, text: '李四'},
            {value: 3, text: '王五'}
        ] 
    });
    
    //初始化申请时间输入
	$('#request-date').editable({
		format : 'yyyy-MM-dd HH:mm',
		datetimepicker : {
			todayBtn : 'linked',
			weekStart : 1
		}
	});
	
	//初始化商业价值修改框
	$('#business-value').editable({
		select2 : {enableSearch : false},
        source: [
            {value: 1, text: '非常重要'},
            {value: 2, text: '重要'},
            {value: 3, text: '普通'}
        ] 
    });
    
    //初始化需求状态修改框
    $('#demand-status').editable({
        source: [
            {value:'1',text : '待分析'},
			{value:'2',text : '待评审'},
			{value:'3',text : '待实现'},
			{value:'4',text : '待部署'},
			{value:'5',text : '待验收'},
			{value:'6',text : '待验收'},
			{value:'7',text : '待确认'},
			{value:'8',text : '已完成'},
			{value:'0',text : '关闭'}
        ] 
    });
    
    //初始化时间紧急性
    $('#time-urgent').editable({
        source: [
            {value:'1',text : '普通'},
			{value:'2',text : '紧急'},
			{value:'3',text : '非常紧急'}
        ] 
    });

	//初始化关联文件夹输入框
	
	//初始化涉及选择框
	$('#about-for').editable({
		select2 : {
			tags : ['平台', 'WAP', 'IOS', 'Android'],
			tokenSeparators : [",", " "]
		}
	}); 
 
	
	$('.required').css({'display':'none'});
	
	$('.switch')['bootstrapSwitch'](); // attach bootstrapswitch
	
	
	$('a[data-type]').editable('disable');
	$('.switch').on('switch-change', function (e, data) {
	    var $el = $(data.el), value = data.value;
	    $('a[data-type]').editable(value?'enable':'disable');
	    $('.header-msg').text(value?'编辑需求':'查看需求');
	    $('.required').css({'display':value?'inline':'none'});
	});
});
