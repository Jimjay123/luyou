<!--
 * @Descripttion: 
 * @version: 
 * @Author: pengwanchong
 * @Date: 2019-09-24 09:51:37
 * @LastEditors: pengwanchong
 * @LastEditTime: 2019-12-05 16:36:23
 -->
<template>
  <div>
    <el-container>
      <!-- 解绑微信 -->
      <BindMobile :show="shows" :mobileFun="mobileFun" :wx="wx"></BindMobile>
      <!-- 解绑支付宝 -->
      <BindMobiles :show="showa" :mobileFun="mobileFun"></BindMobiles>
      <!-- 微信扫码登录 -->
      <wechatLogin v-if="showc" :mobileFun="mobileFun" v-Clickoutside="()=>{binding()}"></wechatLogin>
      <!-- 修改手机号 -->
      <ModifyMobile
        :show="showz"
        :mobileFun="mobileFun"
        :originMobile="originMobile"
        :value="ruleForm.mobile"
      ></ModifyMobile>
      <!-- 绑定新手机号 -->
      <ModifyMobiles
        :show="show"
        :mobileFuns="mobileFuns"
        :originMobile="originMobile"
        :value="ruleForm.mobile"
      ></ModifyMobiles>
      <!-- 内容 -->
      <el-main class="clearfix">
        <!-- <h3>个人中心</h3> -->
        <!-- 左侧栏信息 -->
        <div class="box">
          <ul class="tac">
            <li @click="handleClick1">
              <span class="title" ref="gr">个人信息</span>
              <span class="line" v-if="line1"></span>
            </li>
            <li @click="handleClick2">
              <span class="title" ref="dl">登录密码</span>
              <span class="line" v-if="line2"></span>
            </li>
            <li @click="handleClick3">
              <span class="title" ref="zh">账号关联</span>
              <span class="line" v-if="line3"></span>
            </li>
          </ul>

          <!-- 个人中心 -->
          <div class="xbox" v-if="ccs">
            <div class="first">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                class="ruleForm"
                :label-position="labelPosition"
                label-width="80px"
                width="300px"
              >
                <el-form-item label="姓名" prop="name" label-width="84px">
                  <el-col :span="input_width">
                    <el-input v-model="ruleForm.memberName" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="性别" label-width="84px">
                  <el-radio-group v-model="ruleForm.gender">
                    <el-radio label="男" border></el-radio>
                    <el-radio label="女" border></el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="手机号" label-width="84px">
                  <el-col :span="input_width">
                    <el-input v-model="ruleForm.mobile" :value="ruleForm.mobile" :disabled="true"></el-input>
                    <el-button @click="openclick(ruleForm.mobile)">修改手机号</el-button>
                  </el-col>
                </el-form-item>

                <el-form-item label="电子邮箱" prop="email" label-width="84px">
                  <el-col :span="input_width">
                    <el-input v-model="ruleForm.email"></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="身份证号" prop="identityCardNo" label-width="84px">
                  <el-col :span="input_width">
                    <el-input v-model="ruleForm.identityCardNo"></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="自我介绍" prop="introduction" label-width="79px">
                  <el-col :span="input_width" class="el-cols" style="width:768px;height:148px;">
                    <el-input
                      style="width:778px;height:148px;overflow: hidden;padding:5px"
                      type="textarea"
                      placeholder="概述一下自己耕耘的领域，我们会展示在讲师介绍里，便于老师学生了解到您。"
                      v-model="ruleForm.selfIntro"
                      maxlength="300"
                      show-word-limit
                      class="el-texta"
                    ></el-input>
                  </el-col>
                </el-form-item>
              </el-form>
            </div>

            <div class="next">
              <el-form
                :label-position="labelPosition"
                label-width="80px"
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm_"
                class="ruleForm nexts"
              >
                <el-form-item label="大学/单位" prop="universityName" label-width="84px">
                  <el-col :span="input_width">
                    <el-input v-model="ruleForm.universityName" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="所在学院" prop="xueyuan" label-width="84px">
                  <el-col :span="input_width">
                    <el-input v-model="ruleForm.collegeName"></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="专业学科" prop="xueke" label-width="84px">
                  <el-col :span="input_width">
                    <el-input v-model="ruleForm.majorName" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="职称" label-width="84px">
                  <el-select v-model="ruleForm.title" :placeholder="ruleForm.title">
                    <el-option
                      v-for="item in emit"
                      :key="item.id"
                      :label="item.title"
                      :value="item.title"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="职务" label-width="84px">
                  <el-col :span="input_width">
                    <el-input v-model="ruleForm.job"></el-input>
                  </el-col>
                </el-form-item>
              </el-form>

              <div>
                <el-button
                  class="commitBtn"
                  round
                  @click="submitForm('ruleForm','ruleForm_')"
                  :disabled="disabled"
                >保存</el-button>
              </div>
            </div>
          </div>

          <div class="pass" v-if="nss">
            <!-- 设置密码 -->
            <div class="npassword" v-if="pass === false ? true:false">
              <div class="first">
                <el-form
                  :model="ruleForm1"
                  :rules="rules"
                  ref="ruleForm1"
                  class="ruleForm"
                  :label-position="labelPosition"
                  width="300px"
                >
                  <div class="itemcc">
                    当前登录账号:
                    <span>{{ruleForm1.mobile}}</span>
                  </div>

                  <div class="dashed">
                    <img src="../../assets/img/xuxian.svg" alt />
                  </div>

                  <el-form-item>
                    <el-col :span="input_width">
                      <el-input
                        type="password"
                        name="password"
                        autocomplete="off"
                        v-model="ruleForm1.password"
                        placeholder="请输入密码(6-16位字符)"
                      ></el-input>
                      <p class="passShow" v-if="passShow">两次密码不一致，请重新输入</p>
                      <p class="passShow1" v-if="passShow1">请设置6-16位数字或字母，请重新输入</p>
                    </el-col>
                  </el-form-item>

                  <el-form-item>
                    <el-col :span="input_width">
                      <el-input
                        v-model="ruleForm1.password1"
                        type="password"
                        placeholder="请确认密码(6-16位字符)"
                        auto-complete="off"
                      ></el-input>
                      <p class="passShow" v-if="passShow">两次密码不一致，请重新输入</p>
                      <p class="passShow1" v-if="passShow1">请设置6-16位数字或字母，请重新输入</p>
                    </el-col>
                  </el-form-item>

                  <el-button round @click="Addto">设置密码</el-button>
                </el-form>
              </div>
            </div>

            <!-- 登录密码 -->
            <div class="cpassword" v-if="pass === false ? false:true">
              <div class="first">
                <el-form
                  :model="ruleForm1"
                  :rules="rules"
                  ref="ruleForm1"
                  class="ruleForm"
                  :label-position="labelPosition"
                  width="300px"
                >
                  <div class="itemcc">
                    当前登录账号:
                    <span>{{ruleForm1.mobile}}</span>
                  </div>

                  <div class="dashed">
                    <img src="../../assets/img/xuxian.svg" alt />
                  </div>

                  <el-form-item>
                    <el-col :span="input_width">
                      <el-input
                        type="captcha"
                        autocomplete="off"
                        v-model="ruleForm1.captcha"
                        placeholder="请输入验证码"
                      ></el-input>
                      <el-button @click="countDown" :disabled="!showtr" class="el">{{content}}</el-button>
                    </el-col>
                  </el-form-item>

                  <el-form-item>
                    <el-col :span="input_width">
                      <el-input
                        type="password"
                        name="password"
                        autocomplete="off"
                        v-model="ruleForm1.password"
                        placeholder="设置新密码(6-16位字符)"
                      ></el-input>
                      <p class="passShow" v-if="passShow">两次密码不一致，请重新输入</p>
                      <p class="passShow1" v-if="passShow1">请设置6-16位数字或字母，请重新输入</p>
                    </el-col>
                  </el-form-item>

                  <el-form-item>
                    <el-col :span="input_width">
                      <el-input
                        type="password"
                        name="password"
                        autocomplete="off"
                        v-model="ruleForm1.password1"
                        placeholder="确认新密码(6-16位字符)"
                      ></el-input>
                      <p class="passShow" v-if="passShow">两次密码不一致，请重新输入</p>
                      <p class="passShow1" v-if="passShow1">请设置6-16位数字或字母，请重新输入</p>
                    </el-col>
                  </el-form-item>

                  <el-button class="but" round @click="Confirmation">确认修改</el-button>
                </el-form>
              </div>
            </div>
          </div>

          <!-- 账号关联 -->
          <div class="Relation" v-if="rss">
            <div class="first">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                class="ruleForm"
                :label-position="labelPosition"
                label-width="80px"
                width="300px"
              >
                <div class="itemcc">
                  账号:
                  <span class="rul">{{ruleForm.mobile}}</span>
                  <span class="for">绑定后，可使用支付宝或者微信扫码登录</span>
                </div>

                <div class="dashed">
                  <img src="../../assets/img/cxuxian.svg" alt />
                </div>

                <div class="wx clearfix">
                  <img
                    :src="weChatNickName == null ? require('../../assets/img/wwx.svg') : require('../../assets/img/ywx.svg')"
                  />
                  <p class="s2">
                    <span v-if="weChatNickName == null ? false:true">已绑定微信账号</span>
                    {{weChatNickName}}
                  </p>
                  <span
                    class="o1"
                    @click="bindingweChat()"
                    v-if="weChatNickName ? false:true"
                  >绑定微信账号</span>
                  <span class="o2" @click="bindMobileFun()" v-if="weChatNickName ? true:false">解除绑定</span>
                </div>
                <div class="zfb">
                  <img
                    :src="aliPayNickName == null ? require('../../assets/img/wzfb.svg') : require('../../assets/img/yzfb.svg')"
                  />
                  <p class="s2">
                    <span v-if="weChatNickName == null ? false:true">已绑定支付宝账号</span>
                    {{aliPayNickName}}
                  </p>
                  <span class="o1" @click="jumpAlipay()" v-if="aliPayNickName ? false:true">绑定支付宝账号</span>
                  <span class="o2" @click="bindMobile()" v-if="aliPayNickName ? true:false">解除绑定</span>
                </div>
              </el-form>
            </div>
          </div>
        </div>
        <div class="tishi" v-if="tishi">
          <p>{{tishiWord}}</p>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HomeHeader from "../creator/homeHeader";

import Clickoutside from "element-ui/src/utils/clickoutside";

import SelBox from "../common/selBox";

import BindMobile from "./bindMobile";

import BindMobiles from "../student/bindMobiles";

import creatorNav from "../creator/creatorNav";

import ModifyMobile from "./modifymobile";

import ModifyMobiles from "./modifymobiles";

import wechatLogin from "../wechatLogin/wechatLogin";

import {
  membermemberTeacher,
  memberTeacher,
  putFileAvatarUpload,
  memberpassExistCheck,
  memberresetPassword,
  mobileresetPassword,
  memberInfobindInfo
} from "../../service/groupApi";

import { stuGroJoinGroList } from "../../service/studentApi";

import { getMobileCpaCode, aliAppInfAppInfo } from "../../service/mainApi";

import { tipsFail } from "../../utils/utils";

export default {
  name: "personal",
  directives: {
    Clickoutside
  },
  created() {
    // 获取学生加入的群列表
    stuGroJoinGroList({})
      .then(res => {
        if (res.code == "0") {
          this.group = res.list;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    //个人中心-获取用户基本信息
    membermemberTeacher({})
      .then(res => {
        if (res.code == "0") {
          this.ruleForm = res.data;
          if (this.ruleForm.gender === 1) {
            this.ruleForm.gender = "男";
          } else {
            this.ruleForm.gender = "女";
          }
          this.imageUrl = this.ruleForm.avatar;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 个人中心-用户绑定信息取得
    memberInfobindInfo({})
      .then(res => {
        if (res.code == "0") {
          this.weChatNickName = res.data.weChatNickName;
          this.aliPayNickName = res.data.aliPayNickName;
          this.memberId = res.data.memberId;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(" "));
      }
    };
    return {
      passShow: false,
      passShow1: false,
      showb: false,
      line1: true,
      line2: false,
      line3: false,
      showa: false,
      memberId: "",
      showc: false,
      originMobile: "",
      showz: false,
      wx: "",
      tishi: false,
      disabled: false,
      weChatNickName: "",
      aliPayNickName: "",
      pass: [],
      showtr: true,
      show: false,
      shows: false,
      content: "发送验证码", // 按钮里显示的内容
      totalTime: 60, //记录具体倒计时时间
      rss: false,
      nss: false,
      ccs: true,
      textarea: "",
      file: "",
      labelPosition: "left",
      tishiWord: "",
      emit: [
        {
          id: 1,
          title: "助教"
        },
        {
          id: 2,
          title: "讲师"
        },
        {
          id: 3,
          title: "副教授"
        },
        {
          id: 4,
          title: "教授"
        }
      ],
      ruleForm: {
        memberName: "",
        gender: "男",
        mobile: "",
        email: "",
        identityCardNo: "", //右边
        selfIntro: "",
        college: "",
        collegeName: "",
        majorName: "",
        Title: "",
        profession: "",
        avatar: "",

        captcha: "",
        password: "",
        password1: "",
        region: "",
        type: ""
      },
      ruleForm1: {
        mobile: "",
        captcha: "",
        password: "",
        password1: ""
      },
      input_width: 20,
      imageUrl: "", //上传头像
      //校验
      rules: {},
      selVal: {
        val: "86", //值
        label: "86" //对应展示值
      },
      list: [
        {
          val: "86",
          label: "86"
        },
        {
          val: "886",
          label: "886"
        },
        {
          val: "852",
          label: "852"
        }
      ]
    };
  },
  methods: {
    // 转正支付宝绑定登录页面
    jumpAlipay() {
      aliAppInfAppInfo().then(res => {
        if (res.code == 0) {
          let data = res.data;
          this.app_id = data.appId;
          this.scope = data.scope;
          this.redirect_uri =
            data.redirectUrl + "?&state=bind-" + this.memberId;
          let url =
            "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=" +
            this.app_id +
            "&scope=" +
            this.scope +
            //"&state=login" +
            "&redirect_uri=" +
            this.redirect_uri;
          window.location.href = url; //跳转到支付宝授权页
        } else {
          tipsFail(res.msg);
        }
      });
    },
    // 微信扫码登录弹框关闭
    binding() {
      this.showc = false;
    },
    // 微信扫码登录弹框显示
    bindingweChat() {
      this.showc = true;
    },
    // 修改手机号弹框显示
    openclick(val) {
      this.showz = true;
      this.originMobile = val;
    },
    // 修改数据回调
    mobileFun(type, val) {
      if (type === "hide" && val === false) {
        console.log(1);
        this.shows = false;
        this.showa = false;
        this.showz = false;
        this.show = false;
        this.showc = false;
      } else {
        console.log(2);
        //提交成功回调手机号
        this.mobile = val;
        this.shows = false;
        this.showa = false;
        this.showz = false;
        this.show = false;
      }
      if (type === "hide" && val === true) {
        //提交成功回调手机号
        this.mobile = val;
        this.shows = false;
        this.showa = false;
        this.showz = false;
        this.show = true;
      }
    },
    // 修改手机号数据回调
    mobileFuns(type, val) {
      if (type === "hide") {
        this.showz = false;
      } else {
        //提交成功回调手机号
        this.mobile = val;
        this.showz = false;
        this.show = false;
      }
      if (type === "hide") {
        this.shows = false;
        this.showa = false;
        this.show = false;
      } else {
        //提交成功回调手机号
        this.mobile = val;
        this.shows = false;
        this.showa = false;
        this.show = false;
      }
    },
    // 接触绑定弹框显示隐藏
    bindMobileFun() {
      this.shows = !this.shows;
    },
    // 解绑支付宝弹框显示隐藏
    bindMobile() {
      this.showa = !this.showa;
    },
    // 修改数据提供
    Confirmation() {
      let data = this.ruleForm1;
      let password = this.ruleForm1.password;
      let password1 = this.ruleForm1.password1;
      if (password != password1) {
        this.passShow = true;
        this.passShow1 = false;
      } else if (
        password.length < 6 ||
        password.length > 16 ||
        password1.length < 6 ||
        password1.length > 16
      ) {
        this.passShow1 = true;
        this.passShow = false;
      } else {
        this.passShow1 = false;
        this.passShow = false;
        mobileresetPassword({
          mobile: data.mobile,
          captcha: data.captcha,
          password: data.password
        })
          .then(res => {
            if (res.code == "0") {
              this.tishi = true;
              this.tishiWord = "修改成功";
              setTimeout(() => {
                this.tishi = false;
                this.ruleForm1.captcha = "";
                this.ruleForm1.password = "";
                this.ruleForm1.password1 = "";
              }, 2000);
            } else {
              tipsFail(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 设置密码按钮提交信息
    Addto() {
      let data = this.ruleForm1;
      let password = this.ruleForm1.password;
      let password1 = this.ruleForm1.password1;
      if (password != password1) {
        this.passShow = true;
        this.passShow1 = false;
      } else if (
        password.length < 6 ||
        password.length > 16 ||
        password1.length < 6 ||
        password1.length > 16
      ) {
        this.passShow1 = true;
        this.passShow = false;
      } else {
        memberresetPassword({ password: data.password })
          .then(res => {
            if (res.code == "0") {
              this.passShow1 = false;
              this.passShow = false;
              this.tishi = true;
              this.tishiWord = "设置成功";
              setTimeout(() => {
                this.tishi = false;
                this.pass = true;
                this.ruleForm1.password = "";
                this.ruleForm1.password1 = "";
              }, 2000);
            } else {
              tipsFail(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 密码中间段显示*
    substr(account) {
      var account = this.ruleForm.mobile;
      var str = account;
      var str2 = str.substr(0, 3) + " **** " + str.substr(7);
      this.account = str2;
    },
    // 按钮提示多少秒后可以重新点击
    countDown() {
      this.show = false;
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.content = this.totalTime + "s后重发";
        if (this.totalTime < 0) {
          //当倒计时小于0时清除定时器
          window.clearInterval(clock);
          this.content = "重新发送";
          this.totalTime = 60;
          this.show = true;
        }
      }, 1000);
      //获取验证码接口
      getMobileCpaCode({
        areaCode: this.selVal.val,
        mobile: this.ruleForm1.mobile
      })
        .then(res => {
          if (res.code == "0") {
          } else {
            tipsFail(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 个人信息点击
    handleClick1() {
      this.ccs = true;
      this.rss = false;
      this.nss = false;
      this.line1 = true;
      this.line2 = false;
      this.line3 = false;
      this.$refs.gr.style.color = "#FE7865";
      this.$refs.dl.style.color = "#B3B3B3";
      this.$refs.zh.style.color = "#B3B3B3";
    },
    // 登录密码点击
    handleClick2() {
      this.showz = false;
      this.ruleForm1.mobile = this.ruleForm.mobile;
      memberpassExistCheck({})
        .then(res => {
          if (res.code == "0") {
            this.pass = res.data.passwordExist;
            if (this.pass === true) {
              this.ruleForm1.captcha = "";
              this.ruleForm1.password = "";
              this.ruleForm1.password1 = "";
            } else {
              this.ruleForm1.password = "";
              this.ruleForm1.password1 = "";
            }
          } else {
            tipsFail(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.ccs = false;
      this.nss = true;
      this.rss = false;
      this.line1 = false;
      this.line2 = true;
      this.line3 = false;
      this.$refs.gr.style.color = "#B3B3B3";
      this.$refs.dl.style.color = "#FE7865";
      this.$refs.zh.style.color = "#B3B3B3";
    },
    // 账号关联点击
    handleClick3() {
      this.ccs = false;
      this.rss = true;
      this.nss = false;
      this.line1 = false;
      this.line2 = false;
      this.line3 = true;
      this.$refs.gr.style.color = "#B3B3B3";
      this.$refs.dl.style.color = "#B3B3B3";
      this.$refs.zh.style.color = "#FE7865";
    },
    menu() {
      window.scrollTo(0, 0);
    },

    submitForm() {
      let data = this.ruleForm;

      memberTeacher({
        memberName: data.memberName,
        gender: data.gender === "男" ? 1 : 2, //性别
        email: data.email,
        collegeName: data.collegeName,
        avatar: this.imageUrl,
        identityCardNo: data.identityCardNo,
        title: data.title,
        job: data.job,
        selfIntro: data.selfIntro
      })
        .then(res => {
          if (res.code == "0") {
            this.tishi = true;
            this.tishiWord = "保存成功";
            setTimeout(() => {
              this.tishi = false;
            }, 2000);
          } else {
            tipsFail(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    beforeAvatarUpload() {},
    //上传图片改变事件
    fileChange(event) {
      if (event.target.files.length <= 0) {
        return;
      }
      let file = event.target.files[0];
      let data = new FormData();
      data.append("file", file);
      putFileAvatarUpload(data).then(res => {
        if (res.code == "0") {
          this.imageUrl = res.webUrl;
        }
      });
    }
  },
  mounted() {
    this.substr(this.account);
    this.menu();
  },
  computed: {
    // header: ruleForm.avatar,
    header: function() {
      if (this.imageUrl !== "") {
        return this.imageUrl;
      } else {
        if (this.ruleForm.gender === "男") {
          return require("../../assets/teachers/boy.svg");
        } else {
          return require("../../assets/teachers/girls.svg");
        }
      }
    }
  },
  components: {
    SelBox: SelBox,
    BindMobile: BindMobile,
    BindMobiles: BindMobiles,
    ModifyMobile: ModifyMobile,
    wechatLogin: wechatLogin,
    creatorNav: creatorNav,
    HomeHeader: HomeHeader,
    ModifyMobiles: ModifyMobiles
  }
};
</script>

<style>
.el-textarea .el-textarea__inner {
  resize: none;
  overflow: hidden;
}
.el-form-item__label {
  line-height: 40px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFangSC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.el-textarea__inner {
  height: 138px;
  padding: 10px 12px !important;
}
.el-input__count {
  background: rgba(0, 0, 0, 0) !important;
}
.el-textarea__inner:focus {
  border-color: rgb(255, 183, 179) !important;
  border-right-width: 1px !important;
  outline: 0;
  -webkit-box-shadow: 0 0 0 5px rgba(255, 183, 179, 0.2) !important;
  box-shadow: 0 0 0 5px rgba(255, 183, 179, 0.2) !important;
}
/* radio按钮隐藏 */
.el-radio__inner {
  display: none !important;
}

/* radio颜色 */
.el-radio.is-bordered.is-checked {
  border-color: rgba(254, 120, 101, 1) !important;
}

.el-radio.is-bordered.is-checked .el-radio__label {
  color: rgba(254, 120, 101, 1) !important;
}

.el-input__inner {
  border-color: none;
}
/* 输入框颜色 */
.el-input__inner:focus {
  border-color: rgb(255, 183, 179) !important;
  border-right-width: 1px !important;
  outline: 0;
  -webkit-box-shadow: 0 0 0 5px rgba(255, 183, 179, 0.2) !important;
  box-shadow: 0 0 0 5px rgba(255, 183, 179, 0.2) !important;
}

.el-input__inner:hover {
  border-color: rgb(255, 229, 225);
  border-right-width: 1px;
}

.el-button.is-plain:hover {
  color: rgb(255, 183, 179);
}

.el-button:hover {
  background: none;
  border-color: rgb(255, 183, 179) !important;
  color: rgb(255, 183, 179);
}

.el-button:active {
  border-color: rgb(255, 183, 179) !important;
}

.avatar-uploader .el-upload {
  width: 83px;
  height: 83px;
  border-radius: 63px;
  border: 2px solid rgba(254, 120, 101, 0.1);
  position: relative;
  margin-top: 18px;
  margin-left: 300px;
}

.avatar-uploader .el-upload:hover {
  background: rgba(0, 0, 0, 0.31);
  border-radius: 129px;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-textarea {
  width: 614px;
  /* height: 112px !important; */
}
</style>

<style lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;
}
.el-main {
  margin-top: 64px;
  overflow: hidden;
  padding: 0 0 0 18px;
  .box {
    position: relative;
    width: 1000px;
    height: 558px;
    .tac {
      float: left;
      width: 77px;
      border-radius: 0px 0px 0px 10px;
      cursor: pointer;
      li {
        width: 77px;
        height: 46px;
        line-height: 46px;
        position: relative;
        .title {
          font-size: 15px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
        .line {
          position: absolute;
          right: 0;
          top: 13px;
          width: 4px;
          height: 20px;
          background: rgba(254, 120, 101, 1);
          border-radius: 3px;
        }
      }
      li:nth-child(1) {
        .title {
          color: rgb(254, 120, 101);
        }
      }
      li:active {
        color: red;
      }
    }
    .xbox {
      width: 920px;
      height: 558px;
      float: left;
      margin-top: 12px;
      .first {
        width: 390px;
        float: left;
        margin-left: 68px;
        .el-input {
          width: 300px;
        }
        .el-radio-group {
          margin: 0 auto;
        }
        .el-radio {
          width: 140px;
          text-align: center;
          margin-right: 10px;
        }
        .el-radio:last-child {
          margin-right: 4px;
        }
        .el-textarea {
          widows: 614px !important;
        }
        .el-button {
          position: absolute;
          right: 14px;
          top: 1px;
          width: 70px;
          height: 38px;
          border: none;
          padding: 0;
          background-color: #f5f7fa;
          color: #fe7865;
        }
        .el-button:hover {
          color: #fe7865;
        }
      }

      .next {
        float: left;
        .nexts {
          margin-left: 78px;
        }
        .el-form-item {
          .el-col {
            width: 0%;
          }
          .el-input {
            width: 300px;
          }
          .el-select {
            width: 300px;
            .el-input {
              width: 300px;
            }
          }
        }
        .el-button {
          position: absolute;
          top: 512px;
          left: 887px;
          width: 110px;
          height: 36px;
          background: linear-gradient(
            90deg,
            rgba(255, 176, 158, 1) 0%,
            rgba(254, 120, 101, 1) 100%
          );
          border-radius: 18px;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 12px;
          border: none;
        }
      }
    }
    .npassword {
      width: 920px;
      float: left;
      .first {
        float: left;
        margin-left: 68px;
        .itemcc {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFangSC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 22px;
          span {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 22px;
            letter-spacing: 1px;
          }
        }
        .dashed {
          width: 299px;
          height: 38px;
          margin-bottom: 21px;
        }
        .el-input {
          width: 300px;
        }
        .el-input::-webkit-input-placeholder {
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.25);
          line-height: 16px;
        }
        .el-button {
          margin-left: 93px;
          width: 110px;
          height: 36px;
          background: linear-gradient(
            90deg,
            rgba(255, 176, 158, 1) 0%,
            rgba(254, 120, 101, 1) 100%
          );
          border-radius: 18px;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 12px;
          border: none;
        }
        .el-button:active {
          border: none;
        }
      }
    }
    .cpassword {
      width: 920px;
      float: left;
      position: relative;
      margin-top: 12px;
      .first {
        float: left;
        margin-left: 68px;
        .itemcc {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFangSC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 22px;
          span {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 22px;
            letter-spacing: 1px;
          }
        }
        .dashed {
          width: 299px;
          height: 38px;
          margin-bottom: 21px;
        }
        .select {
          position: absolute;
          left: 0;
          top: -4px;
          z-index: 999;
          height: 34px;
        }
        .oo1 {
          position: absolute;
          top: 0;
          left: 0;
          padding-left: 108px;
        }
        .el-input {
          width: 300px;
        }
        .el-input::-webkit-input-placeholder {
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.25);
          line-height: 16px;
        }
        input {
          width: 300px;
          padding: 0 15px;

          background-color: #fff;
          background-image: none;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          color: #606266;
          display: inline-block;
          font-size: inherit;
          height: 40px;
          line-height: 40px;
        }
        input:focus {
          box-sizing: border-box;
          border-color: rgb(255, 183, 179) !important;
          border-right-width: 1px !important;
          outline: 0;
          -webkit-box-shadow: 0 0 0 5px rgba(255, 183, 179, 0.2) !important;
          box-shadow: 0 0 0 5px rgba(255, 183, 179, 0.2) !important;
        }
        .el {
          position: absolute;
          top: 3px;
          right: 5px;
          display: block;
          cursor: pointer;
          height: 30px;
          width: 100px;
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(254, 120, 101, 1);
          border: none;
        }
        .el-button:focus {
          background-color: #fff;
        }
        .but {
          margin-left: 80px;
          width: 130px;
          height: 36px;
          padding: 12px;
          background: linear-gradient(
            90deg,
            rgba(255, 176, 158, 1) 0%,
            rgba(254, 120, 101, 1) 100%
          );
          border-radius: 18px;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 12px;
          border: none;
        }
        .but:active {
          border: none;
        }
      }
    }
    .Relation {
      width: 920px;
      float: left;
      margin-top: 12px;
      .first {
        float: left;
        margin-left: 68px;

        .itemcc {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFangSC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 22px;
          .rul {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 22px;
          }
          .for {
            margin-left: 16px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(179, 179, 179, 1);
          }
        }
        .dashed {
          height: 38px;
          margin-bottom: 21px;
        }
        .el-input {
          width: 300px;
        }
        input {
          border: none;
          background: #fff;
        }
        .el-col-20 {
          width: 100px;
        }
        .wx {
          width: 418px;
          overflow: hidden;
          img {
            width: 24px;
            height: 24px;
            float: left;
          }
          .s2 {
            float: left;
            margin-left: 20px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 22px;
          }
          .o1 {
            float: left;
            margin-left: 20px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(254, 120, 101, 1);
            line-height: 22px;
            cursor: pointer;
          }
          .o2 {
            float: left;
            margin-left: 20px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(254, 120, 101, 1);
            line-height: 22px;
            cursor: pointer;
          }
        }
        .zfb {
          width: 418px;
          overflow: hidden;
          margin-top: 14px;
          img {
            width: 24px;
            height: 24px;
            float: left;
          }
          .s2 {
            float: left;
            margin-left: 20px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 22px;
          }
          .o1 {
            float: left;
            margin-left: 20px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(254, 120, 101, 1);
            line-height: 22px;
            cursor: pointer;
          }
          .o2 {
            float: left;
            margin-left: 20px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(254, 120, 101, 1);
            line-height: 22px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .tishi {
    position: absolute;
    top: 82px;
    left: 50%;
    transform: translateX(-50%;);
    width: 75px;
    height: 23px;
    background: rgba(51, 51, 51, 0.44);
    border-radius: 4px;
    line-height: 23px;
    p {
      font-size: 12px;
      padding: 3px 10px 4px 10px;
      font-family: MicrosoftYaHei;
      color: rgba(255, 255, 255, 1);
      line-height: 16px;
    }
  }
}
.el-select-dropdown {
  .selected {
    color: rgba(254, 120, 101, 1);
    font-weight: 500;
  }
}
.el-texta /deep/ .el-textarea__inner {
  height: 138px;
}
.passShow {
  position: absolute;
  top: 42px;
  width: 160px;
  height: 16px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(254, 120, 101, 1);
  line-height: 16px;
}
.passShow1 {
  position: absolute;
  top: 42px;
  width: 207px;
  height: 16px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(254, 120, 101, 1);
  line-height: 16px;
}
</style>
