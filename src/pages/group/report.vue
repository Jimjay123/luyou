<template>
  <div class="report pages">
    <h3 style="text-align:center">课程计划完成情况</h3>
    <el-button type="danger" round plain size="mini" class="rightBtn"> <i class="el-icon-upload"/>报告</el-button>
    <span>群成绩</span>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>完成率</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              <i class="el-icon-warning"></i>
            </el-button>
          </div>
          <div>这里是图表</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>成绩分布</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              <i class="el-icon-warning"></i>
            </el-button>
          </div>
          <div>暂无数据</div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>各步骤平均分</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              <i class="el-icon-warning"></i>
            </el-button>
          </div>
          <div>暂无数据</div>
        </el-card>
      </el-col>
    </el-row>
    <section class="line-block"></section>
    <el-table :data="tableData" style="width:100%">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column v-for="(header,index) in tableHeader" :key="index" :prop="header.prop" :label="header.label" width="140"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "groupReport"
})
export default class GroupReport extends Vue {
    tableHeader = [{label:'学号',prop:'num'},{label:'姓名',prop:'name'},{label:'系统评分',prop:'rate'},{label:'完成度',prop:'complete'},{label:'最新提交时间',prop:'date'},{label:'报告',prop:'report'}]
    tableData = [
        {num:'123',name:'学生1',rate:'100',complete:'100%',date:'2019-01-01',report:' '},
        {num:'123',name:'学生1',rate:'100',complete:'100%',date:'2019-01-01',report:' '},
        {num:'123',name:'学生1',rate:'100',complete:'100%',date:'2019-01-01',report:' '},
        {num:'123',name:'学生1',rate:'100',complete:'100%',date:'2019-01-01',report:' '}
    ]
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.report {
  @include relative();
  @include setPadding();
  width: 100%;
  padding-top: 20px;
  .line-block{
      width:100%;
      height:200px;
      background:#ccc;
      margin:20px 0;
  }
  .rightBtn{
      @include absolute(40px,auto,auto,0);
      @include setMargin();
  }
}
</style>

