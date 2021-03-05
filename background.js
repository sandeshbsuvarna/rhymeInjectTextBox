// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.browserAction.onClicked.addListener(function(tab) {
    
    function modifyDOM() {
        var content;
        //Check injectedTextbox exists
        if(document.getElementById('injectedTextbox')){
            chrome.storage.sync.get(['content'], function(result) {
                document.getElementsByClassName("camera")[0].innerHTML=result.content;
            });
        } else{
            //Store existing HTMl into storage
            content= document.getElementsByClassName("camera")[0].innerHTML;
            chrome.storage.sync.set({content: content}, function() {});
            //Inject Textare
            document.getElementsByClassName("camera")[0].innerHTML = "<textarea id='injectedTextbox' cols='50'></textarea>";
        }
        return true;
    }

    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();'
    }, (results) => {
        console.log(results[0]);
    });
    
});

