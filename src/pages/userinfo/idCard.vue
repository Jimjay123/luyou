<template>
  <div class="idCard">
    <section class="roles">
        <div class="role" v-for="(item,index) in roles" :key="index">{{item.name}}</div>
    </section>
    <section>
        <el-input type="file"></el-input>
    </section>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "userDetail"
})
export default class UserDetail extends Vue {
  roles = [
    {name:'专业老师'},
    {name:'系主任'},
    {name:'学院领导'},
    {name:'创建者'},
  ];

  gotoValid() {}
  editDetail() {
      this.$router.push('/userinfo/edit');
  }
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.idCard {
  @include relative();
  padding: 30px 100px;
  width: 100%;
  .roles{
      @include flex(1,row,space-around);
      margin-bottom:40px;
      .role{
          @include border(1px, #333, 2px);
          padding:20px 40px;
          transition: background-color .3s ease-out;
          &:hover{
              background:#bbb;
          }
      }
  }
}
</style>

