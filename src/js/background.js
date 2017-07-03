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
        print("in get right before " + mode);
        mode = items.mode;
        print("right after " + mode);
    }else{
        chrome.storage.sync.set({ "mode" : "XOR" }, function() {
            mode = "XOR";
        });
    }
});

print("!" + mode);



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
var prev = "";
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && !(prev === tab.url)) {
        print("prev link" + prev);
        prev = tab.url;
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
