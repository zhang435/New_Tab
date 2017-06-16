function print(s) {
    var bkg = chrome.extension.getBackgroundPage();
    bkg.console.log(s);
}
print("running");
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.status === "complete"){
        //only excute the content once page been complete load
        print("page success loaded");
        chrome.tabs.executeScript({
            file: 'main.js'
        }, function (tab) {
            print("backend running");
        });
    }
});