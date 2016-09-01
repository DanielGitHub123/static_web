$(document).ready(function(){
	//初始化选择框插件
	$("select").select2({
		enableSearch : false
	});
	
	//通过状态改变状态
	$('#story-container .sortable-list').sortable({
		revert: true,
		opacity: 0.6,
		connectWith: '#story-container .sortable-list',
		placeholder: 'placeholder',
		start : function(e,ui){
			var state = $(ui.item.get(0)).closest('td').attr('class');
			$(ui.item.get(0)).data('original',state);
			
			var placeholder = $(ui.placeholder.get(0));
			placeholder.removeClass('error').addClass('right');
			placeholder.empty().append('<i class="icon-ok-sign"></i>');
		},
		update : function(e,ui){
			var state = $(ui.item.get(0)).closest('td').attr('class');
			var oState = $(ui.item.get(0)).data('original');
			if(state == oState){
				$.globalMessenger().post({
					message: '仅同列中位置发生改变',
					hideAfter: 5,
					hideOnNavigate : true,
					showCloseButton: true
				});
			}
		},
		receive : function(e,ui){
			var state = $(ui.item.get(0)).closest('td').attr('class');
			var cnMsg = {'none':'None','waiting':'待开发','devping':'开发中','done':'已完成','accept':'验收'};
			$.globalMessenger().post({
				message: '从 <span style="color:red;">'+ cnMsg[$(ui.item.get(0)).data('original')] +'</span> 状态修改为 <span style="color:red;">'+cnMsg[state] + '</span> 状态',
				hideAfter: 5,
				hideOnNavigate : true,
				showCloseButton: true
			});
		}
	});
	
	//通过下拉菜单改变状态
	$('.sortable-list').delegate('a[data-handler]','click',function(e) {
		var tdClassName = $(this).attr('data-handler'),coClassName = $(this).closest('td').attr('class');
		var cnMsg = {'none':'None','waiting':'待开发','devping':'开发中','done':'已完成','accept':'验收'};
		if(tdClassName == coClassName){
			$.globalMessenger().post({
				message: '状态未发生变化',
				hideAfter: 5,
				hideOnNavigate : true,
				showCloseButton: true
			});
		}else{
			$('td.'+ tdClassName +' ul.sortable-list').append($(this).closest('li.sortable-item').remove());
			$.globalMessenger().post({
				message: '从 <span style="color:red;">'+ cnMsg[coClassName] +'</span> 状态修改为 <span style="color:red;">'+cnMsg[tdClassName] + '</span> 状态',
				hideAfter: 5,
				hideOnNavigate : true,
				showCloseButton: true
			});
		}
	});
	

});
