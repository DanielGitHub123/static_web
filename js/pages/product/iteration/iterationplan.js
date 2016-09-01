$(document).ready(function(){
	//初始化选择框插件
	$("select").select2({
		enableSearch : false
	});
	
	//点击标题后展开与折叠
	$('.sprint-title').delegate('a','click',function(e){
		var $this = $(this),storyList = $this.closest('.sprint').find('.story-list');
		if(!storyList.is(":visible")){
			$this.removeClass('icon-caret-right').addClass('icon-caret-down');
		}else{
			$this.removeClass('icon-caret-down').addClass('icon-caret-right');
			
		}
		storyList.slideToggle("fast",function(){
			var footerHeight = $('.content-footer').height() || 0;
			var height = $(document.body).height() - 91 - $('.content-header').height() - footerHeight;
			$('.content-body').height(height);
		});
	});
	
	
	var removeMarkerClass = function(element){
		$(element).removeClass('marker-green').removeClass('marker-yellow')
				  .removeClass('marker-red');
	};
	
	//初始化表格的拖动
	$(".story-table tbody,.story-list table tbody,.sprint").sortable({ 
		revert: true,
		opacity: 0.8,
		cursor: "move",
		connectWith: '.story-list table tbody,.story-table tbody,.sprint',
		start : function(e,ui){
			//记录原始的拖动的组件的container
			$(ui.item.get(0)).data('ddContainer',this);
			//记录原始拖动的元素
			$(ui.item.get(0)).data('ddItem',ui.item.get(0));
			
		},
		over : function(e,ui){
			
			//移除标记
			removeMarkerClass($(ui.item.get(0)).data('ddContainer'));
		},
		out : function(e,ui){
			
			//移除标记
			removeMarkerClass(this);
		},
		drop : function(e,ui){
			
			//拖动完成后移除所有标记
			removeMarkerClass(".story-table tbody,.story-list table tbody,.sprint");
		},
		change : function(e,ui){//当拖动的元素位置发生改变时，添加是否可以drop的标记
			var cls = $(this).closest('div').attr('class'),
				ddContainer = $($(ui.item.get(0)).data('ddContainer')),
				ddItem = $($(ui.item.get(0)).data('ddItem'));
			if(ddContainer.attr('class').indexOf('sprint') != -1){
				$(this).addClass('marker-red');//添加可以drop的标记
			}else if(ddItem.attr('class').indexOf('closed') != -1){
				$(this).addClass('marker-red');//添加可以drop的标记
			}else{
				if(cls.indexOf('sprint') != -1){
					$(this).addClass('marker-yellow');
				}else if(cls.indexOf('content-body') != -1){
					$(this).addClass('marker-red');//添加可以drop的标记
				}else{
					$(this).addClass('marker-green');//添加可以drop的标记
				}
			}
			

		},
		receive : function(e,ui){
			var cls = $(this).attr('class');
			
			if(cls.indexOf('marker-yellow') != -1){//如果是黄色，就添加进面板的拖放区域
				var item = ui.item.get(0);
				$(this).find('.story-list table').append(item);
				removeMarkerClass(".story-table tbody,.story-list table tbody,.sprint");
			}
			
			//迭代面板不可以拖动到其它容器中
			var ddContainer = $($(ui.item.get(0)).data('ddContainer'));
			if(ddContainer.attr('class').indexOf('sprint') != -1){
				ddContainer.sortable('cancel');
				removeMarkerClass(".story-table tbody,.story-list table tbody,.sprint");
			}
			
			//带有closed的拖动的元素不可以拖动到其它容器中
			var ddItem = $($(ui.item.get(0)).data('ddItem'));
			if(ddItem.attr('class').indexOf('closed') != -1){
				ddContainer.sortable('cancel');
				removeMarkerClass(".story-table tbody,.story-list table tbody,.sprint");
			}
		},
		update : function(e,ui){
			var cls = $(this).attr('class');
			if(cls.indexOf('marker-red') != -1){
				removeMarkerClass(".story-table tbody,.story-list table tbody,.sprint");
				$($(ui.item.get(0)).data('ddContainer')).sortable('cancel');
			}
		}
	});
	
	//工具条上的关闭迭代的按钮
	$('.toolbar a[data-handler=close]').click(function(e){
		var ids = [];
		$('.sprint input[type=checkbox]').each(function(index,item){
			if($(item).prop('checked')){
				var id = $(item).closest('.sprint').attr('data-id');
				ids.push(id);
			}
		});
		if(ids.length == 0){
			$.globalMessenger().post({
				message: '请选择要关闭的迭代',
				hideAfter: 5,
				hideOnNavigate : true,
				showCloseButton: true
			});
		}else{
			bootbox.confirm("您确定要关闭选定的迭代吗?", function(result) {
				if(result){
					$.globalMessenger().post({
						message: '关闭迭代，ids=' + ids.join(','),
						hideAfter: 5,
						hideOnNavigate : true,
						showCloseButton: true
					});
				}
			});
		}
	});
	
	
	//每一个迭代上的关闭按钮
	$('.sprint a[data-handler=close]').click(function(e){
		var id = $(this).closest('.sprint').attr('data-id');
		bootbox.confirm("您确定要关闭此迭代吗?", function(result) {
			if(result){
				$.globalMessenger().post({
					message: '请在这里写关闭迭代的ajax请求代码,id:' + id,
					hideAfter: 5,
					hideOnNavigate : true,
					showCloseButton: true
				});
			}else{
				$.globalMessenger().post({
					message: '<font color="white">你取消了关闭迭代</font>',
					hideAfter: 5,
					hideOnNavigate : true,
					showCloseButton: true
				});
			}
		});
	});
});
