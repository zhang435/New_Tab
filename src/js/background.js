var status = "running";
var mode = "";

// shortcut log
function print(s) {
    var bkg = chrome.extension.getBackgroundPage();
    bkg.console.log(s);
}

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
    print("prevtabs is" + prevtabid);
    print("current id is" + tabId);
    if (changeInfo.status === 'complete' && (!(prev === tab.url) || prevtabid === tabId)) {
        print("prev link: " + prev);
        prev = tab.url;
        prevtabid = tabId;
        print("page success loaded");
        if(status === "running"){
            listen_all_links();
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
