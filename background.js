var status = "running";
function print(s) {
    var bkg = chrome.extension.getBackgroundPage();
    bkg.console.log(s);
}

var listen_all_links = function () {
    chrome.tabs.executeScript({
        file: 'addlistener.js'
    }, function (tab) {
        print("running addlistener.js");
    });
};

var remove_listener = function () {
    chrome.tabs.executeScript({
        file: 'remove_listener.js'
    }, function (tab) {
        print("running addlistener.js");
    });
};

//
// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//     print("????");
//     if (changeInfo.status === 'complete') {
//         print("page success loaded");
//             if(status === "running") {
//             listen_all_links();
//         }
//     }
// });
// FIXME: when user click, there is chance that mutiple tabs shows, the way to slove if check if the current loading tab has the same url as the one we tyring to load
var prev = "";
print("---------------------------------");
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    print("======")
    if (changeInfo.status === 'complete' && !(prev === tab.url)) {
        print("prev link" + prev);
        prev = tab.url;
        print("page success loaded");
        if(status === "running"){
            listen_all_links();
        }
    }
});
print("---------------------------------");
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    print("change status from" + status);
    if (message.text === "popup clicked") {
        status = message.status;
    }
});