<template>
  <div class="userDetail">
    <el-row>
      <img :src="require('@/assets/logo.png')" alt class="userHead">
    </el-row>
    <el-row v-for="(item,index) in detail" :key="index">
      <el-col>{{`${item.label} : ${item.value}`}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-button @click="gotoValid">去认证</el-button>
      </el-col>
      <el-col :span="4">
        <el-button @click="editDetail">修改个人资料</el-button>
      </el-col>
      <span class="mini">修改所在大学将导致此前认证信息丢失，同时将失去对原组织的管理权。</span>
    </el-row>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "userDetail"
})
export default class UserDetail extends Vue {
  detail = [
    { label: "姓名", value: "张三李四" },
    { label: "大学", value: "上海交通大学" },
    { label: "学院", value: "安泰经济与管理学院" },
    { label: "专业", value: "工商管理" },
    { label: "学号", value: "20196202121" }
  ];

  gotoValid() {}
  editDetail() {
      this.$router.push('/userinfo/edit');
  }
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.userDetail {
  @include relative();
  padding: 30px 100px;
  width: 100%;
  .userHead {
    width: 200px;
    height: 200px;
    @include border(0px, #fff, 50%);
  }
  .el-row {
    margin-bottom: 20px;
    width: 100%;
  }
  .mini {
    font-size: 12px;
  }
}
</style>

