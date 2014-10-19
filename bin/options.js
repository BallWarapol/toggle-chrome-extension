function loadOptions() {
	if( typeof(localStorage["extList"])=="undefined") {localStorage["extList"]=""}
	document.getElementById("selectedExt").value=localStorage["extList"].trim();
}

function saveOptions() {
	localStorage["extList"]=document.getElementById("selectedExt").value.trim();
}

function loadAllExt() {
	chrome.management.getAll(function(extensionInfo){
		for(var n in extensionInfo){
			document.getElementById("allExt").value+=extensionInfo[n].id+","+extensionInfo[n].name.replace(/,/g,"-")+"\n";
		}
	});
}

window.onload = function () {
	document.getElementById("save").addEventListener("click",saveOptions);
	document.getElementById("reload").addEventListener("click",loadOptions);
	loadOptions();
	loadAllExt();
}

