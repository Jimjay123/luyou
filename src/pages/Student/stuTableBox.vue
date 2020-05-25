/**

* Created by wangxin

* @date 2019/8/21 19:47

*/
<template>
  <table>
    <thead>
      <tr>
        <th class="w490">群名称</th>
        <th class="w286">成员数量</th>
        <th class="w286">课程计划数</th>
        <th style="font-weight: 500;">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in tableList" :key="item.memberId">
        <td class="t-l">{{item.name}}</td>
        <td class="t-l">{{item.totalStudent}}</td>
        <td class="t-l">{{item.totalCoursePlan}}</td>
        <td>
          <a class="completed" @click="detailClick(item.id)" href="javascript:;">查看详情</a>
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
          id: 161, //唯一性标识
          delFlag: false, //删除标识
          createDatetime: "2019-08-21 10:38:05", //创建时间
          modifyDatetime: "2019-08-21 10:38:05", //修改时间
          code: "1566355085741", //群code
          invitationCode: "9abccf6c-9cde-4bfd-a8bc-7b3b00b8fdd9", //邀请code
          name: "52143121", //群名称
          approveJoinFlag: true, //是否需要审批
          ownerId: 14, //归属人
          ownerName: "321", //归属人
          dismissFlag: false, //是否解散
          totalStudent: 0, //总人数
          totalCoursePlan: 0, //总课程计划数
          averageCumulative: 0.0 //平均用时
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
  @Emit detailClick(code) {
    console.log(code);
    this.tabCbFun(code);
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
    @include fontSet(14px, #999, 400);
    th {
      padding: 7px 12px;
      text-align: left;
    }
    th:last-child {
      padding-left: 24px;
    }
  }
  .w490 {
    width: 490px;
    font-weight: 500;
  }
  .w286 {
    width: 286px;
    font-weight: 500;
  }
  tbody {
    tr {
      // border-bottom: 1px solid #e8e8e8;
      // padding: 20px 12px;
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
      @include fontSet(14px, rgba(51, 51, 51, 1), 400);
      text-align: left;
      vertical-align: middle;
      height: 60px;
      padding: 0px 12px;
      font-family: PingFangSC;
      line-height: 20px;
    }
    a {
      display: inline-block;
      height: 32px;
      text-align: center;
      line-height: 32px;
      border-radius: 6px;
      padding: 0px 12px;
      // margin: 20px 0;
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
