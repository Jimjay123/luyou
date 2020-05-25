<template>
  <el-header>
    <div class="header">
      <div class="main_header">
        <div class="left_logo">
          <img src="../../assets/img/LOGO1.svg" alt @click="toHome" />
        </div>
        <div class="right_useInfo">
          <div class="msg">
            <img :src="require('../../assets/img/sousuo-opc.svg')" alt />
          </div>
          <div class="user">
            <img :src="require('../../assets/creator/user.svg')" alt />
          </div>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script>
export default {
  name: "TopHeader",
  methods: {
    toHome() {
      this.$router.push("/creator/home");
    }
  }
};
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
  .header {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px 0px rgba(237, 237, 237, 1);
    .main_header {
      width: 1200px;
      height: 60px;
      line-height: 60px;
      margin: 0 auto;
      .left_logo {
        float: left;
        cursor: pointer;
      }
      .right_useInfo {
        float: right;
        .msg,
        .user {
          display: inline-block;
          width: 48px;
          height: 48px;
          text-align: center;
          line-height: 48px;
        }
      }
    }
  }
}
</style>


