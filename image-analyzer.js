(function() {
	var images = document.querySelectorAll('img'),
		displayWidth = 0,
		displayHeight = 0,
		naturalWidth = 0,
		naturalHeight = 0,
		rgbaMemory = 0,
		rgbaDisMemory = 0,
		yuvCount = 0, yuvDisplayWidth = 0, yuvDisplayHeight = 0,yuvNaturalWidth = 0,yuvNaturalHeight = 0,
		id = "memimagegendiv",
		div = document.getElementById(id);

	function checkMem() {
		var tableHTML = '';
		tableHTML += "<table style='border: 0' width='100%' cellspacing='1'>";
		tableHTML += "<thead style='text-align:center;padding-bottom: .2em;margin-bottom:.2em;font-weight:bold;text-transform: uppercase;'><tr><th style='border-bottom:1px solid #ccc;text-align:center;font-weight:bold;'>Image</th><th style='border-bottom:1px solid #ccc;text-align:right;font-weight:bold;'>Width</th><th style='border-bottom:1px solid #ccc;text-align:right;font-weight:bold;'>Height</th><th style='border-bottom:1px solid #ccc;text-align:right;font-weight:bold;'>Actual Width</th><th style='border-bottom:1px solid #ccc;text-align:right;font-weight:bold;'>Actual Height</th></tr></thead>";
		
		for (var i = images.length - 1; i >= 0; i--) {
			displayWidth += images[i].width;
			displayHeight += images[i].height;
			naturalWidth += images[i].naturalWidth;
			naturalHeight += images[i].naturalHeight;

			if (images[i].naturalWidth > images[i].width || images[i].naturalHeight > images[i].height) {
				//too large
				tableHTML += "<tr style='background: rgba(255,0,0,.3)'";
			} else {
				tableHTML += "<tr style='background: rgba(0,255,0,.3)'";

			}
			tableHTML += "<tr>";
			tableHTML += "<td style='padding-left: .5em;border-bottom: 1px dotted #ccc; padding-bottom: .5em; padding-right: .4em; padding-top:.5em; max-width: 15em; width:60% !important;overflow:hidden;word-wrap:break-word;'>" + images[i].getAttribute('src') + "</td>";
			tableHTML += "<td style='padding-left: .5em;border-bottom: 1px dotted #ccc; padding-bottom: .5em; text-align: right;padding-right: .4em; padding-top:.5em; width:10%'>" + images[i].width + "</td>";
			tableHTML += "<td style='padding-left: .5em;border-bottom: 1px dotted #ccc; padding-bottom: .5em; text-align: right;padding-right: .4em; padding-top:.5em; width:10%'>" + images[i].height + "</td>";
			tableHTML += "<td style='padding-left: .5em;border-bottom: 1px dotted #ccc; padding-bottom: .5em; text-align: right;padding-right: .4em; padding-top:.5em; width:10%'>" + images[i].naturalWidth + "</td>";
			tableHTML += "<td style='padding-right: .5em;padding-left: .5em;border-bottom: 1px dotted #ccc; padding-bottom: .5em; text-align: right;padding-top:.2em; width:10%'>" + images[i].naturalHeight + "</td>";
			tableHTML += "</tr>";

		}
		tableHTML += "</table>";
		//computer memory at RGBA
		rgbaMemory = naturalWidth * naturalHeight * 4;
		rgbaDisMemory = displayWidth * displayHeight * 4;
		var iHTML = "<h2 style='font-size: 21px;color:#000;font-weight:bold;position:static;'>Image Analyzer Results</h2>";
		iHTML += "<span id='close-" + id + "' style='float: right;'>CLOSE [X]</span>";
		iHTML += "<strong style='font-weight: bold;'># of img elements:</strong> " + images.length + "<br/>";
		iHTML += "<strong style='font-weight: bold;'>Memory (CPU Decode) used:</strong> " + (rgbaMemory/1024).toFixed(2) + "kb<br/>";
		iHTML += "<strong style='font-weight: bold;'>Memory (CPU Decode) used if, resized:</strong> " + (rgbaDisMemory/1024).toFixed(2) + "kb<br/>";
		iHTML += "<strong style='font-weight: bold;'>Memory savings of resizing:</strong> " + (( (rgbaMemory - rgbaDisMemory) / rgbaMemory) * 100).toFixed(2) + "%<br/>";
		iHTML += tableHTML;
		return iHTML;
	}

	if (div) {
		div.style.display = "block";
		div.innerHTML = checkMem();
	} else {
		div = document.createElement('div');
		div.id = id;
		div.style.cssText = "z-index:5000000;font-size:16px;width:100%;max-width:100%;height:50em;padding: 0 .8em .8em;background: #fff;color: #111;border:5px solid #666;font-family:Arial; position:absolute;top:0;left:0;overflow:scroll;";
		div.innerHTML = checkMem();
		document.body.appendChild(div);
	}

	//set up close
	var memimagegendivClose = document.getElementById('close-' + id);
	console.info(memimagegendivClose);
	memimagegendivClose.onclick = function(){
		var newDiv = document.getElementById(id);
		console.info(newDiv);
		newDiv.parentNode.removeChild(newDiv);
	};

	
})();