<template>
  <div>
    <div class="main-content clearfix">
      <!--创建群组弹框 start-->
      <AddGroup :show="AddGroShow" :cbFun="AddGroCb"></AddGroup>
      <!--创建群组弹框 start-->

      <!--离开页面 tips start-->
      <CreLeaveTips :cbFun="leaveCb" :show="leaveShow"></CreLeaveTips>
      <!--离开页面 tips start-->

      <CrumbsItem style="margin-top:22px;" :btn="false" :list="list"></CrumbsItem>
      <div class="page-content">
        <p class="base">基础设置</p>
        <div class="borde"></div>
        <div class="first">
          <!--课程标题 start-->
          <div class="item">
            <div class="left">课程标题</div>
            <div class="right">
              <InputBox
                class="input"
                :required="true"
                style="width:376px;height:40px;"
                :tips="courseNameTips"
                :maxLength="24"
                :value="courseName"
                :placeHolder="'请输入课程标题'"
                :input="(e,type)=>inputChange(e,type,'courseName')"
              ></InputBox>
            </div>
          </div>
          <!--课程标题 end-->

          <!--大学/单位 start-->
          <div class="item">
            <div class="left">大学/单位</div>
            <div class="right">
              <InputBox
                class="input"
                :required="true"
                :disabled="true"
                style="width:299px;height:40px;"
                :value="company"
                :placeHolder="'请输入大学/单位'"
                :input="(e,type)=>inputChange(e,type,'company')"
              ></InputBox>
            </div>
          </div>
          <!--大学/单位 end-->

          <!--专业学科 start-->
          <div class="item">
            <div class="left">专业学科</div>
            <div class="right">
              <InputBox
                class="input"
                :required="true"
                :disabled="true"
                style="width:299px;height:40px;"
                :value="major"
                :placeHolder="'请输入专业学科'"
                :input="(e,type)=>inputChange(e,type,'major')"
              ></InputBox>
            </div>
          </div>
          <!--专业学科 end-->

          <!--归属群组 start-->
          <div class="item">
            <div class="left">归属群组</div>
            <div class="right">
              <SubGroList
                :placeHolder="'请选择'"
                :list="subGroList"
                :addGroupCb="addGroupCb"
                :AddGroShow="AddGroShow"
                :tips="subGroListTips"
              ></SubGroList>
            </div>
          </div>
          <!--归属群组 end-->

          <!--起止时间 start-->
          <div class="item">
            <div class="left">起止时间</div>
            <div class="right">
              <el-date-picker
                style="width:300px"
                v-model="staEndTime"
                type="daterange"
                range-separator="——"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
              <div class="error-tips" v-show="timeTips.show">
                <p>{{timeTips.content}}</p>
              </div>
            </div>
          </div>
          <!--起止时间 end-->

          <!--课程描述 start-->
          <div class="item">
            <div class="left">课程描述</div>
            <div class="right">
              <TextareaBox
                class="input"
                style="width:618px;height:80px;"
                :value="couDescribe"
                :maxLength="300"
                :limit="true"
                :placeHolder="'介绍一下您的课程亮点'"
                :input="(e,type)=>inputChange(e,type,'couDescribe')"
              ></TextareaBox>
            </div>
          </div>
          <!--课程描述 end-->

          <div class="btn-box">
            <a href="javascript:;" class="save" @click="saveFun('0')">保存</a>
            <a href="javascript:;" class="submit" @click="saveFun('1')">发布</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import CrumbsItem from "../creCouPlans/CrumbsItem";
import InputBox from "../group/inputBox";
import TextareaBox from "../teachers/textareaBox";
import SubGroList from "../teachers/subGroList";
import AddGroup from "../teachers/addGroup";
import CreLeaveTips from "./creLeaveTips";
import { cloneObj, tokenFun, tipsFail, trimDate } from "../../utils/utils";
import {
  groupInfoList,
  groupInfoAdd,
  memberInfoTeacher
} from "../../service/groupApi";
import {
  couPlaPlaBasInfo,
  getCouPlaPlaBasInfo,
  couPlaSavForCourse,
  couPlaSavForCouChannel
} from "../../service/teachersApi";
import { putCouPlaPlaBasInfo } from "../../service/creCouPlans";
import { State, Action, namespace } from "vuex-class";

const EditCouPlansStore = namespace("editCouPlans");

@Component({
  name: "addCourse",
  components: {
    CrumbsItem,
    InputBox,
    TextareaBox,
    SubGroList,
    AddGroup,
    CreLeaveTips
  },
  //离开时路由守卫
  beforeRouteLeave(to, from, next) {
    if (this.leaveCheck) {
      next();
    } else {
      this.leaveShow = true; //弹出离开页面提示框
      this.leaveRouter = to;
      next(false);
    }
  }
})
export default class AddCourse extends Vue {
  @EditCouPlansStore.State("editOrAdd") editOrAdd; //新曾或编辑 课程计划 相关参数
  @EditCouPlansStore.Action("editOrAddHandle") editOrAddHandle; //新曾或编辑 课程计划 相关参数  action修改方法

  list = [
    {
      name: "新建课程频道",
      path: "/Establish",
      type: true
    },
    {
      name: "章节编辑",
      path: "/teachers/editCouPlans",
      type: true,
      query: {
        coursePlanId: "",
        addCourseType: ""
      }
    },
    {
      name: "基础设置",
      path: "/teachers/editCourseBase",
      type: true
    },
    {
      name: "发布",
      path: "",
      type: false
    }
  ]; //面包屑数据

  courseName = ""; //课程名称
  courseNameTips = {
    content: "课程标题不能为空",
    show: false
  };
  company = ""; //大学单位
  major = ""; //专业学科
  subGroList = []; //归属群组
  subGroListTips = {
    content: "群组不能为空",
    show: false
  };
  staEndTime = ""; //开始结束时间
  timeTips = {
    content: "开始结束时间不能为空",
    show: false
  };
  couDescribe = ""; //课程描述

  AddGroShow = false; //添加弹框显示隐藏

  /**
   * 编辑标准课  editCourse
   * 编辑课程计划  editChannel
   *
   * */
  addCourseType = ""; //
  coursePlanId = ""; //课程频道Id
  relCourseId = ""; //

  leaveShow = false; //离开提示弹框修改
  leaveRouter = ""; //离开暂存路由
  leaveCheck = false;

  //离开触发事件
  @Emit leaveCb(type) {
    if (type === "hide" || type === "confirm") {
      this.leaveShow = false;
      this.leaveRouter = "";
    } else {
      this.leaveCheck = true; //弹出离开页面提示框
      //离开页面
      this.$router.push({
        path: this.leaveRouter.path,
        query: this.leaveRouter.query
      });
    }
  }

  //input 输入框改变事件
  @Emit inputChange(e, type, name) {
    if (type === "input") {
      this[name] = e.target.value;
      if (name === "courseName") {
        this.courseNameTips.show = false;
      }
    } else if (type === "del") {
      this[name] = "";
    }
  }

  //创建群组弹框回调方法
  @Emit AddGroCb(type, data) {
    if (!type) {
      this.AddGroShow = false;
    } else {
      if (data.name === "") {
        this.addGroupTips.show = true;
        return;
      } else {
        this.addGroupTips.show = false;
      }
      groupInfoAdd(data).then(res => {
        if (res.code == "0") {
          this.groupInfoListFun(); //
        } else {
          tipsFail(res.msg);
        }
      });
    }
  }

  //创建群组点击事件回调
  @Emit addGroupCb(val) {
    this.AddGroShow = val;
  }

  //获取群组列表接口
  @Emit groupInfoListFun(type) {
    groupInfoList().then(res => {
      if (res.code == 0) {
        let subGroList = this.subGroList;
        let list = res.groupList;
        this.AddGroShow = false;
        list.map(item => {
          let id = item.id;
          let obj = subGroList.find(dat => dat.id == id);
          if (obj) {
            item.selected = obj.selected;
          } else {
            item.selected = false;
          }
        });
        this.subGroList = cloneObj(list);
        //如果是初始化获取数据 需要调用基本信息接口
        this.getCouPlaPlaBasInfoFun(this.editOrAdd.coursePlanId);
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //保存 发布提交
  @Emit saveFun(state) {
    if (this.addCourseType === "editChannel") {
      this.putCouPlaPlaBasInfoFun(state);
    } else {
      this.putCouPlaPlaBasInfoFun(state);
    }
  }

  //保存基础设置接口
  @Emit couPlaBasPlaInfoFun(state) {
    let subGroList = this.subGroList;
    let groupIds = "";
    let beginDatetime = this.staEndTime[0] ? trimDate(this.staEndTime[0]) : "";
    let endDatetime = this.staEndTime[1] ? trimDate(this.staEndTime[1]) : "";
    subGroList.map((item, index) => {
      if (item.selected) {
        groupIds += groupIds.length !== 0 ? "," + item.id : item.id;
      }
    });

    if (state == 1 && !this.checkFun(groupIds)) {
      return;
    }

    couPlaPlaBasInfo({
      state: state,
      coursePlanId: this.editOrAdd.coursePlanId, //课程计划id
      name: this.courseName, //课程标题
      orgName: this.company, //大学/单位
      major: this.major, //专业学科
      groupIds: groupIds, //归属群组
      beginDate: beginDatetime, //开始时间
      endDate: endDatetime, //结束时间
      summary: this.couDescribe //课程描述
    }).then(res => {
      if (res.code == "0") {
        this.leaveCheck = true;
        this.$router.push({
          path: "/Uncertified"
        });
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //单一标准课  保存发布
  @Emit putCouPlaPlaBasInfoFun(state) {
    let subGroList = this.subGroList;
    let groupIds = "";
    let beginDatetime = this.staEndTime[0] ? trimDate(this.staEndTime[0]) : "";
    let endDatetime = this.staEndTime[1] ? trimDate(this.staEndTime[1]) : "";
    subGroList.map((item, index) => {
      if (item.selected) {
        groupIds += groupIds.length !== 0 ? "," + item.id : item.id;
      }
    });

    if (state == 1 && !this.checkFun(groupIds)) {
      return;
    }

    putCouPlaPlaBasInfo({
      state: state,
      relCourseId: this.editOrAdd.coursePlanId, //标准课Id
      coursePlanId: this.editOrAdd.coursePlanId,
      name: this.courseName, //课程标题
      orgName: this.company, //大学/单位
      major: this.major, //专业学科
      groupIds: groupIds, //归属群组
      beginDate: beginDatetime, //开始时间
      endDate: endDatetime, //结束时间
      summary: this.couDescribe //课程描述
    }).then(res => {
      if (res.code == "0") {
        this.leaveCheck = true;
        if (state == 1) {
          this.$router.push({
            path: "/Uncertified"
          });
        }
      } else {
        tipsFail(res.msg);
      }
    });
  }

  //接口提交校验
  @Emit checkFun(groupIds) {
    let check = true;
    let beginDatetime = trimDate(this.staEndTime[0]);
    let endDatetime = trimDate(this.staEndTime[1]);
    //课程标题校验
    if (this.courseName === "") {
      this.courseNameTips.show = true;
      check = false;
    } else {
      this.courseNameTips.show = false;
    }

    //归属群组校验
    if (groupIds === "") {
      this.subGroListTips.show = true;
      check = false;
    } else {
      this.subGroListTips.show = false;
    }

    //时间校验
    if (beginDatetime === "" || endDatetime === "") {
      this.timeTips.show = true;
      check = false;
    } else {
      this.timeTips.show = false;
    }
    return check;
  }

  //获取基本信息接口
  @Emit getCouPlaPlaBasInfoFun(id) {
    getCouPlaPlaBasInfo({
      coursePlanId: id //课程计划id
    }).then(res => {
      let data = res.data;
      let groupIds = data.groupIds ? data.groupIds.split(",") : [];
      let subGroList = cloneObj(this.subGroList);
      //匹配当前选中群组
      subGroList.map(item => {
        let obj = groupIds.find(dat => dat == item.id);
        if (obj) {
          item.selected = true;
        }
      });
      console.log(res);
      this.courseName = data.name; //课程标题
      // this.company = data.orgName; //大学/单位
      // this.major = data.major; //大学/单位
      this.subGroList = subGroList; //归属群组
      this.staEndTime = [
        data.beginDate ? new Date(data.beginDate) : "",
        data.endDate ? new Date(data.endDate) : ""
      ]; //开始结束时间
      this.couDescribe = data.summary; //课程描述
    });
  }

  @Emit setEditOrAdd(name) {
    let query = this.$route.query;
    let editOrAdd = this.editOrAdd;
    if (query[name]) {
      this[name] = query[name] || "";
      editOrAdd[name] = this[name];
      this.editOrAddHandle({
        editOrAdd: cloneObj(editOrAdd)
      });
    } else {
      this[name] = editOrAdd[name] || "";
    }
  }

  //初始化生命周期方法
  created() {
    memberInfoTeacher({})
      .then(res => {
        if (res.code == "0") {
          this.major = res.data.majorName;
          this.company = res.data.universityName;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.groupInfoListFun(true);
    this.setEditOrAdd("relCourseId");
    this.setEditOrAdd("coursePlanId");
    this.setEditOrAdd("addCourseType");

    this.addCourseType =
      this.$route.query.addCourseType || this.editOrAdd.addCourseType;
    this.coursePlanId =
      this.$route.query.coursePlanId || this.editOrAdd.coursePlanId;
    /**
     * 编辑标准课  editCourse
     * 编辑课程计划  editChannel
     *
     * */

    if (this.addCourseType === "editCourse") {
      this.list = [
        {
          name: "选择课程模板",
          path: "/Establish",
          type: true
        },
        {
          name: "基础设置",
          path: "/teachers/editCourseBase",
          type: true
        },
        {
          name: "发布",
          path: "",
          type: false
        }
      ]; //面包屑数据
    } else {
      this.list = [
        {
          name: "新建课程频道",
          path: "/Establish",
          type: true
        },
        {
          name: "章节编辑",
          path: "/teachers/editCouPlans",
          type: true,
          query: {
            coursePlanId: this.coursePlanId,
            addCourseType: this.addCourseType
          }
        },
        {
          name: "基础设置",
          path: "/teachers/editCourseBase",
          type: true
        },
        {
          name: "发布",
          path: "",
          type: false
        }
      ]; //面包屑数据
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}

.main-content {
  width: 1200px;
  margin: 0 auto;
}

.page-content {
  width: 952px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 33px;
  .base {
    @include fontSet(16px, rgba(0, 0, 0, 0.85), 500);
    padding: 12px 32px;
  }
}

.page-content .first {
  padding: 22px 32px;
}

.page-content .borde {
  border-bottom: 1px solid #f1f1f1;
  width: 100%;
}

#reg-btn {
  display: block;
  width: 110px;
  height: 36px;
  background: linear-gradient(
    90deg,
    rgba(255, 176, 158, 1) 0%,
    rgba(254, 120, 101, 1) 100%
  );
  border-radius: 18px;
  border: 0;
  margin-left: 668px;
  margin-top: -30px;
  float: left;
  color: rgba(255, 255, 255, 1);
}

.item {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 20px;
  .left {
    @include fontSet(16px, #666, 400);
    width: 92px;
    height: 40px;
    line-height: 40px;
  }
  .input /deep/ i {
    top: 16px;
  }
  .right {
    @include fontSet(16px, rgba(0, 0, 0, 0.65), normal);
  }
}

.btn-box {
  text-align: right;
  margin-top: 8px;
  a {
    width: 109px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }
  .save {
    border: 2px solid rgba(254, 120, 101, 1);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
    @include fontSet(16px, #fe7865, 500);
    background: #fff;
  }
  .submit {
    background: linear-gradient(
      90deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
    @include fontSet(16px, #fff, 500);
    margin-left: 21px;
    margin-right: 8px;
  }
}

/*开始结束时间*/
.right /deep/ {
  .el-input__icon {
    position: absolute;
    top: 0;
    right: 0;
  }
  .el-input__inner:hover {
    border: 1px solid rgba(254, 120, 101, 0.2);
  }
  .el-range-editor.is-active,
  .el-range-editor.is-active:hover {
    box-shadow: 0px 0px 0px 4px rgba(254, 120, 101, 0.2);
    border: 1px solid rgba(255, 163, 158, 1);
    &:hover {
      border: 1px solid rgba(255, 163, 158, 1);
    }
  }
}
.right {
  .error-tips {
    width: 100%;
    height: 0;
    position: relative;
    p {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 12px;
      color: #fe7865;
    }
  }
}
</style>
