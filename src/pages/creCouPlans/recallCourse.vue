/**

* Created by wangxin

* @date 2019/8/12 17:48

*/
<template>
  <div class="add">
    成员删除成功。
    <span id="groupRecall" @click="recall">[撤回]</span>
  </div>
</template>

<script>
import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator";
import { State, Action, namespace } from "vuex-class";
import { cloneObj, tokenFun, tipsFail } from "../../utils/utils";

const CreCouPlaStore = namespace("creCouPlans");
@Component({
  name: "recallCourse",
  components: {}
})
export default class RecallCourse extends Vue {
  @CreCouPlaStore.State("templateList") templateList; //当前选择的群组 默认第一个群组
  @CreCouPlaStore.Action("templateListHandle") templateListHandle; //当前选择的群组

  @CreCouPlaStore.State("delCourse") delCourse; //被删除的--课程
  @CreCouPlaStore.Action("delCourseHandle") delCourseHandle; //被删除的--课程  action修改方法

  timer = null; //定时器方法
  count = 6; //定时器计时

  //监听 delStuId 变化
  @Watch("delCourse", { immediate: true, deep: true }) testFun() {
    console.log("监听方法实现");
    clearInterval(this.timer);
    this.count = 6;
    console.log(this.delCourse);
    if (this.delCourse.index === "" || this.delCourse.index === undefined) {
      return;
    }
    this.timer = setInterval(this.setTime, 1000);
  }

  //定时器方法
  @Emit setTime() {
    console.log(this.count);
    if (this.count > 0) {
      this.count--;
    } else {
      this.delCourseHandle({
        show: false,
        index: "", //下标
        data: {} //被删除的数据
      }); //已删除课程--信息
      clearInterval(this.timer);
      this.count = 0;
    }
  }

  @Emit recall() {
    let delCourse = cloneObj(this.delCourse);
    let templateList = cloneObj(this.templateList);
    console.log(delCourse);
    console.log(templateList);
    if (delCourse.data.level === "chapter") {
      //表示删除的是一个章节
      if (templateList[delCourse.index].temType === "old") {
        templateList[delCourse.index].delFlag = null; //表示原有的 不变
      } else {
        templateList.splice(delCourse.index, 0, cloneObj(delCourse.data));
      }
      this.templateListHandle({
        templateList: templateList
      });
    } else {
      //表示删除的是章节内的一个小节
      templateList[delCourse.temIndex].chapter.splice(
        delCourse.index,
        0,
        cloneObj(delCourse.data)
      );
      this.templateListHandle({
        templateList: templateList
      });
    }
    this.delCourseHandle({
      show: false,
      index: "", //下标
      data: {} //被删除的数据
    });
  }

  destoryed() {
    clearInterval(this.timer);
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}

.add {
  position: fixed;
  top: 100px;
  left: calc(50% - 60px);
  width: 137px;
  height: 23px;
  text-align: center;
  line-height: 23px;
  background: rgba(51, 51, 51, 0.44);
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
}
</style>
