var status = "running";
var mode = "";

// shortcut log
function print(s) {
    var bkg = chrome.extension.getBackgroundPage();
    bkg.console.log(s);
}

// check if there exist a url in the array
Array.prototype.start_with =  function (val) {

    for(var i = 0; i< this.length;++i){
        if(val.startsWith(this[i]))
            return true;
    }
    return false;
};

//get nav mode
chrome.storage.sync.get("mode", function(items) {
    print("?");
    if (items.mode) {
        mode = items.mode;
    }else{
        chrome.storage.sync.set({ "mode" : "OR" }, function() {
            mode = "OR";
        });
    }
    print(mode);
});

// add listener to all event
var listen_all_links = function () {
    chrome.tabs.executeScript({
        file: 'src/js/add_listener.js'
    }, function (tab) {
        print("running add_listener.js");
    });
};

// remove all listener,
var remove_listener = function () {
    chrome.tabs.executeScript({
        file: 'remove_listener.js'
    }, function (tab) {
        print("running remove_listener.js");
    });
};

// active listner when page is laoded
// the reason for prev is because we updated will run everytime when each frame been load
// so mutiplte tabs will open , to prevent this, we need to make sure we do not open already opened tab
var prev = "";
// when user realod the page
var prevtabid = "";
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && (!(prev === tab.url) || prevtabid === tabId)) {
        prev = tab.url;
        prevtabid = tabId;
        print("page success loaded");
        if(status === "running"){
            print(mode);
            chrome.storage.sync.get(mode , function (items) {
                var urls = items[mode];
                // only run the code for url in the list
                if(mode === "OR"){
                    if(urls && urls.start_with(tab.url))
                        listen_all_links();

                }else if(mode === "XOR"){
                    if(blocked_urls && blocked_urls.start_with(tab.url)){
                        print("this url been prevent from happening " + tab.url);
                        return;
                    }else{
                        listen_all_links();
                    }
                }else{
                    //listen all links
                    listen_all_links();
                }
            });
        }
    }
});

// change the status of popup.html
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    print("change status to " + status);
    if (message.text === "popup clicked") {
        status = message.status;
    }
});
