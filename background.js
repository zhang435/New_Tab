function print(s) {
    var bkg = chrome.extension.getBackgroundPage();
    bkg.console.log(s);
}

function open_url_in_new_tab(link) {
    chrome.tabs.create({
        url: link
    });
}

chrome.browserAction.onClicked.addListener(function(tab) {
    print("been click");
    chrome.tabs.executeScript({
        file: 'main.js'
    }, function(tab) {
        print("listening for all links");
    });
    open_url_in_new_tab("https://www.google.com");
});
