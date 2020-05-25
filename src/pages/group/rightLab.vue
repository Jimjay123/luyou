/**

* Created by wangxin

* @date 2019/8/5 16:09

*/
<template>
  <div class="right">
    <div class="user-box">
      <div @click="invitedMembers">
        <i class="add"></i>
        <span>邀请成员</span>
      </div>
      <div class="tips" v-show="show">
        <h3>邀请群成员</h3>
        <p>
          该群还暂无成员噢
          <br />快去邀请他们吧
        </p>
        <div>
          <span @click="getInfo">知道了</span>
        </div>
        <span class="horn"></span>
      </div>
    </div>
    <div class="group-box" @click="groupSet">
      <i class="set"></i>
      <span>群设置</span>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import { common } from "../../utils/utils";
import { groMemGroMemList } from "../../service/groupApi";
@Component({
  name: "rightLab",
  components: {}
})
export default class RightLab extends Vue {
  show = true;
  async created() {
    const res = await common();
    // console.log(res);
    this.show = res ? true : false;
    // console.log(this.show);
    const hastoken = sessionStorage.getItem("commit2_token");
    if (hastoken) {
      this.show = false;
    }
    let groupId = this.$route.query.groupId;
    groMemGroMemList({ groupId: groupId }).then(res => {
      if (res.code == "0") {
        let list = res.list;
        if (list == "") {
          this.show = true;
        } else {
          this.show = false;
        }
      } else {
        tipsFail(res.msg);
      }
    });
  }

  list = [];

  @Emit getInfo() {
    sessionStorage.setItem("commit2_token", "hastoken2");
    const hastoken = sessionStorage.getItem("commit2_token");
    this.show = false;
  }

  //邀请群成员点击事件
  @Emit invitedMembers() {
    this.$router.push({
      path: "/group/list/invite"
    });
  }

  //群设置点击事件
  @Emit groupSet() {
    this.$router.push({
      path: "/group/list/info"
    });
  }
}
</script>

<style lang="scss" scoped>
@mixin bgm($url) {
  background: url($url) no-repeat;
  background-size: 100% auto;
}
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}

.right {
  float: right;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  i {
    display: inline-block;
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }
  .user-box {
    position: relative;
    display: inline-block;
    margin-right: 16px;
    .add {
      @include bgm("../../assets/group/icon-user.svg");
    }
  }
  .set {
    @include bgm("../../assets/group/icon-set.svg");
  }
}

.tips {
  padding: 16px;
  width: 218px;
  text-align: left;
  position: absolute;
  left: -45px;
  top: 42px;
  background: #fff;
  z-index: 10;
  box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
  border-radius: 10px;
  h3 {
    @include fontSet(18px, #333, 500);
  }
  p {
    @include fontSet(14px, #999, 400);
    line-height: 24px;
  }
  div {
    text-align: right;
    span {
      @include fontSet(14px, #fe7865, 400);
      cursor: pointer;
    }
  }
  .horn {
    position: absolute;
    top: -8px;
    left: 100px;
    width: 15px;
    height: 15px;
    background: #fff;
    transform: rotate(45deg);
    box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
  }
}
.group-box {
  display: inline-block;
}
</style>
