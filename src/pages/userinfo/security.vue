<template>
  <div class="security">
    <el-row :gutter="20" v-for="(item,index) in securityList" :key="index">
      <el-col :span="2">
        <img :src="require('@/assets/logo.png')" alt class="head">
      </el-col>
      <el-col :span="6">
        <el-input :disabled="true" v-model="item.value"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button @click="doAction(index)">{{item.button}}</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "security"
})
export default class Security extends Vue {
  securityList = [
    {
      head: "",
      value: "12323132",
      button: "更改"
    },
    {
      head: "",
      value: "2222222",
      button: "绑定"
    },
    {
      head: "",
      value: "3333333",
      button: "解绑"
    }
  ];

  doAction(index) {
    let data = this.securityList[index];
    switch(true){
        case data.button == '绑定':
            this.$router.push('/bindMobile');
        break;
        case data.button == '解绑':
            this.$router.push('/releaseMobile');
        break;
        case data.button == '更改':
            this.$router.push('/validMobile');
        break;
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.security {
  @include relative();
  padding: 30px 100px;
  width: 100%;
  .head {
    width: 40px;
    height: 40px;
    @include border(0px, #333, 50%);
  }
}
</style>

