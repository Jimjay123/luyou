<template>
  <div class="userEdit">
    <article>个人资料和设置</article>
    <div class="form">
        <el-row :gutter="20">
            <el-col :span="12">
                <div>名字</div>
                <el-input></el-input>
            </el-col>
            <el-col :span="12">
                <div>网站</div>
                <el-input></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <div>姓氏</div>
                <el-input></el-input>
            </el-col>
            <el-col :span="12">
                <div>称呼</div>
                <el-input></el-input>
            </el-col>
        </el-row>
    </div>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "userEdit"
})
export default class UserEdit extends Vue {
  

  gotoValid() {}
  editDetail() {
      this.$router.push('/userinfo/user/edit');
  }
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.userEdit {
  @include relative();
  padding: 30px 100px;
  width: 100%;
  article{
      font-size:1.5rem;
      margin-bottom:40px;
  }
  .el-row {
    margin-bottom: 20px;
    width: 100%;
  }
  .form{
      width:50%;

  }
}
</style>

