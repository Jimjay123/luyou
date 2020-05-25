<template>
  <div class="plan">
    <Layout>
      <div slot="topLeft">
        <el-col :span="10">
          <el-input placeholder="未命名课程" style="width:200px"></el-input>
        </el-col>
      </div>
      <div slot="topRight">
        <el-button type="primary">课程详细页面</el-button>
        <el-button type="primary">课程规划信息</el-button>
      </div>
      <div slot="center" style="margin-top:20px;width:100%">
        <h5>课程标题</h5>
        <el-input></el-input>
        <h5>课程副标题</h5>
        <el-input></el-input>
        <h5>课程描述</h5>
        <el-input type="textarea"></el-input>
        <h5>基本信息</h5>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-select v-model="drop">
              <el-option
                v-for="item in select"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="18">
            <el-input></el-input>
          </el-col>
        </el-row>
      </div>
    </Layout>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Layout from "@/components/tableTriditionLayout";

@Component({
  name: "creatorPlan",
  components: {
    Layout
  }
})
export default class CreatorPlan extends Vue {
  drop = "";
  select = [
    {
      label: "123",
      value: "123"
    },
    {
      label: "234",
      value: "234"
    }
  ];
  cardList = [1, 2, 3, 4];
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.plan {
  width: 100%;
  height: 600px;
  margin-top: 20px;
  .view {
    width: 100%;
    overflow: auto;
    height: 500px;
    background: #ccc;
    @include flex(1);
  }
  h5 {
    margin: 4px 0;
  }
}
</style>
