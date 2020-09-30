"use strict";

$("#header").load("./_header.html");
$("#footer").load("./_footer.html"); // 轮播图

var swiper = new Swiper('.swiper-container', {
  autoplay: true,
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.next',
    prevEl: '.prev'
  }
});
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
    // console.log(res.data)
    var html = "";
    var firProArr = res.data.reverse().slice(0, 4); // console.log(firProArr)

    firProArr.forEach(function (v) {
      html += "\n      <a class=\"product\" data-id=\"".concat(v.pid, "\">\n          <img src=\"").concat(v.pimg, "\" alt=\"\">\n          <span class=\"name\">").concat(v.pname, "</span>\n          <span class=\"desc\">").concat(v.pdesc, "</span>\n          <span class=\"price\">\xA5").concat(v.pprice, "</span>\n      </a>\n      ");
      $(".first-pro").html(html);
    }); // 列表二

    var html2 = "";
    var secProArr = res.data.slice(4, 8);
    secProArr.forEach(function (v) {
      html2 += "\n      <a class=\"product\"  data-id=\"".concat(v.pid, "\">\n          <img src=\"").concat(v.pimg, "\" alt=\"\">\n          <span class=\"name\">").concat(v.pname, "</span>\n          <span class=\"desc\">").concat(v.pdesc, "</span>\n          <span class=\"price\">\xA5").concat(v.pprice, "</span>\n      </a>\n      ");
      $(".second-pro").html(html2);
    });
    $(".product").click(function () {
      var pid = $(this).attr("data-id"); // console.log(pid)

      location.href = "./detail.html?pid=".concat(pid);
    });
  }
});