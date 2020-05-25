/**

* Created by wangxin

* @date 2019/8/5 14:43

*/
<template>
  <div class="card-item clearfix" @click="addFun">
    <img :src="require('../../assets/group/add.png')" alt class="card-item1" />
    <div class="title">创建课程计划</div>
    <div class="add-tips" v-show="show">
      <h3>创建课程计划</h3>
      <p>
        该群还暂无课程计划噢
        <br />快去创建一个课程计划吧
      </p>
      <div>
        <span @click.stop="getInfo">知道了</span>
      </div>
      <span class="horn"></span>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import { common } from "../../utils/utils";
@Component({
  name: "addCard",
  components: {}
})
export default class AddCard extends Vue {
  show = true;
  async created() {
    const res = await common("commit_token");
    console.log(res);
    this.show = res ? true : false;
    console.log(this.show);
    const hastoken = sessionStorage.getItem("commit1_token");
    if (hastoken) {
      this.show = false;
    }
  }
  @Emit getInfo() {
    sessionStorage.setItem("commit1_token", "hastoken1");
    const hastoken = sessionStorage.getItem("commit1_token");
    console.log(hastoken);
    console.log(hastoken);
    this.show = false;
  }

  @Emit addFun() {
    this.$router.push({
      path: "/Establish"
    });
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}
.card-item {
  width: 224px;
  float: left;
  text-align: center;
  border: 1px dashed rgba(102, 102, 102, 0.5);
  border-radius: 10px;
  margin-right: 22px;
  position: relative;
  img {
    width: 81px;
    height: 79px;
    margin-top: 44px;
    margin-bottom: 22px;
  }
  .title {
    font-size: 22px;
    font-weight: 500;
    color: rgba(153, 153, 153, 0.4);
    margin-bottom: 48px;
  }
  /deep/ .add-tips {
    padding: 16px;
    width: 250px;
    text-align: left;
    position: absolute;
    top: 48px;
    right: -266px;
    background: #fff;
    z-index: 10;
    box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
    border-radius: 10px;
    h3 {
      @include fontSet(18px, #333, 500);
    }
    p {
      @include fontSet(14px, #999, 400);
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
      top: 55px;
      left: -8px;
      width: 15px;
      height: 15px;
      background: #fff;
      transform: rotate(45deg);
      box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
    }
  }
}
</style>
