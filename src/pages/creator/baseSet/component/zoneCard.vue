<template>
  <div class="zoneCard" @mouseover="()=>hover=true" @mouseout="()=>hover=false">
    <article class="title">
      分数区间
      <span>{{data.levelMinRef||0}}</span>~
      <span>{{data.levelMaxRef||''}}</span>
      <div class="delete" v-show="len>3&&hover" @click="delFun">删除</div>
    </article>
    <p>解释语</p>
    <!--<el-input type="textarea" resize="none" rows="4" v-model="data.content"></el-input>-->
    <TextareaBox
      style="width:958px;height:98px;font-size: 14px"
      :maxLength="300"
      :limit="true"
      :placeHolder="'请输入你的解释语'"
      :value="data.feedback"
      :input="(e)=>inputChange(e,'input')"
    />
  </div>
</template>
<script>
import { Component, Emit, Vue, Prop } from "vue-property-decorator";
import TextareaBox from "../../../teachers/textareaBox";
import { State, Action, namespace } from "vuex-class";
const CreCouInfoMod = namespace("creatorCourseInfo");

@Component({
  name: "zoneCard",
  components: {
    TextareaBox
  }
})
export default class ZoneCard extends Vue {
  @CreCouInfoMod.State("feedbackList") feedbackList; //祝贺消息
  @CreCouInfoMod.Action("feedbackListHandle") feedbackListHandle; //祝贺消息  action修改方法

  @Prop() index;
  @Prop() data;
  @Prop() len;
  @Prop({
    default: null,
    required: false
  })
  callBack;
  welcome = "";
  hover = false;
  courseId = 0;

  delFun() {
    this.callBackFun(this.index, "del");
  }

  inputChange(e) {
    //方法1：
    let data = this.data;
    data.feedback = e.target.value;

    //方法2：
    // let data = {};
    // data.feedback = e.target.value;
    // this.feedbackListHandle({ feedbackList: data });

    this.callBackFun("input", data);
  }

  callBackFun(type, val) {
    if (typeof this.callBack === "function") {
      this.callBack(this.index, type, val);
    }
  }
}
</script>
<style lang="scss" scoped>
.zoneCard {
  margin: 20px 0;
  .title {
    color: rgba(0, 0, 0, 0.85);
    width: 100%;
    font-size: 14px;
    span {
      margin: 0 8px;
    }
    .scoreRange {
      width: 60px;
      margin: 0 8px;
    }
    .delete {
      float: right;
      color: #fe7865;
      cursor: pointer;
    }
  }
  p {
    margin: 15px 0 10px 0;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>


