<template>
  <div>
    <el-container>
      <!-- 头部 -->

      <TopHeader class="clearfix"></TopHeader>

      <!-- <BindMobile :show="shows" :mobileFun="mobileFun" :wx="wx"></BindMobile>
      <BindMobiles :show="showa" :mobileFun="mobileFun"></BindMobiles> -->
      <!-- <wechatLogin v-if="showc" v-Clickoutside="()=>{binding()}"></wechatLogin> -->

      <ModifyMobile
        :show="showz"
        :mobileFun="mobileFun"
        :originMobile="originMobile"
        :value="ruleForm.mobile"
      ></ModifyMobile>
      <!-- 内容 -->
      <el-main class="clearfix">
        <div class="plana">
          <div class="ans1">
            <span></span>
            <i>账号设置</i>
          </div>
        </div>
        <div class="box">
          <el-row class="tac">
            <el-col>
              <el-menu default-active="1" class="el-menu-vertical-demo">
                <el-menu-item index="1" @click="handleClick1">
                  <span slot="title">个人信息</span>
                  <span class="line"></span>
                  <!-- <i></i> -->
                </el-menu-item>
                <el-menu-item index="2" @click="handleClick2">
                  <span slot="title">登录密码</span>
                  <span class="line"></span>
                  <!-- <i></i> -->
                </el-menu-item>
                <el-menu-item index="3" @click="handleClick3">
                  <span slot="title">账号关联</span>
                  <span class="line"></span>
                  <!-- <i></i> -->
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>

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
                    <el-input v-model="ruleForm.mobile" :value="ruleForm.mobile"></el-input>
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

                <el-form-item label="自我介绍" prop="introduction" label-width="84px">
                  <el-col :span="input_width" class="el-cols" style="width:618px;height:80px;">
                    <el-input
                      style="width:618px;"
                      type="textarea"
                      placeholder="概述一下自己耕耘的领域，我们会展示在讲师介绍里，便于老师学生了解到您。"
                      v-model="ruleForm.selfIntro"
                      maxlength="300"
                      show-word-limit
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
                <div style="margin-top: 42px;"></div>
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

                <div class="upload">
                  <div class="up-box">
                    <input type="file" ref="file" @change="fileChange" accept="image/*" />
                    <img :src="ruleForm.avatar" alt />
                    <img :src="header" alt />
                    <span>编辑</span>
                  </div>
                </div>
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
                  label-width="80px"
                  width="300px"
                >
                  <el-form-item label="当前登录账号" label-width="110px">
                    <el-col :span="input_width">
                      <!-- <el-input v-model="ruleForm.mobile" :disabled="true"></el-input> -->
                      <span
                        id="c1"
                        style="color:rgba(153,153,153,1);font-size:16px;line-height:16px;"
                      >{{ruleForm1.mobile}}</span>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="设置登录密码" label-width="110px" prop="password">
                    <el-col :span="input_width">
                      <el-input
                        v-model="ruleForm1.password"
                        type="password"
                        placeholder="请输入密码(6-16位字符)"
                        auto-complete="off"
                      ></el-input>
                    </el-col>
                  </el-form-item>

                  <el-form-item label-width="110px" prop="password1">
                    <el-col :span="input_width">
                      <el-input
                        v-model="ruleForm1.password1"
                        type="password"
                        placeholder="请确认密码(6-16位字符)"
                        auto-complete="off"
                      ></el-input>
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
                  label-width="80px"
                  width="300px"
                >
                  <el-form-item
                    label="当前登录账号"
                    label-width="110px"
                    style="color:rgba(153,153,153,1);font-size:16px;line-height:22px;"
                  >
                    <el-col :span="input_width">
                      <span
                        id="c1"
                        style="color:rgba(153,153,153,1);font-size:16px;line-height:16px;"
                      >{{ruleForm1.mobile}}</span>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="输入验证码" label-width="110px">
                    <el-col :span="input_width">
                      <el-input
                        type="captcha"
                        autocomplete="off"
                        v-model="ruleForm1.captcha"
                        placeholder="请输入验证码"
                      ></el-input>
                      <el-button @click="countDown" :disabled="!show">{{content}}</el-button>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="新密码" label-width="110px">
                    <el-col :span="input_width">
                      <el-input
                        type="password"
                        name="password"
                        autocomplete="off"
                        v-model="ruleForm1.password"
                        placeholder="设置新密码(6-16位字符)"
                      ></el-input>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="确认新密码" label-width="110px">
                    <el-col :span="input_width">
                      <el-input
                        type="password"
                        name="password"
                        autocomplete="off"
                        v-model="ruleForm1.password1"
                        placeholder="确认新密码(6-16位字符)"
                      ></el-input>
                    </el-col>
                  </el-form-item>

                  <el-button class="but" round @click="Confirmation">确认修改密码</el-button>
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
                <el-form-item label="当前登录账号" label-width="110px" style="line-height:22px;">
                  <el-col :span="input_width">
                    <span
                      id="c1"
                      style="font-size:16px;color:rgba(153,153,153,1);line-height:16px;"
                    >{{ruleForm.mobile}}</span>
                  </el-col>
                  <span
                    style="margin-left:64px;font-size:16px;font-family:PingFangSC;font-weight:400;color:rgba(179,179,179,1);line-height:22px;"
                  >绑定支付宝、微信后，可使用支付宝或者微信扫码登录</span>
                </el-form-item>

                <div class="wx">
                  <img src="../../assets/img/wx.svg" alt />
                  <span class="s1">微信</span>
                  <span class="s2">{{weChatNickName}}</span>
                  <el-button
                    round
                    @click="bindingweChat()"
                    class="o1"
                    v-if="weChatNickName ? false:true"
                  >绑定</el-button>
                  <el-button
                    round
                    @click="bindMobileFun()"
                    class="o2"
                    v-if="weChatNickName ? true:false"
                  >解绑</el-button>
                </div>
                <div class="zfb">
                  <img src="../../assets/img/zfb.svg" alt />
                  <span class="s1">支付宝</span>
                  <span class="s2">{{aliPayNickName}}</span>
                  <el-button
                    round
                    @click="jumpAlipay()"
                    class="o1"
                    v-if="aliPayNickName ? false:true"
                  >绑定</el-button>
                  <el-button
                    round
                    @click="bindMobile()"
                    class="o2"
                    v-if="aliPayNickName ? true:false"
                  >解绑</el-button>
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
import TopHeader from "../Header/header";
import Clickoutside from "element-ui/src/utils/clickoutside";
import SelBox from "../common/selBox";
// import BindMobile from "./bindMobile";
// import BindMobiles from "../student/bindMobiles";
// import ModifyMobile from "./modifymobile";
// import wechatLogin from "../wechatLogin/wechatLogin";
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
      showa: false,
      memberId: "",
      showc: false,
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
      originMobile: "",
      showz: false,
      wx: "",
      tishi: false,
      disabled: false,
      weChatNickName: "",
      aliPayNickName: "",
      pass: [],
      show: true,
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
      ruleForm: {
        memberName: "",
        gender: "男",
        mobile: "",
        // mobile1: "",
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
    binding() {
      this.showc = false;
    },
    bindingweChat() {
      this.showc = true;
    },
    openclick(val, mob) {
      this.showz = true;
      this.originMobile = val;
    },
    // 绑定认证-验证码发送
    memInfoGetMobileFun() {
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
    mobileFun(type, val) {
      if (type === "hide") {
        this.showz = false;
      } else {
        //提交成功回调手机号
        this.mobile = val;
        this.showz = false;
      }
      if (type === "hide") {
        this.shows = false;
        this.showa = false;
      } else {
        //提交成功回调手机号
        this.mobile = val;
        this.shows = false;
        this.showa = false;
      }
    },
    bindMobileFun() {
      this.shows = !this.shows;
    },
    bindMobile() {
      this.showa = !this.showa;
    },
    Confirmation() {
      let data = this.ruleForm1;
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
            }, 2000);
          } else {
            tipsFail(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    Addto() {
      let data = this.ruleForm1;
      memberresetPassword({ password: data.password })
        .then(res => {
          if (res.code == "0") {
            this.tishi = true;
            this.tishiWord = "设置成功";
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
      //清除密码
      // data.password = "";
      // data.password1 = "";
    },
    substr(account) {
      var account = this.ruleForm.mobile;
      var str = account;
      var str2 = str.substr(0, 3) + " **** " + str.substr(7);
      this.account = str2;
    },
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
    handleClick1() {
      this.ccs = true;
      this.rss = false;
      this.nss = false;
    },
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
      // this.ruleForm.mobile = "";
    },
    handleClick3() {
      this.ccs = false;
      this.rss = true;
      this.nss = false;
    },
    menu() {
      window.scrollTo(0, 0);
    },
    selectFile: function(e) {
      this.file = e.target.files[0];
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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
    TopHeader: TopHeader, //注册该组件
    SelBox: SelBox,
    // BindMobile: BindMobile,
    // BindMobiles: BindMobiles,
    // ModifyMobile: ModifyMobile,
    // wechatLogin: wechatLogin
  }
};
</script>

<style>
.el-form-item__label {
  width: 110px;
  line-height: 40px;
  font-size: 16px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.el-textarea__inner {
  height: 112px;
  border-color: none;
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
  margin: 0 auto;
  width: 100%;
}
.el-main {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1204px;
  padding: 0;
  overflow: hidden;
  margin-top: 22px;
  padding: 2px;
  .plana {
    margin-top: 59px;
    .ans1 {
      height: 40px;
      line-height: 40px;
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      span:first-child {
        display: inline-block;
        height: 31px;
        border-left: 8px solid rgba(254, 120, 101, 1);
        border-radius: 4px;
      }
      i {
        text-align: center;
        // width: 116px;
        height: 40px;
        line-height: 40px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        font-style: normal;
        margin-left: 10px;
        font-size: 28px;
      }
    }
  }
  .box {
    width: 1200px;
    height: 544px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    position: relative;
    .tac {
      float: left;
      width: 170px;
      height: 544px;
      border-radius: 0px 0px 0px 10px;
      background: rgba(252, 252, 252, 1);
      .el-col {
        text-align: center;
        .el-menu-vertical-demo {
          border: none;
          .el-menu-item {
            width: 170px;
            height: 64px;
            background: rgba(252, 252, 252, 1);
            color: #999999;
            line-height: 64px;
            font-size: 15px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            position: relative;
            i {
              float: right;
              display: block;
              width: 4px;
              height: 30px;
              background: rgba(254, 120, 101, 1);
              border-radius: 3px;
              margin-top: 17px;
            }
            &:hover {
              background-color: #fff;
            }
          }
          .el-menu-item.is-active {
            color: #333333;
            background: rgba(255, 255, 255, 0.01);
            .line {
              position: absolute;
              right: 0;
              top: 16px;
              width: 4px;
              height: 30px;
              background: rgba(254, 120, 101, 1);
              border-radius: 3px;
            }
          }
        }
      }
    }
    .xbox {
      width: 1030px;
      float: left;
      .first {
        width: 390px;
        float: left;
        margin-left: 37px;
        margin-top: 42px;
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
          top: 12px;
          width: 70px;
          height: 16px;
          border: none;
          padding: 0;
          color: #fe7865;
        }
      }

      .next {
        float: left;
        .nexts {
          margin-left: 64px;
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
        .upload {
          float: right;
          .up-box {
            right: 25px;
            width: 83px;
            height: 83px;
            border-radius: 63px;
            border: 2px solid rgba(254, 120, 101, 0.1);
            position: absolute;
            margin-top: -312px;
            cursor: pointer;
            img {
              position: absolute;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
            input {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
              cursor: pointer;
              z-index: 10;
            }
            span {
              display: none;
            }
          }
          .up-box:hover {
            span {
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 9;
              text-align: center;
              line-height: 79px;
              font-size: 20px;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              letter-spacing: 2px;
              background: rgba(0, 0, 0, 0.31);
              border-radius: 50%;
            }
          }
        }
        .el-button {
          position: absolute;
          right: 25px;
          bottom: 58px;
          // margin-left: 456px;
          // margin-top: 88px;
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
        }
      }
    }
    .npassword {
      width: 1030px;
      float: left;
      .first {
        float: left;
        margin-left: 37px;
        margin-top: 42px;

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
          position: absolute;
          left: 319px;
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
        }
      }
    }
    .cpassword {
      width: 1030px;
      float: left;
      position: relative;

      .first {
        float: left;
        margin-left: 37px;
        margin-top: 42px;
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
        .q1 {
          position: absolute;
          top: 1px;
          right: -15px;
          display: block;
          cursor: pointer;
          height: 38px;
          width: 100px;
          line-height: 40px;
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(254, 120, 101, 1);
          background-color: #fff;
        }
        .el-button {
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
          position: absolute;
          left: 150px;
          top: 354px;
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
        }
      }
    }
    .Relation {
      width: 1030px;
      float: left;
      .first {
        float: left;
        margin-left: 37px;
        margin-top: 51px;
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
          // float: left;
          margin-top: 75px;
          position: relative;

          .s1 {
            margin-left: 14px;
          }
          .s2 {
            position: absolute;
            left: 116px;
            top: 9px;
            display: block;
            width: 100px;
            margin-left: 48px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .o1 {
            position: absolute;
            left: 300px;
            width: 120px;
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
          }
          .o2 {
            position: absolute;
            left: 300px;
            width: 120px;
            height: 36px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 1);
            border-radius: 18px;
            opacity: 0.4;
            border: 1px solid rgba(254, 120, 101, 1);
            font-size: 16px;
            font-family: PingFangSC;
            font-weight: 500;
            color: rgba(254, 120, 101, 1);
            line-height: 12px;
          }
        }
        .zfb {
          margin-top: 14px;
          position: relative;
          .s1 {
            margin-left: 14px;
          }
          .s2 {
            position: absolute;
            left: 116px;
            top: 9px;
            display: block;
            width: 100px;
            margin-left: 48px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .o1 {
            position: absolute;
            left: 300px;
            width: 120px;
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
          }
          .o2 {
            position: absolute;
            left: 300px;
            width: 120px;
            height: 36px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 1);
            border-radius: 18px;
            opacity: 0.4;
            border: 1px solid rgba(254, 120, 101, 1);
            font-size: 16px;
            font-family: PingFangSC;
            font-weight: 500;
            color: rgba(254, 120, 101, 1);
            line-height: 12px;
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
</style>
