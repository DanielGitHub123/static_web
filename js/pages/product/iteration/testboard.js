
$(document).ready(function(){
	//初始化选择框插件
	$("select").select2({
		enableSearch : false
	});
	
	var getColumnClass = function(cls){
		return cls.replace('test-list','').replace('ui-sortable','').replace(/\s/g,'');
	};
	
	//通过状态改变状态
	$('.test-list').sortable({
		revert: true,
		opacity: 0.6,
		connectWith: '.test-list',
		placeholder: 'placeholder',
		start : function(e,ui){
			//记录行号
			var trIndex = $(this).parent('tr').index('.content-body > table tr');
			$(ui.item.get(0)).data('trIndex',trIndex);
			
			//记录列号
			var tdIndex = $(this).index('.content-body > table tr td');
			$(ui.item.get(0)).data('tdIndex',tdIndex);
			
			//记录原始的拖动的组件的container
			$(ui.item.get(0)).data('ddContainer',this);
			
			var placeholder = $(ui.placeholder.get(0));
			placeholder.removeClass('error').addClass('right');
			placeholder.empty().append('<i class="icon-ok-sign"></i>');
		},
		stop : function(e,ui){
			$(this).sortable('refresh');
			$(this).sortable('refreshPositions');
		},
		
		over : function(e,ui){
			var trIndex = $(this).parent('tr').index('.content-body > table tr');
			var stIndex = $(ui.item.get(0)).data('trIndex');
			var placeholder = $(ui.placeholder.get(0));
			if(stIndex != trIndex){
				placeholder.removeClass('right').addClass('error');
				placeholder.empty().append('<i class="icon-ban-circle"></i>');
			}else{
				placeholder.removeClass('error').addClass('right');
				placeholder.empty().append('<i class="icon-ok-sign"></i>');
			}
		},
		update : function(e,ui){
			var trIndex = $(this).parent('tr').index('.content-body > table tr');
			var tdIndex = $(this).index('.content-body > table tr td');
			var dIndex = $(ui.item.get(0)).data('tdIndex');
			var rIndex = $(ui.item.get(0)).data('trIndex');
			console.info('td:'+dIndex + '\ttr:'+rIndex);
			
			var oldContainer = $(ui.item.get(0)).data('ddContainer');
				var tdClass = getColumnClass($(this).attr('class')),oldClass = getColumnClass($(oldContainer).attr('class'));
				var cnMsg = {'waiting':'待开发','devping':'开发中','done':'已完成'};

			if(tdIndex == dIndex && trIndex == rIndex && tdClass == oldClass){
				$.globalMessenger().post({
					message: '仅同列中位置发生改变',
					hideAfter: 5,
					hideOnNavigate : true,
					showCloseButton: true
				});
			}
			
		},
		receive : function(e,ui){
			var trIndex = $(this).parent('tr').index('.content-body > table tr');
			var tdIndex = $(this).index('.content-body > table tr td');
			
			var dIndex = $(ui.item.get(0)).data('tdIndex');
			var rIndex = $(ui.item.get(0)).data('trIndex');
			
			if(rIndex != trIndex){
				$.globalMessenger().post({
					message: '<span style="color:red">不是</span>同一行发生的拖动',
					hideAfter: 5,
					hideOnNavigate : true,
					showCloseButton: true
				});
				$($(ui.item.get(0)).data('ddContainer') || '.test-list').sortable('cancel');
				return false;
			}else{
				
				var oldContainer = $(ui.item.get(0)).data('ddContainer');
				var tdClass = getColumnClass($(this).attr('class')),oldClass = getColumnClass($(oldContainer).attr('class'));
				var cnMsg = {'waiting':'待开发','devping':'开发中','done':'已完成'};	
				
				$.globalMessenger().post({
					message: '从 <span style="color:red;">'+ cnMsg[oldClass] +'</span> 状态修改为 <span style="color:red;">'+cnMsg[tdClass] + '</span> 状态',
					hideAfter: 5,
					hideOnNavigate : true,
					showCloseButton: true
				});
			}
		}
	});
	
	
	//通过下拉菜单改变状态
	$('.test-list').delegate('a[data-handler=waiting],a[data-handler=devping],a[data-handler=done]','click',function(e) {
		var tdClassName = $(this).attr('data-handler'),coClassName = $(this).closest('td').attr('class'),
			columnClass = coClassName.replace('test-list','').replace('ui-sortable','').replace(/\s/g,'');
		var cnMsg = {'waiting':'待开发','devping':'开发中','done':'已完成'};
		if(tdClassName == columnClass){
			$.globalMessenger().post({
				message: '状态未发生变化',
				hideAfter: 5,
				hideOnNavigate : true,
				showCloseButton: true
			});
		}else{
			$(this).closest('tr').children('td.'+ tdClassName).append($(this).closest('div.test-item').remove());
			$.globalMessenger().post({
				message: '从 <span style="color:red;">'+ cnMsg[columnClass] +'</span> 状态修改为 <span style="color:red;">'+cnMsg[tdClassName] + '</span> 状态',
				hideAfter: 5,
				hideOnNavigate : true,
				showCloseButton: true
			});
		}
		
		
	});
	
});
