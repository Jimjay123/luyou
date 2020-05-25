import Vue from "vue";
import Router from "vue-router";
import userinfo from "./userinfo";
import group from "./group";
//import classes from './classes';
import creator from "./creator";
//import admin from './admin';
//import teacher from './teacher';
import home from "./home";
import Uncertified from "./Uncertified";
import Nogroup from "./Nogroup";
import Courseplan from "./Courseplan";

import Establish from "./Establish";
import library from "./library";
import teachers from "./teachers";
import header from "./header";
import personal from "./personal";
import creatorpersonal from "./creatorpersonal";
import student from "./student";

import Standarddetails from "./Standarddetails";
import Coursechanne from "./Coursechanne";
import aboutsth from "./aboutsth";
import prechannel from "./prechannel";
import Recstandard from "./Recstandard";
import notLoggedChannel from "./notLoggedChannel";
import notLoggedStandard from "./notLoggedStandard";
import palnchannel from "./palnchannel";
import planstandard from "./planstandard";
import joinUs from "./joinUs";

import notice from "./notice";
import search from "./search";
import studentSearch from "./studentSearch";
import orther from "./orther";
import { cloneObj } from "../utils/utils";
import { groJoinInvitationGroup } from "../service/groupApi";

import VueAwesomeSwiper from "vue-awesome-swiper";

Vue.use(VueAwesomeSwiper);

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: require("@/pages/home").default,
      redirect: "/main"
    },
    //...teacher,
    ...home,
    //...userinfo,
    ...group,
    //...classes,
    ...creator,
    //...admin,
    ...Uncertified,
    ...Nogroup,
    ...Courseplan,
    ...Establish,
    ...library,
    ...teachers,
    ...Standarddetails,
    ...Coursechanne,
    ...notice,
    ...search,
    ...studentSearch,
    ...header,
    ...personal,
    ...creatorpersonal,
    ...student,
    ...orther,
    ...prechannel,
    ...Recstandard,
    ...planstandard,
    ...palnchannel,
    ...notLoggedChannel,
    ...notLoggedStandard,
    ...aboutsth,
    ...joinUs,
    {
      path: "/tip",
      name: "tip",
      component: require("@/pages/index/tip.vue").default
    },
    {
      path: "*",
      name: "error",
      redirect: "/"
    }
  ]
});

router.beforeEach((to, from, next) => {
  const _hmt = window._hmt || [];
  if (to.path) {
    if (location.origin == "http://www.baidu.com") {
      _hmt.push(["_trackPageview", "/#" + to.path]);
    }
  }
  //   /**
  //    * 路由守卫  meta type   student       学生页面
  //    *                      teachers      老师页面
  //    *                      creater       创建者页面
  //    *                      orther        其他页面
  //    *                      login         登录页
  //    *                      authentication 认证页
  //    *
  //    * 1·是否存在当前角色状态 缓存
  //    *    1·有角色状态缓存 判断状态
  //    *       状态 0 4 未认证 跳转到未认证首页
  //    *       状态 2   状态为学生
  //    *          跳转页面为学生的页面放行
  //    *          跳转页面为  老师 创作者  的页面 重定向到学生首页
  //    *
  //    *          跳转页为学生以外的 页面
  //    *            如果为 链接邀请页 放行
  //    *            如果 为其他页面 放行
  //    *       状态为  1  老师
  //    *          跳转到老师的页面  放行
  //    *          跳转到老师以外的页面  重定向到老师端首页
  //    *       状态
  //    *    2·没有角色状态缓存  放行 让其走重定向
  //    *
  //    *
  //    * */

  // 去登录
  const linkToLogin = () => {
    if (
      from.path === "/StudentLinkto" &&
      to.path === "/main/login" &&
      !to.query.invitationCode
    ) {
      next({
        path: to.path,
        query: cloneObj(from.query || {})
      });
    } else {
      next();
    }
  };

  //登陆页回到链接邀请页
  const linkInvitation = () => {
    if (
      from.path === "/main/login" &&
      to.path === "/StudentLinkto" &&
      to.query.invitationCode
    ) {
      let val = to.query.status * 1;
      if (val === 0 || val === 1 || val === 4 || val === 5) {
        //未认证
        next({
          path: "/studentAttestation",
          query: cloneObj(from.query)
        });
      } else if (val === 2) {
        //认证未学生
        groJoinInvitationGroup({
          groupId: from.query.groupId
        }).then(res => {
          if (res.code == 0) {
            if (next) {
              next({
                path: "/student/studentList",
                query: cloneObj(from.query)
              });
            }
          }
        });
      }
    } else {
      next();
    }
  };
  let type = to.meta.type; //路由状态 详细如上
  if (type === "noRequired") {
    //不需要权限的页面
    next();
  } else {
    if (sessionStorage.getItem("loginRoleStatus") !== null) {
      let val = sessionStorage.getItem("loginRoleStatus") * 1; //获取缓存的--当前角色状态
      let type = to.meta.type; //路由状态 详细如上
      if (val === 0 || val === 4 || val === 5) {
        //未认证
        if (
          type === "login" ||
          type === "authentication" ||
          type === "orther"
        ) {
          //可以前往认证页
          linkToLogin();
          linkInvitation();
        } else {
          if (to.path !== "/Uncertified") {
            next({
              path: "/Uncertified"
            });
          } else {
            next();
          }
        }
      } else if (val === 1) {
        //认证为老师
        if (type === "teachers" || type === "login" || type === "orther") {
          linkToLogin();
          linkInvitation();
        } else {
          if (to.path !== "/Uncertified") {
            next({
              path: "/Uncertified"
            });
          } else {
            next();
          }
        }
      } else if (val === 2) {
        //认证为学生
        if (type === "student" || type === "login" || type === "orther") {
          linkToLogin();
          linkInvitation();
        } else {
          if (to.path !== "/StudentMain") {
            next({
              path: "/StudentMain"
            });
          } else {
            next();
          }
        }
      } else if (val === 3) {
        //认证为创建者
        if (type === "creator" || type === "login" || type === "orther") {
          linkToLogin();
          linkInvitation();
        } else {
          if (to.path !== "/creator/home") {
            next({
              path: "/creator/home"
            });
          } else {
            next();
          }
        }
      }
    } else {
      linkToLogin();
    }
  }
});

export default router;
