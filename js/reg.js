"use strict";

$("#header").load("./_header.html");
$("#footer").load("./_footer.html"); // 密码栏 眼睛

$(".input-ico").click(function () {
  $(this).toggleClass("icon-show");
}); // 注册

$(".title-reg").click(function () {
  reg();
});
$(".reg-btn").click(function () {
  var regAPI = 'http://jx.xuzhixiang.top/ap/api/reg.php';
  var username = $("#username").val();
  var password = $("#password").val();
  $.ajax({
    url: regAPI,
    type: "GET",
    data: {
      username: username,
      password: password
    },
    success: function success(res) {
      if (res.code == 0) {
        alert("用户名已存在,请重新输入...");
      } else {
        $(".title-login").addClass("active");
        $(".title-reg").removeClass("active");
        login();
      }
    },
    error: function error(_error) {
      console.log(_error);
    }
  });
}); // 登录

$(".title-login").click(function () {
  login();
});
$(".login-btn").click(function () {
  // console.log(1);
  var logAPI = 'http://jx.xuzhixiang.top/ap/api/login.php';
  var username = $("#username").val();
  var password = $("#password").val();
  $.ajax({
    url: logAPI,
    type: "GET",
    data: {
      username: username,
      password: password
    },
    success: function success(res) {
      if (res.code == 1) {
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("uid", res.data.id);
        localStorage.setItem("token", res.data.token);
        alert("登录成功,正在前往首页...");
        location.href = "./index.html";
      } else {
        alert("请检查用户名或密码");
      }
    },
    error: function error(_error2) {
      console.log(_error2);
    }
  });
}); // 注册

function reg() {
  $(".title-reg").addClass("active");
  $(".title-login").removeClass("active");
  $(".login-btn").css({
    display: "none"
  });
  $(".reg-btn").css({
    display: "block"
  });
  $(".row-auto").css({
    display: "none"
  });
  $(".row-links").css({
    display: "none"
  });
  $(".row-center").css({
    display: "none"
  });
  $(".login-form").css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column"
  });
} // 登录


function login() {
  $(".title-login").addClass("active");
  $(".title-reg").removeClass("active");
  $(".login-btn").css({
    display: "block"
  });
  $(".reg-btn").css({
    display: "none"
  });
  $(".row-auto").css({
    display: "block"
  });
  $(".row-links").css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  });
  $(".row-center").css({
    display: "block"
  });
}