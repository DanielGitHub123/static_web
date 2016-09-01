(function($) {
	$.fn.center = function(settings) {
		var style = $.extend({
			position : 'absolute', //absolute or fixed
			top : '50%', //50%即居中，将应用负边距计算，溢出不予考虑了。
			left : '50%',
			zIndex : 2009,
			relative : true //相对于包含它的容器居中还是整个页面
		}, settings || {});

		return this.each(function() {
			var $this = $(this);

			if (style.top == '50%')
				style.marginTop = -$this.outerHeight() / 2;
			if (style.left == '50%')
				style.marginLeft = style.marginLeft ||(-$this.outerWidth() / 2);
			if (style.relative && !$this.parent().is('body') && $this.parent().css('position') == 'static')
				$this.parent().css('position', 'relative');
			delete style.relative;
			//ie6
			if (style.position == 'fixed' && $.browser.version == '6.0') {
				style.marginTop += $(window).scrollTop();
				style.position = 'absolute';
				$(window).scroll(function() {
					$this.stop().animate({
						marginTop : $(window).scrollTop() - $this.outerHeight() / 2
					});
				});
			}

			$this.css(style);
		});
	};
})(jQuery);







/**
 * 将href的页面放在中间区域
 */
! function($) {
	
	"use strict";// jshint ;_;
	var Content = function(element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.content.defaults, options);

		if (this.options.parent) {
			this.$parent = $(this.options.parent);
		}
		
		this.update();
	};

	Content.prototype = {
		constructor : Content,
		
		//显示错误页面
		error : function() {
			alert('加载页面时出错！');
		},
		
		onRender : function(){
			var footerHeight = $('.content-footer').height() || 0;
			var height = $(document.body).height() - 91 - $('.content-header').height() - footerHeight;
			$('.content-body').height(height);
// 			
			$('.extraSearchbar').on('shown hidden',function(){
				var footerHeight = $('.content-footer').height() || 0;
				footerHeight += footerHeight != 0?1:0;
				var height = $(document.body).height() - 91 - $('.content-header').height() - footerHeight;
				$('.content-body').height(height);
			});
		},
		
		success : function(msg){
			var me = this;
			$('#content > div.load-mask').fadeOut('fast');
			this.$element.empty().append(msg).fadeIn('normal',function(){
				
				if(me.options.sidebar && me.options.sidebar === true){
					me.sidebar();
				}
			});
			me.onRender();
		},

		//更新内容
		update : function() {
			
			var href = this.options.href,me = this;
			if (href) {
				//如果不是边栏，则先把要显示内容的区域给隐藏
				if(!me.options.sidebar && me.options.sidebar !== true){
					this.$element.hide();
				}
				
				$('#content > div.load-mask').center().show();
				$.ajax({
					type : "get",
					url : href,
					cache : false,
					context : me,
					error : me.error,
					success : me.success
				});
			}else{
				$('#innerSidebar ul li').removeClass('active');
				this.$element.empty();
			}

		},
		
		sidebar : function(){
			// $('#innerSidebar > ul > li a').click(function(e){
				// var li = $(this).parent('li'),submenu = $(this).siblings('ul');
				// var submenus = $('#innerSidebar li.submenu ul');//取得所有的二级菜单
				// var submenus_parents = $('#innerSidebar li.submenu');//取得所有二级菜单的父菜单
// 				
				// var dataUrl = $(this).attr('href');
				// $('#innerSidebar ul li').removeClass('active');
				// if(dataUrl && dataUrl != '#'){
					// li.addClass('active');
				// }
// 				
				// if(li.hasClass('submenu')){
					// if(li.hasClass('opened')){
						// submenu.slideUp();
						// li.removeClass('opened');
					// } else {
						// submenus.slideUp();			
						// submenu.slideDown();
						// submenus_parents.removeClass('opened');		
						// li.addClass('opened');
					// }
				// }
			// });
		}
	};

	/* Content PLUGIN DEFINITION
	 * ========================== */

	var old = $.fn.content;
	$.fn.content = function(option) {
		return this.each(function() {
			var $this = $(this), data = $this.data('content'), options = $.extend({}, $.fn.content.defaults, $this.data(), typeof option == 'object' && option);
			
			if ( typeof option == 'string'){
				$this.data('content', ( data = new Content(this, $.extend(options,{href : option}))));
			}else{
				$this.data('content', ( data = new Content(this, options)));
			}
		});
	};

	$.fn.content.defaults = {
		target : '#innerContent'
	};

	$.fn.content.Constructor = Content;

	/* COLLAPSE NO CONFLICT
	 * ==================== */
	$.fn.content.noConflict = function() {
		$.fn.content = old;
		return this;
	};

	/* CONTENT DATA-API
	 * ================= */
	$(document).on('click.content.data-api', '[data-content=content]', function(e) {
		e.preventDefault();
		var $this = $(this), href = $this.attr('href'), target = $this.attr('data-target') || '#innerContent';
		$(target).content({
			href : href,
			sidebar : target == '#innerSidebar'
		});
	});

}(window.jQuery); 































! function($) {
	
	"use strict";// jshint ;_;
	var Cascade = function(element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.cascade.defaults, options);

		if (this.options.parent) {
			this.$parent = $(this.options.parent);
		}
		
		this.cascade();
	};

	Cascade.prototype = {
		constructor : Cascade,
		
		
		cascade : function(){
			var me = this,table = this.options.table;
			if(!table){
				throw new Error('缺少data-table配置项');
			}

			var length = $(table).find('tbody input[type=checkbox]').length;
			$(table).find('tbody input[type=checkbox]').prop('checked',this.$element.prop('checked'));
			
			$(table).find('tbody input[type=checkbox]').each(function(index,item){
				$(item).click(function(e){
					var checked = me.getChecked();
					me.$element.prop('checked',length == checked.length);
				});
			});
		},
		
		getChecked : function(){
			var table = this.options.table,result = [];
			$(table).find('tbody input[type=checkbox]').each(function(index,item){
				if($(item).prop('checked')){
					result.push(item);
				}
			});
			return result;
		}
		
	};

	/* Content PLUGIN DEFINITION
	 * ========================== */

	var old = $.fn.cascade;
	$.fn.cascade = function(option) {
		return this.each(function() {
			var $this = $(this), data = $this.data('cascade'), options = $.extend({}, $.fn.cascade.defaults, $this.data(), typeof option == 'object' && option);
			if ( typeof option == 'string'){
				$this.data('cascade', ( data = new Cascade(this, $.extend(options,{}))));
			}else{
				$this.data('cascade', ( data = new Cascade(this, options || {})));
			}
		});
	};

	$.fn.cascade.defaults = {};

	$.fn.cascade.Constructor = Cascade;

	/* COLLAPSE NO CONFLICT
	 * ==================== */
	$.fn.cascade.noConflict = function() {
		$.fn.cascade = old;
		return this;
	};

	/* CONTENT DATA-API
	 * ================= */
	$(document).on('click.cascade.data-api', '[data-checkbox=cascade]', function(e) {
		var $this = $(this),table = $this.attr('data-table');
		if(!table){
			$this.cascade({
				table : $this.closest('table').get(0)
			});
		}else{
			$this.cascade({
				table : table
			});
		}
	});

}(window.jQuery); 