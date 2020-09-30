"use strict";

$("#header").load("./_header.html");
$("#footer").load("./_footer.html");
var pid = new URLSearchParams(location.search).get("pid");
var uid = localStorage.getItem("uid");
var pnum;
var proList;
var proAPI = "http://jx.xuzhixiang.top/ap/api/detail.php";
var addAPI = "http://jx.xuzhixiang.top/ap/api/add-product.php";
var cartAPI = "http://jx.xuzhixiang.top/ap/api/cart-list.php";
var numAPI = "http://jx.xuzhixiang.top/ap/api/cart-update-num.php"; // 详情页数据渲染

$.ajax({
  url: proAPI,
  type: "GET",
  data: {
    id: pid
  },
  success: function success(res) {
    // console.log(res.data)
    var html = "";
    proList = res.data;
    html += "\n        <div class=\"img-box\">\n        <img src=\"".concat(proList.pimg, "\" alt=\"\">\n      </div>\n      <div class=\"detail-wrap\">\n        <div class=\"detail-title\">\n          ").concat(proList.pname, "\n        </div>\n        <div class=\"detail-desc\">\n          ").concat(proList.pdesc, "\n        </div>\n        <div class=\"price-box\">\n          <span class=\"price-rmb\">\xA5</span>\n          <span class=\"detail-price\">").concat(proList.pprice, "</span>\n          <span class=\"detail-tag\">\u5305\u90AE</span>\n        </div>\n        <div class=\"detail-count-box\">\n          <p class=\"count-text\">\u6570\u91CF</p>\n          <div class=\"count-box detail-count\">\n            <div class=\"count-btn count-minus disable\">\n              <div class=\"icon-minus\"></div>\n            </div>\n            <input class=\"count-input\" type=\"text\" value=\"1\">\n            <div class=\"count-btn count-add\">\n              <div class=\"icon-add\"></div>\n            </div>\n          </div>\n        </div>\n        <div id=\"btn-box\">\n          <div class=\"button addBtn\">\n            <span>\u52A0\u5165\u8D2D\u7269\u8F66</span>\n          </div>\n          <div class=\"button goCart\">\n            <span>\u524D\u5F80\u8D2D\u7269\u8F66</span>\n          </div>\n        </div>\n        <div class=\"detail-guarantee\">\n          <span>\n            <i class=\"icon-detail-guarantee\"></i>\n            <span>\u641C\u72D7\u81EA\u8425</span>\n          </span>\n          <span>\n            <i class=\"icon-detail-guarantee\"></i>\n            <span>7\u5929\u65E0\u7406\u7531\u9000\u8D27</span>\n          </span>\n          <span>\n            <i class=\"icon-detail-guarantee\"></i>\n            <span>\u4E00\u5E74\u5185\u4FDD\u4FEE</span>\n          </span>\n        </div>\n      </div>\n        ");
    $(".detail").html(html); // console.log(proList)

    proList.pnum = 1; // pnum = proList.pnum;

    updata();
    addCart();
    goCart();
  }
}); // 加入购物车

function addCart() {
  $(".addBtn").click(function () {
    // console.log(pnum)
    var pnum = proList.pnum;
    $.ajax({
      url: addAPI,
      type: "GET",
      data: {
        uid: uid,
        pid: pid,
        pnum: pnum
      },
      success: function success(res) {
        // console.log(res)
        alert("成功添加购物车");
      }
    });
  });
} // 前往购物车页面


function goCart() {
  $(".goCart").click(function () {
    location.href = "../pages/cart.html";
  });
} // update 更新数据


function updata() {
  // 增加
  $(".count-add").click(function () {
    var pnum = parseInt(proList.pnum) + 1; // console.log(pnum)

    $(this).prev().val(pnum);
    proList.pnum = pnum;
  }); // 减少

  $(".count-minus").click(function () {
    var pnum = parseInt(proList.pnum) - 1;

    if (pnum <= 1) {
      pnum = 1;
    }

    $(this).next().val(pnum);
    proList.pnum = pnum;
  });
}

;