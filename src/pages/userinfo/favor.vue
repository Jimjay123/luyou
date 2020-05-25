<template>
  <div class="favor">
    <section class="roles">
        <div class="role" v-for="(item,index) in roles" :key="index">{{item.name}}</div>
    </section>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "favor"
})
export default class Favor extends Vue {
  roles = [
    {name:'喜欢1'},
    {name:'喜欢2'},
    {name:'喜欢3'},
    {name:'喜欢4'},
  ];

}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.favor {
  @include relative();
  padding: 30px 100px;
  width: 100%;
  .roles{
      @include relative();
      margin-bottom:40px;
      .role{
          @include border(1px, #333, 2px);
          padding:10px 20px;
          transition: background-color .3s ease-out;
          float:left;
          margin: 10px 30px;
          &:hover{
              background:#bbb;
          }
      }
  }
}
</style>

