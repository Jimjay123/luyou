<template>
  <el-table :show-header="false" :data="tableData">
    <el-table-column type="selection"></el-table-column>
    <el-table-column
      v-if="item != 'head' && item != 'inside'"
      :prop="item"
      label="日期"
      width="160"
      v-for="(item,index) in talbeHeader"
      :key="index"
    ></el-table-column>
    <el-table-column v-else-if="item == 'head'" width="50" label="123">
      <template slot-scope="scope">
        <img :src="require('@/assets/logo.png')" alt class="head">
      </template>
    </el-table-column>
    <el-table-column v-else>
      <template slot-scope="scope">
        <div v-if="scope.row[item]">
          <span>同意</span>
          <span>拒绝</span>
        </div>
        <div v-else>
          <i class="el-icon-delete"/>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "tableComp"
})
export default class TableComp extends Vue {
  checkAll = false;
  talbeHeader = ["head", "name", "number", "mobile", "team", "job", "inside"];
  tableData = [
    {
      head: "",
      name: "users",
      number: "123466",
      mobile: "13333333333",
      team: "team1",
      job: "member",
      inside: false
    },
    {
      head: "",
      name: "users",
      number: "123466",
      mobile: "13333333333",
      team: "team1",
      job: "member",
      inside: true
    },
    {
      head: "",
      name: "users",
      number: "123466",
      mobile: "13333333333",
      team: "team1",
      job: "member",
      inside: true
    }
  ];
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";
.head {
  @include border(0, #fff, 50%);
  width: 30px;
  height: 30px;
}
</style>
