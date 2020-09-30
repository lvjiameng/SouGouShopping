"use strict";

$("#header").load("./_header.html");
$("#footer").load("./_footer.html");
var uid = localStorage.getItem("uid"); // 商品列表数据请求

var allList = "http://jx.xuzhixiang.top/ap/api/allproductlist.php";
$.ajax({
  url: allList,
  type: "GET",
  data: {
    pagesize: 1000,
    uid: uid
  },
  success: function success(res) {
    var html = "";
    var proList = res.data.reverse(); // console.log(proList)

    proList.forEach(function (v) {
      html += "\n        <a class=\"product\" data-id=\"".concat(v.pid, "\">\n          <img src=\"").concat(v.pimg, "\" alt=\"\">\n          <span class=\"name\">").concat(v.pname, "</span>\n          <span class=\"desc\">").concat(v.pdesc, "</span>\n          <span class=\"price\">\xA5").concat(v.pprice, "</span>\n        </a>\n        ");
    });
    $(".products").html(html);
    $(".product").click(function () {
      var pid = $(this).attr("data-id"); // console.log(pid)

      location.href = "./detail.html?pid=".concat(pid);
    });
  }
});