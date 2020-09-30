"use strict";

$("#header").load("./_header.html");
$("#footer").load("./_footer.html");
var uid = localStorage.getItem("uid");
var cartList;
var cartAPI = "http://jx.xuzhixiang.top/ap/api/cart-list.php";
var delAPI = "http://jx.xuzhixiang.top/ap/api/cart-delete.php";
var numAPI = "http://jx.xuzhixiang.top/ap/api/cart-update-num.php";
proList(); // 获取购物车列表

function proList() {
  $.ajax({
    url: cartAPI,
    type: "GET",
    data: {
      id: uid
    },
    success: function success(res) {
      // console.log(res.data)
      cartList = res.data;
      var html = "";
      cartList.forEach(function (v) {
        html += "\n          <div class=\"tr\">\n              <div class=\"tr-hidden\">\n          <div class=\"col-select td\">\n            <input type=\"checkbox\" class=\"single-sel\" pid=\"".concat(v.pid, "\">\n          </div>\n          <div class=\"col-i td\">\n            <a href=\"#\" class=\"fl\">\n              <img src=\"").concat(v.pimg, "\" alt=\"\">\n            </a>\n            <div class=\"fr\">\n              <a href=\"#\" class=\"i-name\">\n                ").concat(v.pname, "\n              </a>\n            </div>\n          </div>\n          <div class=\"col-price td\">").concat(v.pprice, "\u5143</div>\n          <div class=\"col-num td\">\n            <div class=\"count-box detail-count\">\n              <div class=\"count-btn count-minus disable\" data-id=\"").concat(v.pid, "\">\n                <div class=\"icon-cart-minus minus\"></div>\n              </div>\n              <input class=\"count-input\" type=\"text\" value=\"").concat(v.pnum, "\">\n              <div class=\"count-btn count-add disable\" data-id=\"").concat(v.pid, "\">\n                <div class=\"icon-cart-add add\"></div>\n              </div>\n            </div>\n          </div>\n          <div class=\"col-total td\">\n            ").concat(v.pprice, "\u5143\n          </div>\n          <div class=\"col-handle td\">\n            <a class=\"btn\" data-id=\"").concat(v.pid, "\">\u5220\u9664</a>\n          </div>\n        </div>\n        </div>\n        ");
      });
      $(".tbody").html(html); // console.log(cartList)

      delCart();
      updata();
      selFn();
      countPrice();
    }
  });
} // 购物车删除


function delCart() {
  $(".col-handle").click(function () {
    var pid = $(this).children().attr("data-id"); // console.log(pid)

    var that = this;
    $.ajax({
      url: delAPI,
      type: "GET",
      data: {
        uid: uid,
        pid: pid
      },
      success: function success(res) {
        $(that).parent().remove();
        var cartarr = cartList.filter(function (v) {
          return v.pid != pid;
        });
        var countNum = 0;
        cartarr.forEach(function (v) {
          if (v.checked == true) {
            countNum += parseInt(v.pnum);
          }
        });
        $(".cart-num").html(countNum);
        $(".cart-selected-num").html(countNum);
        var countPrice = 0;
        cartarr.forEach(function (v) {
          if (v.checked == true) {
            countPrice += parseInt(v.pnum) * parseInt(v.pprice);
          }
        });
        $(".cart-total").html("￥" + countPrice);
      }
    });
  });
} // 更新购物车数据


function updata() {
  // 增加
  $(".count-add").click(function () {
    var pid = $(this).attr("data-id");
    var pObj = cartList.find(function (v) {
      return v.pid == pid;
    });
    var pnum = parseInt(pObj.pnum) + 1; // console.log(pnum)

    var that = this;
    $.ajax({
      url: numAPI,
      type: "GET",
      data: {
        uid: uid,
        pid: pid,
        pnum: pnum
      },
      success: function success(res) {
        // console.log(pid, pnum);
        console.log($(this));
        $(that).prev().val(pnum);
        pObj.pnum = pnum;
        countPrice();
      }
    });
  }); // 减少

  $(".count-minus").click(function () {
    var pid = $(this).attr("data-id");
    var pObj = cartList.find(function (v) {
      return v.pid == pid;
    });
    var pnum = parseInt(pObj.pnum) - 1;

    if (pnum < 1) {
      pnum = 1;
    }

    var that = this;
    $.ajax({
      url: numAPI,
      type: "GET",
      data: {
        uid: uid,
        pid: pid,
        pnum: pnum
      },
      success: function success(res) {
        // console.log(pid, pnum);
        $(that).next().val(pnum);
        pObj.pnum = pnum;
        countPrice();
      }
    });
  });
} // 全选和单选


function selFn() {
  $("#all-sel").change(function () {
    $.each($(".single-sel"), function (v, n) {
      $(n).prop("checked", $("#all-sel").prop("checked"));
    });
    cartList.forEach(function (v) {
      return v.checked = $("#all-sel").prop("checked");
    });
    countPrice();
  });
  $(".single-sel").change(function () {
    var pid = $(this).attr("pid"); // console.log(pid)

    var pObj = cartList.find(function (v) {
      return v.pid === pid;
    }); // console.log(pObj)

    pObj.checked = $(this).prop("checked"); // console.log($(this).prop("checked"))

    var allFlag = cartList.every(function (v) {
      return v.checked == true;
    }); // console.log(allFlag)

    $("#all-sel").prop("checked", allFlag);
    countPrice();
  });
} // 计算总价和总量


function countPrice() {
  var countNum = 0;
  cartList.forEach(function (v) {
    if (v.checked == true) {
      countNum += parseInt(v.pnum);
    }
  });
  $(".cart-num").html(countNum);
  $(".cart-selected-num").html(countNum);
  var countPrice = 0;
  cartList.forEach(function (v) {
    if (v.checked == true) {
      countPrice += parseInt(v.pnum) * parseInt(v.pprice);
    }
  });
  $(".cart-total").html("￥" + countPrice);
} // 结算栏


$(".cart-info-placeholder").css({
  position: "sticky",
  bottom: "0px",
  background: "#fff",
  boxShadow: "0px -2px 7px 0 rgba(0,0,0,0.1)"
});