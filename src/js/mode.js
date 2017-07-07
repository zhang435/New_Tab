/**
 * Created by KevinZhang on 7/3/17.
 */
function Mode(title,desp){
    this.title = title;
    this.desp = desp;

    this.fill_html =  function () {
        var title = document.getElementById("title");
        var desp  = document.getElementById("desp");
        title.innerHTML = this.title;
        desp.innerHTML  = this.desp;
    }

}