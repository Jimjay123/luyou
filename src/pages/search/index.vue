<template>
  <el-container direction="vertical">
    <Header></Header>
    <el-main class="search-page">
      <!-- <el-container class="page-container"> -->
      <!-- <el-header class="page-title" height="208px"> -->
      <Container>
        <SearchBox :defaultValue="search" :handleSearch="handleSearch"></SearchBox>
        <FilterBase :type="type" :handleSelect="handleTypeSelect"></FilterBase>
        <!-- </el-header> -->
        <!-- <el-main class="page-main"> -->
        <FilterMore
          v-if="showFilter()"
          :hideSort="type === 'my'"
          :courseType="courseType"
          :handleSelect="handleCourseTypeSelect"
          :handleSort="handleSort"
        ></FilterMore>
        <Recommend v-if="showRecommend()"></Recommend>
        <MyPlan v-else-if="type === 'my'" :list="result.my"></MyPlan>
        <Course v-else-if="type === 'course'" :list="result.course"></Course>
        <CoursePlan v-else-if="type === 'plan'" :list="result.plan"></CoursePlan>
        <div v-else class="search-result-all">
          <!-- min-height: calc(100vh - 254px)> -->

          <ResultSection
            v-show="result.my.length > 0"
            title="相关“我的课程计划”"
            type="my"
            :handleLink="handleLink"
          >
            <MyPlan :list="result.my"></MyPlan>
          </ResultSection>
          <ResultSection
            v-show="result.course.length > 0"
            title="相关课程"
            type="course"
            :handleLink="handleLink"
          >
            <Course :list="result.course"></Course>
          </ResultSection>
          <ResultSection
            v-show="result.plan.length > 0"
            title="相关课程计划"
            type="plan"
            :handleLink="handleLink"
          >
            <CoursePlan :list="result.plan"></CoursePlan>
          </ResultSection>
        </div>
        <!-- <Pagination
          v-if="type !== 'all' && !showRecommend()"
          :options="{page:page,limit:limit,total:total,cb:paginCb}"
        ></Pagination>-->
        <div class="page-footer">
          <div class="footer-container">
            <div class="footer-left">
              <img src="../../assets/Header.png" alt />
              <div class="separator" />
              <a href="#">关于</a>
              <a href="#">市场</a>
              <a href="#">方案</a>
              <a href="#">联系</a>
            </div>
            <div class="footer-right">© 2019 上海积途信息科技有限公司.</div>
          </div>
        </div>
      </Container>

      <!-- </el-main> -->
      <!-- </el-container> -->
    </el-main>
  </el-container>
</template>

<script>
import { Component, Emit, Vue, Prop } from "vue-property-decorator";
import { courseownPlanList, courseRecommendList } from "../../service/groupApi";
import Pagination from "../group/paginationItem";
import { tipsFail } from "../../utils/utils";
import Header from "../Header/header";
import SearchBox from "./SearchBox";
import FilterBase from "./FilterBase";
import FilterMore from "./FilterMore";
import Container from "./Container";
import Recommend from "./Recommend";
import Course from "./Course";
import CoursePlan from "./CoursePlan";
import MyPlan from "./MyPlan";
import ResultSection from "./ResultSection";

@Component({
  name: "searchPage",
  components: {
    Header,
    SearchBox,
    FilterBase,
    FilterMore,
    Container,
    Recommend,
    Course,
    CoursePlan,
    MyPlan,
    Pagination,
    ResultSection
  }
})
export default class SearchPage extends Vue {
  search = this.getUrlKey("search"); // 当前搜索的内容
  type = this.getUrlKey("type") || "all"; // 选择的类型： 全部|我的课程计划|课程|课程计划
  courseType = this.getUrlKey("courseType") || 0; // 内容顶部的类型筛选: 1 标准课 2课程频道
  sortType = this.getUrlKey("sortType") || 1; // 排序方式: 1 最新 2 热度
  page = this.getUrlKey("page") || 1;
  limit = 10;
  total = 0;
  result = {
    my: [],
    course: [],
    plan: []
  };

  @Emit getUrlKey(name) {
    return (
      decodeURIComponent(
        (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
          location.href
        ) || [, ""])[1].replace(/\+/g, "%20")
      ) || null
    );
  }

  @Emit getMockData(total = 10) {
    return Array(total)
      .fill(0)
      .map((_, index) => ({
        id: index,
        popularizeImageUrl: require(`../../assets/img/zhu${(Math.round(
          Math.random() * 10
        ) %
          3) +
          1}.svg`),
        keyName: "小组工作技能实训",
        tagNameList: ["社会", "社会工作", "人力资源"],
        avatar: require("../../assets/group/boy.svg"),
        ownerName: "陈丹青",
        duration: 60,
        modifyDatetime: "2019-7-15 更新了",
        summary: "隶属于《摄影艺术》",
        finishStudentCount: Math.round(Math.random() * 10),
        totalStudentCount: "10",
        coursePlanType: Math.round(Math.random()) > 0 ? 2 : 1,
        coursePlanName: "摄影前期基础入门",
        beginDate: "2019.03.03",
        beginDate: "2019.08.16",
        groupName: "群组名2",
        stateName: Math.round(Math.random()) > 0 ? "未发布" : "已发布"
      }));
  }

  @Emit handleSearch(search = "") {
    console.log("search", search);
    this.search = search;
    this.page = 1;
    this.total = 0;
    this.handleTypeSelect(this.type);
  }

  @Emit handleTypeSelect(type = "all", page = 1) {
    console.log("type", type);
    if (type !== this.type) {
      // 重置筛选条件与排序
      this.courseType = 0;
      this.sortType = 1;
      this.page = 1;
      this.total = 0;
      this.type = type;
    }
    switch (type) {
      case "my":
        this.getMyPlanData(page);
        break;
      case "course":
        this.getCourseData(page);
        break;
      case "plan":
        this.getPlanData(page);
        break;
      case "all":
        this.getAllData();
        break;
      default:
        break;
    }
    location.href = `#/search?search=${this.search ||
      ""}&type=${type}&page=${page}&courseType=${this.courseType}&sortType=${
      this.sortType
    }`;
  }

  @Emit showRecommend() {
    if (this.type !== "all") {
      const result = this.result[this.type] || [];
      return result.length === 0;
    } else {
      const my = this.result.my || [];
      const course = this.result.course || [];
      const plan = this.result.plan || [];
      return my.length + course.length + plan.length === 0;
    }
  }

  @Emit showFilter() {
    return (
      (this.type === "course" && this.result.course.length > 0) ||
      (this.type === "plan" && this.result.plan.length > 0) ||
      (this.type === "my" && this.result.my.length > 0)
    );
  }

  @Emit handleLink(type) {
    console.log("11", type);
    location.href = `#/search?search=${this.search ||
      ""}&type=${type}&page=1&courseType=0&sortType=1`;
    this.handleTypeSelect(type);
  }

  @Emit handleCourseTypeSelect(select) {
    console.log("select couse type", select);
    if (this.courseType == select) return;
    this.courseType = select;
    this.page = 1;
    this.handleTypeSelect(this.type, 1);
  }

  @Emit handleSort(sort) {
    console.log("select sort type", sort);
    if (this.sortType == sort) return;
    this.sortType = sort;
    this.handleTypeSelect(this.type, 1);
  }

  @Emit getAllData() {
    this.getMyPlanData(1, 4);
    this.getCourseData(1, 8);
    this.getPlanData(1, 1);
  }

  @Emit getCourseData(page = 1, limit = 28) {
    let opt = { limit, page, sortType: this.sortType, position: 5 };
    // 搜索条件
    if (this.search !== undefined && this.search !== null)
      opt.name = this.search;
    if (this.courseType) opt.type = this.courseType;
    courseRecommendList(opt)
      .then(res => {
        if (res.code == "0") {
          this.result.course = res.page.list;
          this.total = res.page.totalCount;
        } else {
          // tipsFail(res.msg);
        }
      })
      .catch(err => {
        // 测试阶段调用
        this.result.course = this.getMockData(limit);
      });
  }
  @Emit getPlanData(page = 1, limit = 6) {
    let opt = { limit, page, sortType: this.sortType, position: 4 };
    // 搜索条件
    if (this.search !== undefined && this.search !== null)
      opt.name = this.search;
    if (this.courseType) opt.type = this.courseType;
    courseRecommendList(opt)
      .then(res => {
        if (res.code == "0") {
          this.result.plan = res.page.list;
          this.total = res.page.totalCount;
        } else {
          // tipsFail(res.msg);
        }
      })
      .catch(err => {
        // 测试阶段调用
        this.result.plan = this.getMockData(limit);
      });
  }
  @Emit getMyPlanData(page = 1, limit = 10) {
    let opt = { limit, page };
    // 搜索条件
    if (this.search !== undefined && this.search !== null)
      opt.coursePlanName = this.search;
    if (this.courseType) opt.type = this.courseType;
    courseownPlanList(opt)
      .then(res => {
        if (res.code == "0") {
          this.result.my = res.page.list;
          this.total = res.page.totalCount;
        } else {
          // tipsFail(res.msg);
        }
      })
      .catch(err => {
        // 测试阶段调用
        this.result.my = this.getMockData(limit);
      });
  }

  @Emit paginCb(page, size, options = {}) {
    this.page = page;
    this.handleTypeSelect(this.type, page);
  }

  created() {
    this.handleTypeSelect(this.type);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.search-page {
  @include relative();
  padding: 0;

  .page-container {
    height: 100%;
    .page-title {
      padding: 0;
      text-align: center;
    }
  }

  .pagination-item {
    margin: 78px auto 52px auto;
    justify-content: center;
  }
  .search-result-all {
    min-height: calc(100vh - 306px);
  }
  .page-footer {
    position: relative;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    background: #333;
    height: 32px;
    line-height: 32px;
    .footer-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      .footer-left {
        display: flex;
        align-items: center;
        img {
          height: 24px;
        }
        .separator {
          height: 18px;
          width: 1px;
          background: rgba(252, 252, 252, 0.2);
          margin-left: 45px;
          margin-right: 6px;
        }
        a {
          padding: 0 20px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.64);
        }
      }
      .footer-right {
        font-weight: 600;
        color: rgba(255, 255, 255, 0.5);
        font-size: 16px;
      }
    }
  }
}

.el-container {
  width: 100%;
}
</style>
