<template>
  <div>
    <el-container>
      <div class="card">
        <div class="logo">
          <img src="../../assets/studentIMG/logo.png" alt />
        </div>
        <div class="infomsg">
          <p v-show="inviterRole ===2">
            Hi 同学你好，
            <span style="color:#FE7865;font-size:18px;" v-text="inviterName"></span>邀请你参加
            <span style="color:#FE7865;font-size:18px;" v-text="ownerName"></span>老师的
            <span style="color:#FE7865;font-size:18px;" v-text="groupName"></span>
          </p>
          <p v-show="inviterRole ===1">
            Hi 同学你好，
            <span style="color:#FE7865;font-size:18px;" v-text="inviterName"></span>老师邀请你加入
            <span style="color:#FE7865;font-size:18px;" v-text="groupName"></span>
          </p>
        </div>
        <div class="button" @click="addGroup">加入群</div>
        <div class="boxInfo">注：如果您是老师身份，则不可加入其他老师群噢</div>
        <div class="imgInner">
          <img src="../../assets/studentIMG/cin.png" alt />
        </div>
      </div>
      <!-- info -->
      <div class="info" v-show="showInfo">
        <img src="../../assets/studentIMG/icon-warn.png" alt />
        <span>很抱歉，由于您是专业老师身份不可以加入其他老师群</span>
      </div>
      <div class="info-luyou">
        <span style="color:#FE7865;font-size:12px;">陆由</span>-致力于持续提升教育的效率
      </div>
      <p class="rightsReserved">© 2019 上海积途信息科技有限公司. All Rights Reserved.</p>
      <p class="infoBottom">cloud.luyouor.com</p>
      <div class="imgLeft">
        <img src="../../assets/studentIMG/cl.png" alt />
      </div>
      <div class="imgBotton">
        <img src="../../assets/studentIMG/cb.png" alt />
      </div>
      <div class="imgRight">
        <img src="../../assets/studentIMG/cr.png" alt />
      </div>
    </el-container>
  </div>
</template>

<script>
import { getUrlParams, tipsFail } from "../../utils/utils";
import { getGroStaTeaDetail } from "../../service/teachersApi";
import {
  groJoinInvitationGroup,
  groQueryInvitationGroup,
  memberidentifyRoleType
} from "../../service/groupApi";
import { close, closeSync } from "fs";
import {
  clearTimeout,
  clearInterval,
  clearImmediate,
  setTimeout
} from "timers";

export default {
  data() {
    return {
      stuInvitation: false,
      teaInvitation: true,
      groupName: "",
      groupId: 0,
      inviterName: "",
      inviterRole: -1, //老师1；学生2
      ownerName: "", //邀请老师信息
      showInfo: false,
      identifiedRoleType: -1, //被邀请人类型
      approveJoinFlag: true, //是否需要审批
      yqCode: "", //邀请码
      yqPerson: "" // 邀请人id
    };
  },
  async created() {
    // 邀请码
    const yqCode = getUrlParams("invitationCode");
    // 邀请人id
    const yqPerson = getUrlParams("inviterId");
    console.log(yqCode);
    console.log(yqPerson);
    this.yqCode = yqCode;
    this.yqPerson = yqPerson;
    // 获取群信息
    const res = await groQueryInvitationGroup({
      invitationCode: yqCode,
      inviterId: yqPerson
    });
    console.log(res);
    const { code, data } = res;
    // console.log(code, data);
    if (code === 0) {
      this.groupId = data.groupId;
      this.groupName = data.groupName;
      this.inviterName = data.inviterName;
      this.ownerName = data.ownerName;
      this.inviterRole = data.inviterRole;
      this.approveJoinFlag = data.approveJoinFlag;
      if (!getUrlParams("groupId"))
        window.location.href =
          window.location.href + "&groupId=" + this.groupId;
    } else {
      tipsFail(res.msg);
    }
  },
  methods: {
    async addGroup() {
      const result = await memberidentifyRoleType();
      console.log(result);
      if (result.code === 0) {
        this.identifiedRoleType = result.identifiedRoleType;
        if (this.identifiedRoleType === 0) {
          this.$router.push(
            "/student/studentAttestation?invitationCode=" +
              this.yqCode +
              "&inviterId=" +
              this.yqPerson
          );
        } else if (this.identifiedRoleType === 1) {
          // 显示三秒
          this.showInfo = true;
          setTimeout(() => {
            this.showInfo = false;
          }, 3000);
        } else {
          const res = await groJoinInvitationGroup({ groupId: this.groupId });
          console.log(res);
          if (res.code === 0) {
            this.approveJoinFlag === false
              ? this.$router.push("/student/studentList")
              : this.$message.success("入群申请提交成功") &&
                this.$router.push("/StudentMain");
          } else if (res.code === 614) {
            tipsFail(res.msg);
            setTimeout(() => {
              this.$router.push("/student/studentList");
            }, 2000);
          } else {
            if (res.code !== 401) tipsFail(res.msg);
          }
        }
      }
    }
  }
};
</script>>

<style lang="scss">
.el-container {
  width: 1440px;
  margin: 0 auto;
  position: relative;
  .card {
    width: 465px;
    height: 338px;
    margin-top: 201px;
    margin-left: 487px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 5px 0px rgba(84, 40, 33, 0.12);
    border-radius: 24px;
    position: relative;
    .logo {
      position: absolute;
      left: 50%;
      top: 50px;
      transform: translateX(-50%);
    }
    .infomsg {
      width: 364px;
      height: 40px;
      position: absolute;
      left: 50%;
      top: 130px;
      transform: translateX(-50%);
      font-size: 18px;
      text-align: center;
      color: #333333;
      font-family: PingFangSC-Regular;
    }
    .button {
      position: absolute;
      left: 50%;
      top: 210px;
      transform: translateX(-50%);
      width: 200px;
      height: 36px;
      line-height: 36px;
      cursor: pointer;
      background: linear-gradient(
        90deg,
        rgba(255, 176, 158, 1) 0%,
        rgba(254, 120, 101, 1) 100%
      );
      border-radius: 18px;
      text-align: center;
      color: #ffffff;
      font-family: PingFangSC-Regular;
      font-size: 16px;
    }
    .boxInfo {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 280px;
      transform: translateX(-50%);
      font-family: PingFangSC-Regular;
      color: #b3b3b3;
      font-size: 12px;
      text-align: center;
    }
    .imgInner {
      position: absolute;
      right: -30px;
      bottom: -30px;
      width: 67px;
      height: 68px;
      img {
        width: 67px;
        height: 68px;
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .info {
    position: absolute;
    width: 407px;
    height: 40px;
    line-height: 40px;
    top: 590px;
    left: 517px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px 0px rgba(84, 40, 33, 0.12);
    border-radius: 4px;
    img {
      position: absolute;
      top: 13px;
      left: 16px;
    }
    span {
      padding-left: 38px;
      font-size: 12px;
      color: #000000;
    }
  }
  .info-luyou {
    position: absolute;
    font-size: 12px;
    top: 650px;
    left: 50%;
    transform: translateX(-50%);
  }
  .infoBottom {
    font-size: 12px;
    font-family: PingFangSC;
    font-weight: 400;
    color: #999999;
    position: absolute;
    top: 720px;
    left: 50%;
    font-size: 12px;
    transform: translateX(-50%);
  }
  .rightsReserved {
    font-size: 12px;
    font-family: PingFangSC;
    font-weight: 400;
    color: #b3b3b3;
    line-height: 17px;
    position: absolute;
    top: 698px;
    left: 554px;
  }
  .imgRight {
    position: absolute;
    left: 1100px;
    top: 389px;
    width: 200px;
    height: 200px;
    img {
      width: 170px;
      height: 170px;
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .imgBotton {
    position: fixed;
    left: 147px;
    bottom: -50px;
    width: 218px;
    height: 217px;
    img {
      width: 158px;
      height: 137px;
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .imgLeft {
    position: fixed;
    left: -66px;
    top: 100px;
    width: 218px;
    height: 217px;
    img {
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
