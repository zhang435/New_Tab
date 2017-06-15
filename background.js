function print(s) {
    var bkg = chrome.extension.getBackgroundPage();
    bkg.console.log(s);
}

function open_url_in_new_tab(link) {
    chrome.tabs.create({
        url: link
    });
});

chrome.browserAction.onClicked.addListener(function(tab) {
    print("been click")
});
