/**
 * Created by KevinZhang on 7/3/17.
 */

function Mode(title, desp) {
    this.title = title;
    this.desp = desp;
    this.fill_html = function (urls) {
        var title = document.getElementById("title");
        var desp = document.getElementById("desp");
        title.innerHTML = this.title;
        desp.innerHTML = this.desp;

        var tb = document.getElementsByTagName("tbody")[0];
        while (tb.firstChild) {
            tb.removeChild(tb.firstChild);
        }
        for (var i = 0; i < urls.length; ++i)
            add_row(urls[i], i);
    }
}