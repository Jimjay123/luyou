/**

* Created by wangxin

* @date 2019/9/5 13:29

*/
<template>
  <div class="course-item">
    <div class="img-box">
      <span class="channel" v-if="options.keyType===2">频道</span>
      <img :src="options.popularizeImageUrl" alt />
      <div class="type-info clearfix">
        <span class="remark">{{courseType}}</span>
        <div class="time">
          <i class="icon-time"></i>
          <span>{{duration || 120}}分钟</span>
        </div>
      </div>
      <div class="bg">
        <div class="preview icon-item" @click="previewFun">
          <div class="tips"  @click="previewFun">
            预览
            <i class="icon-triangle"></i>
          </div>
        </div>
        <div class="copy icon-item" @click="moreFun">
          <div class="tips">
            更多
            <i class="icon-triangle"></i>
          </div>
        </div>
        <!-- <div class="bg-edit" @click="editFun"></div> -->
        <div v-if="options.courseType===2" class="bg-edit" @click="editFun"></div>
      </div>
      <ul class="drop-down" v-show="dropDown" v-Clickoutside="outClick" v-if="options.state===0">
        <li>
          <img :src="require('../../assets/creator/icon-set.svg')" class="mr" />
          <span>课程设置</span>
        </li>
        <li>
          <img :src="require('../../assets/creator/icon-c.svg')" class="mr" />
          <span>复制</span>
        </li>
        <li @click="editName">
          <img :src="require('../../assets/creator/icon-rename.svg')" class="mr" />
          <span>重命名</span>
        </li>
        <li @click="delCourse(keyId,'del')">
          <img :src="require('../../assets/creator/icon-d.svg')" class="mr" />
          <span>删除</span>
        </li>
      </ul>
      <ul
        class="drop-down"
        v-show="dropDown"
        v-Clickoutside="outClick"
        v-else-if="options.state===1 || options.state===2 || options.state===3"
      >
        <li>
          <img :src="require('../../assets/creator/icon-c.svg')" class="mr" />
          <span>复制</span>
        </li>
        <li @click="delCourse(keyId,'del')">
          <img :src="require('../../assets/creator/icon-d.svg')" class="mr" />
          <span>删除</span>
        </li>
      </ul>
    </div>
    <div class="c-info">
      <!-- <el-input type="text" @keyup.enter.native="editEndName" v-model="keyName" /> -->
      <!-- <p v-if="!isEdit" @click="editName">
        {{keyName || '孤独的蝙蝠侠：酒精成瘾与哀伤辅导的个案治疗'}}
        <i class="icon-edit"></i>
      </p>
      <p v-else>
        <textarea v-Clickoutside="textareaOutClick" @keyup.enter="editEndName"></textarea>
      </p>-->
      <p v-if="options.state===0&&isEdit">
        <textarea maxlength="24" v-Clickoutside="textareaOutClick" v-model="options.keyName"></textarea>
      </p>
      <p v-else-if="options.state===0&&!isEdit" @click="editName">
        {{options.keyName}}
        <i class="icon-edit"></i>
      </p>
      <p v-else @click="editName">{{options.keyName}}</p>

      <div class="c-bottom clearfix">
        <span class="l-time">{{timeShow}}</span>
        <!-- wx版本 -->
        <!-- <span class="l-time">{{options.modifyDatetimeInterval}}</span> -->
        <!-- 版本end -->

        <div class="r-edit" v-if="options.state===0">
          <i class="icon-edit"></i>
          <span>编辑中</span>
        </div>
        <div class="r-edit r-examine" v-else-if="options.state===1">
          <i class="icon-edit"></i>
          <span>审核中</span>
        </div>
        <div class="r-edit r-issue" v-else-if="options.state===3">
          <i class="icon-edit"></i>
          <span>已发布</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { ownCourseAndChannelList } from "../../service/creatorApi";
@Component({
  name: "CourseItem",
  directives: {
    Clickoutside
  }
})
export default class CourseItem extends Vue {
  @Prop({
    required: false,
    default: () => {
      return {
        src: require("../../assets/creator/default.png")
      };
    }
  })
  options;

  // @Prop({
  //   required: false,
  //   default: () => {
  //     return {
  //       list: list
  //     };
  //   }
  // })
  // list;

  @Prop({
    required: false,
    default: null
  })
  callBack;

  @Prop({
    default: null
  })
  cbFun;

  dropDown = false;
  isEdit = false;

  // courseType = 0; //四种课程类型
  // delFlag = false; //是否删除
  // duration = 120; //课程时间
  // keyId = 0; //课程id
  // keyName = ""; //课程名称
  // keyType = 1; //判断标准课/课程频道
  // modifyDatetime = ""; //修改时间
  // ownerId = 0;
  // state = 0; //课程状态（编辑/审批/已发布）
  // timeShow; //显示时间

  //下拉选择--点击区域以外位置关闭
  @Emit outClick() {
    this.dropDown = false;
  }

  //课程类型
  get courseType() {
    let courseType = this.courseType;
    if (courseType === 1) {
      return "TPE课程";
    } else if (courseType === 2) {
      return "NPE课程";
    } else if (courseType === 3) {
      return "沙盘课程";
    }
  }

  //预览点击事件
  @Emit previewFun() {}

  //更多点击事件
  @Emit moreFun() {
    console.log(1111);
    this.dropDown = true;
  }

  //编辑点击事件
  @Emit editFun() {
    this.$router.push({
      path: "/classInfoBase",
      query: {}
    });
  }

  //编辑名称
  @Emit editName() {
    this.dropDown = false;
    this.isEdit = true;
  }

  //
  //编辑名称
  @Emit editEndName(e) {
    console.log(e.target.value);
    this.isEdit = false;
    this.keyName = e.target.value;
    //调用修改接口
    //
  }
  // 删除课程
  @Emit delCourse(id, type) {
    this.dropDown = false;
    console.log("删除课程");
    console.log(id);
    this.cbFun(id);
    this.cbFunction("del");
  }

  //textarea 以外区域点击触发
  @Emit textareaOutClick() {
    this.isEdit = false;
    this.cbFunction("edit");
  }

  //回调方法
  @Emit cbFunction(type) {
    if (typeof this.callBack === "function") {
      this.callBack(type, this.options);
    }
  }

  @Emit computedTimeFun() {
    let dataTime = Date.parse(new Date(this.modifyDatetime));
    let nowDateTime = +new Date();
    let timeDiff = nowDateTime - dataTime;
    // console.log(timeDiff); //时间差
    let everyMin = 1000 * 60;
    let everyHour = everyMin * 60;
    let everyDay = everyHour * 24;
    let threeDays = everyDay * 3;

    if (timeDiff <= everyHour) {
      //获取分钟
      this.timeShow = parseInt(timeDiff / 60000) + "分钟前";
    } else if (timeDiff <= everyDay) {
      // 获取小时
      this.timeShow = parseInt(timeDiff / everyHour) + "小时前";
    } else if (timeDiff <= threeDays) {
      let time = new Date(dataTime);
      let M =
        (time.getMonth() + 1 < 10
          ? "0" + (time.getMonth() + 1)
          : time.getMonth() + 1) + "-";
      let D = time.getDate() + " ";
      this.timeShow = M + D;
    } else {
      this.timeShow = this.modifyDatetime.slice(0, 10);
      // console.log(this.timeShow);
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}

@mixin bg($url) {
  background: url($url) no-repeat;
  background-size: 100% auto;
}

.course-item {
  float: left;
  //margin-right: 36px;
  border-radius: 10px;
  width: 250px;
  height: 208px;
  font-size: 14px;
  font-weight: 400;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
  margin: 0 18px 31px 18px;
  .img-box {
    width: 100%;
    height: 131px;
    position: relative;
    .channel {
      position: absolute;
      top: 0;
      left: 0;
      width: 42px;
      height: 24px;
      background: rgba(254, 120, 101, 1);
      border-radius: 10px 0px 10px 0px;
      @include fontSet(14px, #fff, 500);
      text-align: center;
      line-height: 24px;
    }
    img {
      width: 250px;
      height: 131px;
      border-radius: 10px 10px 0 0;
    }
    .type-info {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 5px 10px;
      @include fontSet(12px, #fff, 400);
      .remark {
        float: left;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
        border: 1px solid rgba(238, 238, 238, 1);
        padding: 0 5px;
      }
      .time {
        float: right;
        font-weight: 600;
        font-size: 14px;
        .icon-time {
          display: inline-block;
          vertical-align: middle;
          width: 18px;
          height: 18px;
          background: url("../../assets/creator/c-time.svg") no-repeat;
          background-size: 100% auto;
          margin-right: 9px;
        }
        span {
          vertical-align: middle;
        }
      }
    }
  }
  .c-info {
    padding: 8px 12px 10px 12px;
    p {
      cursor: pointer;
      position: relative;
      height: 38px;
      @include fontSet(14px, #333, 400);
      overflow: hidden;
      display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示 。
      text-overflow: ellipsis; // 可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 。
      -webkit-box-orient: vertical; // 设置或检索伸缩盒对象的子元素的排列方式 。
      -webkit-line-clamp: 2;
      margin-bottom: 4px;
      .icon-edit {
        display: none;
        width: 16px;
        height: 16px;
        @include bg("../../assets/creator/icon-edit.svg");
        vertical-align: middle;
      }
      &:hover .icon-edit {
        display: inline-block;
      }
      textarea {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      textarea:hover {
        border: 1px solid rgba(254, 120, 101, 0.2);
      }
      textarea:focus {
        border: 1px solid rgba(255, 163, 158, 1);
        background: #fff;
      }
    }
    .c-bottom {
      @include fontSet(12px, #b3b3b3, 400);
      .l-time {
        float: left;
        font-weight: 500;
        margin-top: 3px;
      }
      .r-edit {
        float: right;
        .icon-edit {
          display: inline-block;
          vertical-align: middle;
          width: 14px;
          height: 14px;
          background: url("../../assets/creator/icon-edit.svg") no-repeat;
          background-size: 100% auto;
          // margin-right: 5px;
          margin-top: 4px;
        }
        span {
          vertical-align: middle;
        }
      }
      .r-examine {
        color: #fe7865;
        .icon-edit {
          @include bg("../../assets/creator/icon-examine.svg");
        }
      }
      .r-issue {
        color: #ccc;
        .icon-edit {
          @include bg("../../assets/creator/icon-issue.svg");
        }
      }
    }
  }
  .bg {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: 30;
    border-radius: 10px 10px 0px 0px;
    .icon-item {
      cursor: pointer;
      position: absolute;
      top: 10px;
      left: 10px;
      width: 24px;
      height: 24px;
      background: url("../../assets/creator/icon-preview.svg") no-repeat;
      background-size: 100% auto;
      .tips {
        display: none;
        position: absolute;
        top: -26px;
        left: -8px;
        width: 40px;
        height: 22px;
        text-align: center;
        line-height: 22px;
        border-radius: 3px;
        background: rgba(51, 51, 51, 0.6);
        @include fontSet(12px, #fff, 400);
        .icon-triangle {
          position: absolute;
          bottom: -8px;
          left: 17px;
          border-width: 4px;
          border-style: solid;
          border-color: rgba(51, 51, 51, 0.6) transparent transparent
            transparent;
        }
      }
    }
    .icon-item:hover {
      .tips {
        display: block;
      }
    }
    .preview {
    }
    .copy {
      top: 10px;
      left: auto;
      right: 10px;
      background: url("../../assets/creator/icon-copy.png") no-repeat;
      background-size: 100% auto;
    }
    .bg-edit {
      cursor: pointer;
      position: absolute;
      top: 48px;
      left: 105px;
      width: 40px;
      height: 40px;
      background: url("../../assets/creator/red-edit.svg") no-repeat;
      background-size: 100% auto;
    }
  }
}

.course-item:hover {
  .bg {
    display: block;
  }
}

//下拉选项
.img-box .drop-down {
  position: absolute;
  top: 34px;
  right: -108px;
  z-index: 99;
  width: 144px;
  @include fontSet(16px, #4d4d4d, 400);
  background: #fff;
  border-radius: 8px;
  border: 1px solid rgba(230, 230, 230, 1);
  li {
    cursor: pointer;
    position: relative;
    height: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    img {
      width: 24px;
      height: 24px;
      vertical-align: middle;
    }
    .mr {
      margin: 0 13px 0 11px;
    }
  }
  li:last-child {
    margin-bottom: 0;
  }
  li:hover {
    background: rgba(0, 0, 0, 0.03);
  }
}
</style>
