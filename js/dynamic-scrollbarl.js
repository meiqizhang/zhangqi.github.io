win_height = window.screen.availHeight;
var tag = document.getElementById("index_tag");
tag.setAttribute("align", "left");
var style = "width:auto; height:" + ((1 - 0.3-0.1) * win_height).toString() + "px; overflow:auto";
tag.setAttribute("style", style);