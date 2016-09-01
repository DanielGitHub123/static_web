
$(document).ready(function(){

	/**
	 * 初始化提示插件,提示插件需要手动初始化
	 */
	$('.remember-msg').tooltip({
		placement : 'bottom'
	}); 
	
	/**
	 * 初始化单选框插件
	 */
	$('.switch')['bootstrapSwitch']();

 	/**
 	 * 初始化表单验证
 	 */
	$('#login-form').validate({
		rules : {
			username : {
				minlength : 4,
				maxlength : 20,
				required : true
			},
			password : {
				minlength : 4,
				maxlength : 20,
				required : true
			}
		},
		highlight : function(element) {
			$(element).closest('.control-group').removeClass('success').addClass('error');
		},
		success : function(element) {
			element.addClass('valid').closest('.control-group').removeClass('error').addClass('success');
		}
	}); 
	
	/**
	 * 登陆时记住密码（保存在cookie中，线上环境中，请在登陆成功后记住密码，否则不记住密码）
	 */
	
	$("#login-form").submit( function () {
		var username = $('#login-username').val();
		var password = $('#login_password').val();
		var remember = $('#login_rememberme').bootstrapSwitch('status');
		if(remember === true){
			$.cookie('tr_l_un_cookie', username, { expires: 365});
			$.cookie('tr_l_pw_cookie', password, { expires: 365});
		}else{
			var cookieUsername = $.cookie('tr_l_un_cookie');
			if(cookieUsername){
				$.removeCookie('tr_l_un_cookie');
				$.removeCookie('tr_l_pw_cookie');
			}
		}
	});
	
	/**
	 * 页面加载完成后，从cookie中取值设进表单中去
	 */
	var cookieUsername = $.cookie('tr_l_un_cookie');
	var cookiePassword = $.cookie('tr_l_pw_cookie');
	$('#login-username').val(cookieUsername);
	$('#login_password').val(cookiePassword);
	$('#login_rememberme').bootstrapSwitch('setState', cookieUsername && cookieUsername.length > 0);
});