"use strict";

// 清除登录
if (localStorage.getItem("uid")) {
  // console.log(localStorage.getItem("username"))
  $(".reg").css({
    display: "none"
  });
  $(".login").css({
    display: "none"
  });
  $(".person").css({
    display: "block"
  }).html(localStorage.getItem("username"));
  $(".quit").css({
    display: "block"
  }).click(function () {
    $(".reg").css({
      display: "block"
    });
    $(".login").css({
      display: "block"
    });
    $(".person").css({
      display: "none"
    });
    $(this).css({
      display: "none"
    });
    var q = confirm("请问是否退出?");

    if (q == true) {
      localStorage.clear();
    } else {}
  });
} // 商品列表数据请求


var uid = localStorage.getItem("uid");
var allList = "http://jx.xuzhixiang.top/ap/api/allproductlist.php";
$.ajax({
  url: allList,
  type: "GET",
  data: {
    pagesize: 1000,
    uid: uid
  },
  success: function success(res) {
    // console.log(res.data)
    // 列表一
    var html = "";
    var firProArr = res.data.reverse().slice(8, 14);
    firProArr.forEach(function (v) {
      html += "\n      <li class=\"sub-item\" data-id=\"".concat(v.pid, "\">\n        <a>\n          <span class=\"cover\">\n            <img src=\"").concat(v.pimg, "\" alt=\"\" class=\"lazyload\">\n          </span>\n          <span class=\"name\">").concat(v.pname, "</span>\n          <span class=\"price\">\uFFE5").concat(v.pprice, "</span>\n          <span class=\"sub-sep\"></span>\n        </a>\n      </li>\n      ");
      $(".first").html(html);
    }); // 列表二

    var html2 = "";
    var secProArr = res.data.slice(14, 20);
    secProArr.forEach(function (v) {
      html2 += "\n      <li class=\"sub-item\" data-id=\"".concat(v.pid, "\">\n        <a>\n          <span class=\"cover\">\n            <img src=\"").concat(v.pimg, "\" alt=\"\" class=\"lazyload\">\n          </span>\n          <span class=\"name\">").concat(v.pname, "</span>\n          <span class=\"price\">\uFFE5").concat(v.pprice, "</span>\n          <span class=\"sub-sep\"></span>\n        </a>\n      </li>\n      ");
      $(".second").html(html2);
    }); // 列表三

    var html3 = "";
    var thirdProArr = res.data.slice(20, 25); // console.log(firProArr)

    thirdProArr.forEach(function (v) {
      html3 += "\n      <li class=\"sub-item\" data-id=\"".concat(v.pid, "\">\n        <a>\n          <span class=\"cover\">\n            <img src=\"").concat(v.pimg, "\" alt=\"\" class=\"lazyload\">\n          </span>\n          <span class=\"name\">").concat(v.pname, "</span>\n          <span class=\"price\">\uFFE5").concat(v.pprice, "</span>\n          <span class=\"sub-sep\"></span>\n        </a>\n      </li>\n      ");
      $(".third").html(html3);
    });
    $(".sub-item").click(function () {
      var pid = $(this).attr("data-id"); // console.log(pid)

      location.href = "./detail.html?pid=".concat(pid);
    });
  }
}); // 跳转购物车

$(".cart").click(function () {
  location.href = "../pages/cart.html";
});