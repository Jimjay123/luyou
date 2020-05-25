/**

* Created by wangxin

* @date 2019/8/12 17:48

*/
<template>
  <div class="add">
    课程删除成功。
    <span id="groupRecall" @click="recall" v-if="show">[撤回]</span>
  </div>
</template>

<script>
import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator";
import { State, Action, namespace } from "vuex-class";
import { cloneObj, tokenFun, tipsFail } from "../../utils/utils";
import { updateCourseChannel } from "../../service/teachersApi";
// updateCourseChannel

const CreCouPlaStore = namespace("creCouPlans"); //原 已改
const creatorStore = namespace("creator"); //现 已改
@Component({
  name: "recallCourse",
  components: {}
})
export default class RecallCourse extends Vue {
  @CreCouPlaStore.State("templateList") templateList; //当前选择的群组 默认第一个群组
  @CreCouPlaStore.Action("templateListHandle") templateListHandle; //当前选择的群组

  @CreCouPlaStore.State("delCourse") delCourse; //被删除的--课程
  @CreCouPlaStore.Action("delCourseHandle") delCourseHandle; //被删除的--课程  action修改方法

  // creator vuex
  @creatorStore.State("creatorClassList") creatorClassList; //新建竖版列表
  @creatorStore.Action("creatorClassListHandle") creatorClassListHandle; //新建竖版列表  action修改方法

  @creatorStore.State("creatorDelCourse") creatorDelCourse; //被删除的--课程
  @creatorStore.Action("creatorDelCourseHandle") creatorDelCourseHandle; //被删除的--课程  action修改方法

  @Prop({
    required: false
  })
  show; //当前数据的下标

  timer = null; //定时器方法
  count = 6; //定时器计时

  //监听 delStuId 变化
  @Watch("creatorDelCourse", { immediate: true, deep: true }) testFun() {
    // console.log("监听方法实现");
    clearInterval(this.timer);
    this.count = 3;
    // console.log(this.creatorDelCourse);
    // console.log(this.creatorClassList);
    if (
      this.creatorDelCourse.index === "" ||
      this.creatorDelCourse.index === undefined
    ) {
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
      this.creatorDelCourseHandle({
        show: false,
        index: "", //下标
        data: {} //被删除的数据
      }); //已删除课程--信息
      clearInterval(this.timer);
      this.count = 0;
    }
  }

  @Emit recall() {
    // console.log("撤回");
    let creatorDelCourse = cloneObj(this.creatorDelCourse);
    let creatorClassList = cloneObj(this.creatorClassList);

    // creatorClassList[creatorDelCourse.temIndex].courseList.splice(
    //   creatorDelCourse.index,
    //   0,
    //   cloneObj(creatorDelCourse.data)
    // );
    // this.creatorClassListHandle({
    //   creatorClassList: creatorClassList
    // });
    // this.creatorDelCourseHandle({
    //   show: false,
    //   index: "", //下标
    //   data: {} //被删除的数据
    // });
    if (creatorDelCourse.type === "tem") {
      //删除章节
      //表示删除的是一个章节
      // if (creatorClassList[creatorDelCourse.index].temType === "old") {
      //   creatorClassList[creatorDelCourse.index].delFlag = null; //表示原有的 不变
      // } else {
      creatorClassList.splice(
        creatorDelCourse.index,
        0,
        cloneObj(creatorDelCourse.data)
      );
      // }
      this.creatorClassListHandle({
        creatorClassList: creatorClassList
      });
    } else {
      //表示删除的是章节内的一个小节
      // console.log(creatorDelCourse.index);
      // let data = creatorClassList[creatorDelCourse.temIndex];
      // if (data.courseList === []) {
      //   data = {
      //     courseList: cloneObj(creatorDelCourse.data)
      //   };
      //   // data.courseList.push(cloneObj(creatorDelCourse.data));
      //   this.creatorClassListHandle({
      //     creatorClassList: data
      //   });
      // } else {
      creatorClassList[creatorDelCourse.temIndex].courseList.splice(
        creatorDelCourse.index,
        0,
        cloneObj(creatorDelCourse.data)
      );
      this.creatorClassListHandle({
        creatorClassList: creatorClassList
      });
      // }
    }
    this.creatorDelCourseHandle({
      show: false,
      index: "", //下标
      data: {} //被删除的数据
    }); //已删除课程--信息
  }

  destoryed() {
    clearInterval(this.timer);
  }
  created() {
    // console.log(this.creatorDelCourse);
    // console.log(this.show);
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
  top: 75px;
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
