/**

* Created by wangxin

* @date 2019/10/10 9:37

*/
<template>
  <div class="title-sket" :style="bgStyle">
    <div class="quest">
      <img class="q-icon" :src="require('../../../assets/creator/editor/q-icon.svg')" alt />
      <div class="title">
        <div class="textarea">
          <pre>{{title||'点击输入选择题标题'}}</pre>
        </div>
        <!-- <ResizeTextarea
          class="textarea"
          type="textarea"
          :autosize="autosize"
          resize="none"
          max="2"
          placeholder="点击输入选择题标题"
          @input="inputFun"
          :value="title"
        />-->
      </div>

      <ul class="options-box clearfix">
        <!-- 'selected':item.select===true?true:false, -->
        <!-- 'isRightBg':isRightBg, -->
        <!-- 'isErrorBg':isErrorBg, -->
        <!-- v-if="isactive==index?isErrorBg:false" -->
        <li
          v-for="(item,index) in answer"
          :key="index"
          :class="{'bg':true,'isRightBg':isactive==index?isRightBg:false,'isErrorBg':isactive==index?isErrorBg:false,'isHasBorder':isactive==index?isErrorBg||isRightBg:false,}"
          @click="answerSelFun(index,item)"
        >
          <div
            class="singleLi"
            :class="{'isRightBg':isactive==index?isRightBg:false,'isErrorBg':isactive==index?isErrorBg:false}"
          >
            <div class="q-con">
              <pre><span class="label">{{name[index]}}</span></pre>
              <div class="options">
                <pre>{{item.answer||'点击输入问题答案'}}</pre>
              </div>
              <img
                class="showIcon"
                v-if="isactive==index?isRightBg:false"
                :src="require('../../../assets/creator/editor/icon-right.svg')"
                alt
              />
              <img
                class="showIcon"
                v-if="isactive==index?isErrorBg:false"
                :src="require('../../../assets/creator/editor/icon-error.svg')"
                alt
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop, Watch } from "vue-property-decorator";
import { changeCouUpdPageContentFun } from "../../../service/editor/editorAction";
import { State, Action, namespace } from "vuex-class";

const EditMod = namespace("edit");
import ResizeTextarea from "../component/resizeTextarea";
import { cloneObj } from "../../../utils/utils";

@Component({
  name: "ShowChoiceQuestionSket",
  components: {
    ResizeTextarea
  }
})
export default class ShowChoiceQuestionSket extends Vue {
  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  @EditMod.State("previewEditList") previewEditList; //编辑文档数据
  @EditMod.Action("previewEditListHandle") previewEditListHandle; //编辑文档数据  action

  // isActiveChoice

  @Prop({
    require: false,
    default: null
  })
  index;

  get ShowIndex() {
    return this.index !== null ? this.index : this.editIndex;
  }

  //选择题标题
  get title() {
    return this.previewEditList[this.ShowIndex].leftSket.title;
  }

  //选择题答案数据
  get answer() {
    return this.previewEditList[this.ShowIndex].leftSket.answer;
  }

  autosize = { minRows: 1, maxRows: 3 };

  //背景计算属性
  get bgStyle() {
    let {
      bgColor, //背景颜色
      bgImg //背景图片
    } = this.previewEditList[this.ShowIndex].rightNav;
    let obj = {};
    if (bgColor && !bgImg) {
      obj = {
        background: bgColor
      };
    } else if (!bgColor && bgImg) {
      obj = {
        "background-image": 'url("' + bgImg.src + '")',
        "background-repeat": "no-repeat",
        "background-position": "center center",
        "background-size": "cover"
      };
    }
    return obj;
  }

  name = ["A", "B", "C", "D"];
  timer = null;
  isRightBg = false;
  isErrorBg = false;
  isactive = -1;

  //答案选择
  answerSelFun(index, item) {
    console.log(index, item);
    this.isactive = index;
    console.log(this.previewEditList);
    let previewEditList = cloneObj(this.previewEditList);
    previewEditList[this.editIndex].memberChoiceList[0] = item;

    this.previewEditListHandle({
      previewEditList
    });
    console.log(this.previewEditList[this.editIndex]);

    if (item.select === true) {
      this.isRightBg = true;
      this.isErrorBg = false;
      console.log(this.isRightBg);
    } else {
      this.isErrorBg = true;
      this.isRightBg = false;
      console.log(this.isErrorBg);
    }
  }

  // //答案选择
  // answerSelFun(index, item) {
  //   console.log(index, item);
  //   let answer = cloneObj(this.answer);
  //   if (answer[index].select) {
  //     return;
  //   }
  //   answer.map(d => {
  //     console.log(d);
  //     d.select = false;
  //   });
  //   answer[index].select = true;
  //   let previewEditList = cloneObj(this.previewEditList);
  //   previewEditList[this.editIndex].leftSket.answer = answer;
  //   this.previewEditListHandle({
  //     previewEditList
  //   });
  //   console.log(this.previewEditList[this.editIndex]);
  //   // this.callInter(previewEditList);
  // }

  // //处理数据调用接口
  // callInter(previewEditList) {
  //   console.log(previewEditList);
  //   let data = previewEditList[this.editIndex];
  //   let courseQuizQuestion = data.courseQuizQuestion;
  //   courseQuizQuestion.courseQuizChoicesList = [];
  //   previewEditList[this.editIndex].leftSket.answer.map(item => {
  //     courseQuizQuestion.courseQuizChoicesList.push({
  //       ...item,
  //       choice: item.answer,
  //       correctFlag: item.select
  //     });
  //   });
  //   changeCouUpdPageContentFun({
  //     courseId: this.$route.query.courseId, //课程id
  //     pageId: data.pageId, //页id
  //     pageContentRelId: data.pageContentRelId, //关联id  查询时返回的
  //     courseQuizQuestion: courseQuizQuestion
  //   });
  // }

  created() {}
}
</script>

<style lang="scss" scoped>
@mixin bg($url) {
  background: url($url) no-repeat;
  background-size: 100% auto;
}

@mixin bgW($url) {
  background: url($url) 100% 100% no-repeat;
  background-size: 49px 53px;
}

.q-icon {
  position: absolute;
  top: 22px;
  left: 44px;
  width: 57px;
  height: 66px;
}

.title-sket {
  position: relative;
  // padding: 64px;
  width: 100%;
  height: 100%;
}
.quest {
  // position: relative;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 44px;
  padding-top: 26px;
  width: 868px;
  height: 442px;
  margin: auto;
  background: #fff;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.title {
  padding-top: 35px;
  height: 95px;
  display: flex;
  align-items: flex-end;
}
.textarea {
  width: 100%;
  // height: 95px;
  overflow: hidden;
  font-size: 18px;
  color: #666;
  border: none;
  // border-bottom: 1px dashed #ccc;
  background: none;
  padding: 35px 15px;
}
.textarea /deep/ {
  textarea {
    overflow: hidden;
    height: 60px;
    font-size: 18px;
    color: #666;
    border: none;
    // border-bottom: 1px dashed #ccc;
    background: none;
    padding-top: 16px;
    padding-bottom: 16px;
  }
  textarea::placeholder {
    font-size: 18px;
    color: #999;
  }
}

.options-box {
  margin-top: 26px;
  li {
    float: left;
    width: calc(50% - 13px);
    border-radius: 8px;
    border: 1px solid rgba(245, 245, 245, 1);

    cursor: pointer;
    height: 94px;
    position: relative;
  }
  .singleLi {
    width: 100%;
    height: 100%;
    padding: 6px;
    padding-right: 13px;
  }
  .showIcon {
    position: absolute;
    top: 20px;
    right: -3px;
    width: 40px;
    height: 40px;
  }
  li:hover {
    border: 1px solid rgba(254, 120, 101, 0.2);
  }
  li:nth-child(2n + 1) {
    margin-right: 26px;
  }
  li:nth-child(n + 3) {
    margin-top: 20px;
  }
  .isErrorBg {
    background-color: rgba(254, 120, 101, 0.1);
    border-radius: 8px;
    // border: 1px solid rgba(254, 120, 101, 0.1);
    pre {
      color: rgba(254, 120, 101, 1);
    }
    span {
      color: rgba(254, 120, 101, 1);
    }
  }
  .isRightBg {
    background-color: rgba(36, 204, 184, 0.1);
    border-radius: 8px;
    // border: 1px solid rgba(36, 204, 184, 0.1);
    pre {
      color: rgba(36, 204, 184, 1);
    }
    span {
      color: rgba(36, 204, 184, 1);
    }
  }
  .isHasBorder {
    border: 1px solid transparent;
  }
  .add {
    text-align: center;
    font-size: 16px;
    color: #b3b3b3;
    img {
      width: 34px;
      height: 34px;
      margin-top: 18px;
      margin-bottom: 12px;
    }
  }
  .q-con {
    padding-left: 28px;
    position: relative;
    padding-top: 30px;
  }
  .label {
    position: absolute;
    top: -7px;
    left: 0;
    height: 94px;
    line-height: 94px;
    width: 28px;
    text-align: center;
    font-size: 16px;
    font-family: AlibabaPuHuiTiB;
    color: rgba(102, 102, 102, 1);
  }
}
.q-con {
  height: 66px;
}
.options {
  display: flex;
  align-items: center;
  overflow: hidden;
  // height: 67px;
  line-height: 22px;
  font-size: 14px;
  color: #666;
  font-weight: 400;
  border: none;
  // border-bottom: 1px dashed #ccc;
  background: none;
  padding: 0;
}
.options /deep/ {
  textarea {
    overflow: hidden;
    height: 67px;
    line-height: 22px;
    font-size: 14px;
    color: #666;
    font-weight: 400;
    border: none;
    border-bottom: 1px dashed #ccc;
    background: none;
    padding: 0;
  }
  textarea::placeholder {
    font-size: 14px;
    color: #999;
  }
}
.bg:nth-child(1) {
  @include bgW("../../../assets/creator/editor/A.svg");
}
.bg:nth-child(2) {
  @include bgW("../../../assets/creator/editor/B.svg");
}
.bg:nth-child(3) {
  @include bgW("../../../assets/creator/editor/C.svg");
}
.bg:nth-child(4) {
  @include bgW("../../../assets/creator/editor/D.svg");
}
</style>

