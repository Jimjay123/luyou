/**

* Created by wangxin

* @date 2019/8/20 17:55

*/
<template>
  <table>
    <thead>
      <tr>
        <th style="font-weight: 500;">排名</th>
        <th style="font-weight: 500;">基础信息</th>
        <th style="font-weight: 500;" class="w224">专业名称</th>
        <th style="font-weight: 500;" class="w224">所在班级</th>
        <th style="font-weight: 500;" class="w195">完成时间</th>
        <th style="font-weight: 500;" class="w195">学习时长（分钟）</th>
        <th style="font-weight: 500;">完成进度</th>
        <th style="font-weight: 500;">分数</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in tableList" :key="item.memberId">
        <td>
          <span :class="getSortClass(item.rank)">{{item.rank}}</span>
        </td>
        <td class="t-l">
          <span class="name">{{item.memberName}}</span>
          <i :class="item.gender==2?'girl':'boy'"></i>
          <span class="remark">大{{trimNumberFun(item.grade)}}</span>
        </td>
        <td class="t-l">
          <span>{{item.majorName}}</span>
        </td>
        <td class="t-l">
          <span class="w224">{{item.clazz}}</span>
        </td>
        <td class="w195">{{item.finishDatetime}}</td>
        <td class="w195">{{item.cumulativeTime}}</td>
        <td>{{item.finishFlag?'完成':item.finishPercent+'%'}}</td>
        <td>{{item.score}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { trimNumber } from "../../utils/utils";
@Component({
  name: "TableBox"
})
export default class TableBox extends Vue {
  @Prop({
    default: () => {
      return [
        {
          groupId: 1, //群ID
          coursePlanId: 1, //课程计划ID
          memberId: 8, //用户ID
          memberName: "", //用户名称
          rank: "", //排名 1,2,3,4...
          score: 200, //得分
          finishPercent: 50, //完成百分比
          finishFlag: false, //是否完成 true false
          gender: 1, // 1 男 2 女
          grade: 1, // 1234 大一...
          finishDateTime: "2018-09-01", //完成时间
          attendanceDate: "2018-09-01", //
          majorName: "上海专业", //专业
          clazz: "社工一班" //班级
        }
      ];
    }
  })
  tableList;

  @Emit trimNumberFun(val) {
    return trimNumber(val);
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
  }
  .w224 {
    width: 224px;
    @include pointer;
  }
  .w195 {
    width: 195px;
    @include pointer;
  }
  tbody {
    tr {
      border-bottom: 1px solid #e8e8e8;
    }
    tr:last-child {
      border: none;
    }
    tr:hover {
      background: #f7f7f7;
    }
    td {
      @include fontSet(14px, #666, 400);
      vertical-align: middle;
      padding: 14px 12px;
    }
    .t-l {
      text-align: left;
    }
    .sort {
      display: inline-block;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 10px;
      @include fontSet(12px, #999, 500);
    }
    .one {
      background: rgba(254, 120, 101, 1);
      color: #fff;
    }
    .two {
      background: #fa8c16;
      color: #fff;
    }
    .three {
      background: #ffc53d;
      color: #fff;
    }
    .name {
      color: #333;
      margin-right: 17px;
    }
    @mixin iconHeader($url) {
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url($url) no-repeat;
      background-size: 100% auto;
      vertical-align: middle;
    }
    .boy {
      @include iconHeader("../../assets/groupStaAnalysis/icon-boy.svg");
    }
    .girl {
      @include iconHeader("../../assets/groupStaAnalysis/icon-girls.svg");
    }
    .remark {
      margin-left: 11px;
      padding: 0 6px;
      border: 1px solid rgba(254, 120, 101, 0.4);
      border-radius: 4px;
      @include fontSet(12px, #fe7865, 500);
    }
    a {
      display: inline-block;
      width: 83px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      border-radius: 6px;
      @include fontSet(14px, #fe7865, 400);
    }
    .no-completed {
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
