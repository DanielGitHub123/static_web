$(document).ready(function(){
	//初始化选择框插件
	$("select").select2({
		enableSearch : false
	});
	
	
	var getLineData = function(datastr){
		var result = [];
		var strarr = datastr.split(',');
		for(var i=0;i<strarr.length;i++){
			result.push((Number)($.trim(strarr[i])));
		}
		return result;
	};
	
	var initHighcharts = function(element,title,line1,line2,line3){
    	$(element).highcharts({
	        chart: { type: 'spline' },
	        title: { text: title },
	        colors: ['#FF0000', '#2f7ed8','#19B877'],
	        credits : {enabled : false},
	        legend: {verticalAlign: 'bottom',borderWidth: 0},
	        // legend: {
	        	// borderWidth: 0,
                // layout: 'vertical',
                // align: 'right',
                // x: -20,
                // verticalAlign: 'top',
                // y: 30,
                // floating: true
            // },
	        xAxis: {
                min : 0,
                tickInterval: 1,
                tickmarkPlacement : 'on' 
	        },
	        yAxis: {
	            title: {
	                text: '工作量'
	            },
	            tickInterval : 5,
	            lineWidth : 1,
	            min : 0
	        },
	        tooltip: {
	        	borderColor : '#2f7ed8',
	            crosshairs: true,
	            shared: true,
	            formatter : function(){
	            	var str = '第 ' + this.x + ' 天<br>';
	            	for(var i=0;i<this.points.length;i++){
	            		var points = this.points[i];
	            		var series = points.series;
	            		if(points.y > 0){
		            		str += '<span style="color:'+ series.color +'">'+ series.name +'</span>: <b>'+ points.y +' 天</b><br/>';
	            		}
	            	}
	            	return str;
	            }
	        },
	        series: [{
	            name: '计划时间',
	            marker: { symbol: 'circle' },
	            data: line1//[45,42,39,36,33,30, 27, 24, 21, 18, 15, 12, 9, 6, 3,0]
	        }, {
	            name: '实际剩余',
	            marker: { symbol: 'circle' },
	            data: line2//[44,43,36,35,30,28, 28, 26, 24, 13, 15, 17, 16, 14, 10,0]
	        },{
	            name: '当天完成',
	            type: 'column',
	            data: line3//[12, 15, 20, 8,3, 6, 12, 5, 8, 10, 3, 1,7,8,2,0],
	        }]
	    });
    };
	
	
	//迭代燃尽图
	var $sprint = $('.sprint');
	var title = $sprint.attr('title'),line1 = getLineData($sprint.attr('data-line1')),
    	line2 = getLineData($sprint.attr('data-line2')),
    	line3 = getLineData($sprint.attr('data-line3'));
	initHighcharts('.sprint',title,line1,line2,line3);
    
    
    //每一个故事的燃尽图
    $('.story-sprint').each(function(index,element){
    	var $this = $(this),title = $this.attr('title');
    	var line1 = getLineData($this.attr('data-line1')),
    		line2 = getLineData($this.attr('data-line2')),
    		line3 = getLineData($this.attr('data-line3'));
    	initHighcharts(this,title,line1,line2,line3);
    });
    
    //点击故事燃尽图放大
    $('tspan').click(function(e){
    	var ss = $(this).closest('div.story-sprint').get(0);
    	if(ss){
    		var $ssprint = $(ss),title = $ssprint.attr('title');
	    	var line1 = getLineData($ssprint.attr('data-line1')),line2 = getLineData($ssprint.attr('data-line2')),line3 = getLineData($ssprint.attr('data-line3'));
	    	
	    	bootbox.alert('&nbsp;');
			initHighcharts('.modal-body',title,line1,line2,line3);
    	}
    });
});
