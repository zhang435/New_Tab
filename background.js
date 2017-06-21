var status = "running";
function print(s) {
    var bkg = chrome.extension.getBackgroundPage();
    bkg.console.log(s);
}

var listen_all_links = function () {
    chrome.tabs.executeScript({
        file: 'main.js'
    }, function (tab) {
        print("running main.js");
    });
}
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.status === "complete"){
        //only excute the content once page been complete load
        print("page success loaded");
        if(status === "running"){
            listen_all_links();
        }
    }
});

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    print("change status from" + status);
    if (message.text === "popup clicked") {
        status = message.status
    }
});