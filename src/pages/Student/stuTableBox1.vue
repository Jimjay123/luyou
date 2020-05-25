/**

* Created by wangxin

* @date 2019/8/21 19:47

*/
<template>
  <table>
    <thead>
      <tr>
        <th class="w400">课程名称</th>
        <th class="w160">得分</th>
        <th class="w160">用时(分)</th>
        <th class="w160">人均用时(分)</th>
        <th class="w160">排名</th>
        <th style="font-weight: 500;">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in tableList" :key="item.memberId">
        <td class="t-l">{{item.coursePlanName}}</td>
        <td class="t-l">{{item.score}}</td>
        <td class="t-l">{{item.cumulativeTime}}</td>
        <td class="t-l">{{item.averageCumulativeTime}}</td>
        <td class="t-l">{{item.rank}}</td>
        <td>
          <a
            class="completed"
            @click="detailClick(item.coursePlanId, item.groupId, item.coursePlanType)"
            href="javascript:;"
          >查看报告</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { trimNumber } from "../../utils/utils";
@Component({
  name: "stuTableBox"
})
export default class StuTableBox extends Vue {
  @Prop({
    default: () => {
      return [
        {
          coursePlanId: 161, //唯一性标识
          delFlag: false, //删除标识
          createDatetime: "2019-08-21 10:38:05", //创建时间
          modifyDatetime: "2019-08-21 10:38:05", //修改时间
          code: "1566355085741", //群code
          invitationCode: "9abccf6c-9cde-4bfd-a8bc-7b3b00b8fdd9", //邀请code
          coursePlanName: "52143121", //群名称
          approveJoinFlag: true, //是否需要审批
          ownerId: 14, //归属人
          ownerName: "321", //归属人
          dismissFlag: false, //是否解散
          totalStudent: 0, //总人数
          totalCoursePlan: 0, //总课程计划数
          averageCumulative: 0.0, //平均用时
          score: 60, //得分
          cumulativeTime: 100, // 用时
          averageCumulativeTime: 100, //个人用时
          rank: 2, // 排名
          groupId: 2 // 群主ID
        }
      ];
    }
  })
  tableList;

  @Prop({
    required: false,
    default: null
  })
  tabCbFun;

  //详情按钮点击事件
  @Emit detailClick(code, id, coursePlanType) {
    console.log(code, id, coursePlanType);
    if (coursePlanType == "1") {
      // this.tabCbFun(code);
      this.$router.push({
        path: "/StudentReports",
        query: {
          coursePlanId: code,
          groupId: id,
          coursePlanType: coursePlanType
        }
      });
    } else {
      this.$router.push({
        path: "/StudentReportsChannel",
        query: {
          coursePlanId: code,
          groupId: id,
          coursePlanType: coursePlanType
        }
      });
    }
  }

  //获取class
  @Emit getSortClass(val) {
    if (val == 1) {
      return "sort one";
    } else if (val == 2) {
      return "sort two";
    } else if (val == 3) {
      return "sort three";
    } else {
      return "sort";
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

@mixin pointer() {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
table {
  width: 100%;
  margin-top: 34px;
  thead {
    background: rgba(247, 247, 247, 1);
    @include fontSet(14px, #999, 500);
    th {
      padding: 7px 12px;
      text-align: left;
    }
    th:last-child {
      padding-left: 24px;
    }
  }
  .w400 {
    width: 400px;
    font-weight: 500;
  }
  .w160 {
    width: 160px;
    font-weight: 500;
  }
  tbody {
    tr {
      // border-bottom: 1px solid #e8e8e8;
    }
    tr:last-child {
      border: none;
    }
    tr:hover {
      background: #f7f7f7;
      a {
        background: linear-gradient(
          90deg,
          rgba(255, 176, 158, 1) 0%,
          rgba(254, 120, 101, 1) 100%
        );
        color: #fff;
      }
    }
    td {
      @include fontSet(14px, #666, 400);
      text-align: left;
      vertical-align: middle;
      height: 60px;
      padding: 0 12px;
    }
    a {
      display: inline-block;
      height: 32px;
      text-align: center;
      line-height: 32px;
      border-radius: 6px;
      padding: 0 12px;
      @include fontSet(14px, #fe7865, 400);
    }
    a:hover {
      background: linear-gradient(
        90deg,
        rgba(255, 176, 158, 1) 0%,
        rgba(254, 120, 101, 1) 100%
      );
      color: #fff;
    }
  }
}
</style>
