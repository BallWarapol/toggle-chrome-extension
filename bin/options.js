function loadOptions() {
	if(typeof(localStorage["extList"])=="undefined") {
		localStorage["extList"]="fdpohaocaechififmbbbbbknoalclacl,Full Page Screen Capture 0.0.12\njbfjodonncabnangfknilmabjfofdikc,Adblock for Facebook 0.0.8\noljmaangfgmmokjpnojhfblppgeijikp,Apt-linker 1.3.1\ngeddoclleiomckbhadiaipdggiiccfje,Quick Javascript Switcher 1.3.2\nmomjjajmhkiccgboincmeljllnaflagn,Truewifi Auto Login/Logout 4.0.5\ncdngiadmnkhgemkimkhiilgffbjijcie,FlashBlock 1.2.11.12\ndjflhoibgkdhkhhcedjiklpkjnoahfmg,User-Agent Switcher for Chrome 1.0.36";
	}
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

