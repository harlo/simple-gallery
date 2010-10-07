var photoArray;

var initViews = function() {
	var att = new Element('table');
	var xReq = new Request.JSON({
		method:'get',
		url:'utils/functions.php',
		data:'incomingQuery=getAllFiles',
		onSuccess:function(obj) {
			photoArray = new Array(obj.length);
			var attRow = new Element('tr');
			var a = 0;
			obj.list.each(function(alb) {
				// create an array for each album
				photoArray[a] = new Array(alb.files.length + 1);
				photoArray[a][0] = alb.album;

				if(a % 4 == 0) {
					att.adopt(attRow);
					attRow = null;
					attRow = new Element('tr');
				}
				
				var aThumb = new Element('img',{
					'id':alb.album,
					'src':'photos/' + alb.album + '/thumbnail.jpg',
					'styles':{
						'width':'75px',
						'height':'75px',
						'border':'1px solid #fff'
					},
					'events':{
						'click':function() {
							loadPhotoThumbnails(this.id.substr(5));
						},
						'mouseover':function() {
							this.setStyle('border','1px solid #5aafff');
						},
						'mouseout':function() {
							this.setStyle('border','1px solid #ffffff');
						}
					}
				});
				var attCell = new Element('td',{
					'styles': {
						'border':'none'
					}
				});
				attCell.adopt(aThumb);
				attRow.adopt(attCell);
				$('albumThumbnails').adopt(att);
				var b = 1;
				alb.files.each(function(file) {
					// iterate through each file!
					photoArray[a][b] = 'photos/' + alb.album + "/" + file;
					b++;
				});
				a++;
			});
			att.adopt(attRow);
		}
	}).send();
}

var loadPhotoThumbnails = function() {
	$('thumbnailRack').empty();
	var which = arguments[0].toInt() - 1;
	
	for(var i=1;i<photoArray[which].length;i++) {
		var pThumb = new Element('img',{
			'src':photoArray[which][i],
			'styles':{
				'width':'75px',
				'height':'75px',
				'border':'1px solid #fff'
			},
			'class':'photoThumbImage',
			'events':{
				'click':function() {
					setIntoFrame(this.src);
				},
				'mouseover':function() {
					this.setStyle('border','1px solid #5aafff');				
				},
				'mouseout':function() {
					this.setStyle('border','1px solid #fff');
				}
				
			}
		});
		$('thumbnailRack').adopt(pThumb);
	}
}

var setIntoFrame = function() {
	$('photoFrame').empty();
	var framedPhoto = new Element('img',{
		'src':arguments[0],
		'styles':{
			'width':'667px'
		}
	});
	$('photoFrame').adopt(framedPhoto);
}