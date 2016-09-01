$(document).ready(function(){
	//表单中添加故事
	$('form button[data-handler=addstory]').click(function(e){
		bootbox.dialog({
		  message: "&nbsp;",
		  title: "请选择故事",
		  buttons: {
		    success: {
		      label: "取消",
		      callback: function() {}
		    },
		    main: {
		      label: "确定",
		      className: "btn-primary",
		      callback: function() {
		      	var addNumber = 0;
		      	$('.modal-body table tbody input[type=checkbox]').each(function(index,item){
		      		if($(item).prop('checked')){
		      			var tds = $(item).closest('tr').find('td');
		      			console.dir(tds);
		      			$('#addformstorytable tbody').append([
		      				'<tr>',
		      					'<td>',tds[0].innerHTML,'</td>',
		      					'<td>',tds[1].innerHTML,'</td>',
		      					'<td>',tds[2].innerHTML,'</td>',
		      				'</tr>'
		      			].join(''));
		      			addNumber++;
		      		}
		      	});
		      	
		      	if(addNumber < 1){
		      		$.globalMessenger().post({
						message: '请选择要添加的故事',
						hideOnNavigate : true,
						showCloseButton: true
					});
		      	}
		      	
		      }
		    }
		  }
		});
		
		$(".bootbox .modal-dialog .modal-body").content({
			href : 'mywork/productMaanger/addstorylist.html'
		});
	});
	
	//表单上的删除
	$('form button[data-handler=delstory]').click(function(e){
		var delNumber = 0;
		$('#addformstorytable tbody input[type=checkbox]').each(function(index,item){
			if($(item).prop('checked')){
				$(item).closest('tr').remove();
				delNumber++;
			}
		});
		if(delNumber < 1){
			$.globalMessenger().post({
				message: '请选择要删除的故事',
				hideOnNavigate : true,
				showCloseButton: true
			});
		}
	});
});
