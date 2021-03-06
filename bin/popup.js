//notify.js license
(function (root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD environment
        define('notify', [], function () {
            return factory(root, document);
        });
    } else if (typeof exports === 'object') {
        // CommonJS environment
        module.exports = factory(root, document);
    } else {
        // Browser environment
        root.Notify = factory(root, document);
    }

}(window, function (w, d) {

    'use strict';

    function isFunction (item) {
        return typeof item === 'function';
    }

    function Notify(title, options) {

        if (typeof title !== 'string') {
            throw new Error('Notify(): first arg (title) must be a string.');
        }

        this.title = title;

        this.options = {
            icon: '',
            body: '',
            tag: '',
            notifyShow: null,
            notifyClose: null,
            notifyClick: null,
            notifyError: null,
            permissionGranted: null,
            permissionDenied: null,
            timeout: null
        };

        this.permission = null;

        if (!Notify.isSupported) {
            return;
        }

        //User defined options for notification content
        if (typeof options === 'object') {

            for (var i in options) {
                if (options.hasOwnProperty(i)) {
                    this.options[i] = options[i];
                }
            }

            //callback when notification is displayed
            if (isFunction(this.options.notifyShow)) {
                this.onShowCallback = this.options.notifyShow;
            }

            //callback when notification is closed
            if (isFunction(this.options.notifyClose)) {
                this.onCloseCallback = this.options.notifyClose;
            }

            //callback when notification is clicked
            if (isFunction(this.options.notifyClick)) {
                this.onClickCallback = this.options.notifyClick;
            }

            //callback when notification throws error
            if (isFunction(this.options.notifyError)) {
                this.onErrorCallback = this.options.notifyError;
            }
        }
    }

    // true if the browser supports HTML5 Notification
    Notify.isSupported = 'Notification' in w;

    // true if the permission is not granted
    Notify.needsPermission = !(Notify.isSupported && Notification.permission === 'granted');

    // asks the user for permission to display notifications.  Then calls the callback functions is supplied.
    Notify.requestPermission = function (onPermissionGrantedCallback, onPermissionDeniedCallback) {
        if (!Notify.isSupported) {
            return;
        }
        w.Notification.requestPermission(function (perm) {
            switch (perm) {
                case 'granted':
                    Notify.needsPermission = false;
                    if (isFunction(onPermissionGrantedCallback)) {
                        onPermissionGrantedCallback();
                    }
                    break;
                case 'denied':
                    if (isFunction(onPermissionDeniedCallback)) {
                        onPermissionDeniedCallback();
                    }
                    break;
            }
        });
    };


    Notify.prototype.show = function () {

        if (!Notify.isSupported) {
            return;
        }

        this.myNotify = new Notification(this.title, {
            'body': this.options.body,
            'tag' : this.options.tag,
            'icon' : this.options.icon
        });

        if (this.options.timeout && !isNaN(this.options.timeout)) {
            setTimeout(this.close.bind(this), this.options.timeout * 1000);
        }

        this.myNotify.addEventListener('show', this, false);
        this.myNotify.addEventListener('error', this, false);
        this.myNotify.addEventListener('close', this, false);
        this.myNotify.addEventListener('click', this, false);
    };

    Notify.prototype.onShowNotification = function (e) {
        if (this.onShowCallback) {
            this.onShowCallback(e);
        }
    };

    Notify.prototype.onCloseNotification = function (e) {
        if (this.onCloseCallback) {
            this.onCloseCallback(e);
        }
        this.destroy();
    };

    Notify.prototype.onClickNotification = function (e) {
        if (this.onClickCallback) {
            this.onClickCallback(e);
        }
    };

    Notify.prototype.onErrorNotification = function (e) {
        if (this.onErrorCallback) {
            this.onErrorCallback(e);
        }
        this.destroy();
    };

    Notify.prototype.destroy = function () {
        this.myNotify.removeEventListener('show', this, false);
        this.myNotify.removeEventListener('error', this, false);
        this.myNotify.removeEventListener('close', this, false);
        this.myNotify.removeEventListener('click', this, false);
    };

    Notify.prototype.close = function () {
        this.myNotify.close();
    };

    Notify.prototype.handleEvent = function (e) {
        switch (e.type) {
        case 'show':
            this.onShowNotification(e);
            break;
        case 'close':
            this.onCloseNotification(e);
            break;
        case 'click':
            this.onClickNotification(e);
            break;
        case 'error':
            this.onErrorNotification(e);
            break;
        }
    };

    return Notify;

}));

// Copyright (c) 2014 @UhBaUnTaUh. All rights reserved.
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
				}
			}
			window.close();
		});
}

function notify (title, msg) {
	var z=new Notify(title, {
		icon: 'icon.png',
		timeout: 3,
		body: "UhBaUnTaUh Toggle Chrome Extension: "+msg
	});
  z.show();
}

window.onload=function() {
	//generate menu
	if(typeof(localStorage["extList"])=="undefined") {
		localStorage["extList"]="fdpohaocaechififmbbbbbknoalclacl,Full Page Screen Capture 0.0.12\njbfjodonncabnangfknilmabjfofdikc,Adblock for Facebook 0.0.8\noljmaangfgmmokjpnojhfblppgeijikp,Apt-linker 1.3.1\ngeddoclleiomckbhadiaipdggiiccfje,Quick Javascript Switcher 1.3.2\nmomjjajmhkiccgboincmeljllnaflagn,Truewifi Auto Login/Logout 4.0.5\ncdngiadmnkhgemkimkhiilgffbjijcie,FlashBlock 1.2.11.12\ndjflhoibgkdhkhhcedjiklpkjnoahfmg,User-Agent Switcher for Chrome 1.0.36";
	}
	var exts=localStorage["extList"].split("\n");
	var z="";
	for (var i=0;i<exts.length;i++) {
		ext=exts[i].split(",");
		z+='<div id="'+ext[0]+'">'+ext[1]+'</div>';
	}
	document.getElementById("menu").innerHTML=z;
	//add event to menu
	  var divs = document.querySelectorAll('div');
	  for (var i = 0; i < divs.length; i++) {
		divs[i].addEventListener('click', click);
	  }
}
