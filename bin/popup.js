// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function click(e) {
		chrome.management.getAll(function(extensionInfo){
			for(var n in extensionInfo){
				if (extensionInfo[n].id+"" == e.target.id+"") {
					if(extensionInfo[n].enabled == true &&
					extensionInfo[n].isApp != true &&
					extensionInfo[n].mayDisable == true ){
						chrome.management.setEnabled(extensionInfo[n].id, false);
						z="Disabled "+extensionInfo[n].name;
						notify (z, z);
					} 
					else {
						chrome.management.setEnabled(extensionInfo[n].id, true);
						z="Enabled "+extensionInfo[n].name;
						notify (z, z);
					}
					// Test for notification support.

				}
			}
			window.close();
		});
}

function notify (title, msg) {
	if (window.Notification) {
		var z=new Notification(title, {
			icon: 'icon.png',
			body: "Uh-Ba-Un-Ta-Uh Toggle Chrome Extension: "+msg
		});
	}
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});
