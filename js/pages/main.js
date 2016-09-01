
$(document).ready(function(){
	$._messengerDefaults = {
		extraClasses: 'messenger-fixed messenger-theme-future messenger-on-top messenger-on-right'
	};
	
	//头部菜单按钮
	$('#header .nav li a[data-content=content]').click(function(e){
		$('#header .nav li').removeClass('active');
		$(this).parent('li').addClass('active');
	});
	
	// //当窗口大小改变时动态调整高度
	// var adjMainHeight = function(){
		// document.getElementById('main').style.height = (document.body.clientHeight - 90) + 'px';
		// // $('.content-body').css({'height':($('#innerContent').height() -  $('.content-header').height() - 41)+ 'px'});
	// };
	// window.onresize = adjMainHeight;
	// document.body.onload = adjMainHeight;
	// $(document).ready(function(){
		// document.getElementById('innerContent').onresize = adjMainHeight;
	// });
	
	// //默认触发激活的项
	$("#innerSidebar").content({
		href : $('#header .nav li.active a').attr('href'),
		sidebar : true
	});
	
	//页页边栏与主体高度设置
	$(window).on('resize load',function(){
		var height = $(document.body).height() - 90;
		$('#innerSidebar').height(height);
		
		
		var footerHeight = $('.content-footer').height() || 0;
		height = height - $('.content-header').height() - footerHeight;
		$('.content-body').height(height);
	});
	
	//底部的折叠侧边栏按钮tip
	$('#footer .sidebar-control a').tooltip({
		placement : 'right'
	}); 
	
	//侧边栏点击折叠展开
	$('#innerSidebar').delegate('ul > li a','click',function(e){
		var li = $(this).parent('li'),submenu = $(this).siblings('ul');
		var submenus = $('#innerSidebar li.submenu ul');//取得所有的二级菜单
		var submenus_parents = $('#innerSidebar li.submenu');//取得所有二级菜单的父菜单
		
		var dataUrl = $(this).attr('href');
		$('#innerSidebar ul li').removeClass('active');
		if(dataUrl && dataUrl != '#'){
			li.addClass('active');
		}
		
		if($('#sidebar').width() < 100){
			return;
		}
		
		if(li.hasClass('submenu')){
			if(li.hasClass('opened')){
				submenu.slideUp();
				li.removeClass('opened');
			} else {
				submenus.slideUp();			
				submenu.slideDown();
				submenus_parents.removeClass('opened');		
				li.addClass('opened');
			}
		}
	});
	
	//改变侧边栏的宽度
	$('#footer .sidebar-control a').click(function(e){
		var iconEl = $(this).children(),icon = iconEl.attr('class');
		
		var ppInFn = function(e){
			var $this = $(this),title = $(this).find('span').text(),icon = $this.find('i').attr('class');
			var content = ['<ul>'];
			
			
			$(this).next().find('a').each(function(index,item){
				var aTag = $(item),text = aTag.find('span').text(),href = aTag.attr('href'),iconCls = aTag.find('i').attr('class'),
					dataContent = aTag.attr('data-content'),dataTarget = aTag.attr('data-target');
				content.push(['<li>',
						'<a hidefocus="true" href="',href,'" data-content="',dataContent,'" data-target="',dataTarget,'">',
							'<i class="',iconCls,'"></i> ',text,
						'</a>',
					'</li>'].join(''));
			});
			if(content.length == 1){
				content.push(['<li>',
					'<a hidefocus="true" href="',$this.attr('href'),'" data-content="',$this.attr('data-content'),'" data-target="',$this.attr('data-target'),'">',
						'<i class="',icon,'"></i> ',title,
					'</a>',
				'</li>'].join(''));
			}
			content.push('</ul>');
			
			$this.popover({
				title : title,
				html : true,
				content : content.join(''),
				container: 'body',
				placement : 'right'
			});
			
			$this.popover('show');
			
			var top = $this.position().top;
			if(top + 60 < 65){
				$('body > .popover').offset({ top: 65});
				$('body > .popover .arrow').css({ top: '25%'});
			}
			
			$('body').delegate('.popover','mouseleave',function(e){
				$this.popover('destroy');
			});
			$('body').delegate('.popover .popover-content ul li a','click',function(e){
				$('#innerSidebar ul li').removeClass('active');
				$this.parent('li').addClass('active');
				$this.popover('destroy');
			});
		};
		var ppOutFn = function(e){
			if(e.clientX < 81){
				$(this).popover('destroy');
			}
		};
		
		if(icon == 'icon-arrow-left'){//将侧边栏的宽度改为80
			iconEl.removeClass('icon-arrow-left').addClass('icon-arrow-right');
			$('#innerSidebar').addClass('collapse');
			$('#sidebar').animate({width:80},320);
			
			$('#innerSidebar ul li.active').removeClass('active').closest('li.opened').addClass('active');
			$('#innerSidebar ul li').removeClass('opened');
			$('#innerSidebar li.submenu ul').hide();
			
			$('#sidebar').delegate('ul li a','mouseenter',ppInFn);
			$('#sidebar').delegate('ul li a','mouseleave',ppOutFn);
		}else if(icon == 'icon-arrow-right'){//将侧边栏的宽度恢复成默认的240
			iconEl.removeClass('icon-arrow-right').addClass('icon-arrow-left');
			$('#sidebar').animate({width:240},320,function(){
				$('#innerSidebar').removeClass('collapse');
			});
			$('#sidebar').undelegate('ul li a','mouseenter mouseleave');
		}
		
	});
});
