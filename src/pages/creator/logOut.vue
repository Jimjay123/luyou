/**

* Created by wangxin

* @date 2019/9/26 9:04

*/
<template>
  <div class="bg">
    <div class="signout" v-Clickoutside="()=>logOut()">
      <div class="tc">
        <div class="header">确认退出？</div>
        <div class="main">是否确认退出陆由？</div>
        <div class="footer">
          <el-button @click.stop="out">取消</el-button>
          <el-button @click.stop="signOut">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Component, Vue, Emit, Prop} from 'vue-property-decorator';
  import Clickoutside from "element-ui/src/utils/clickoutside";
  import { State, Action, namespace } from "vuex-class";
  const CreatorMod = namespace("creator");

  @Component({
    name: 'LogOut',
    directives: {
      Clickoutside
    },
  })
  export default class LogOut extends Vue {
    @CreatorMod.State("tab") tab; //当前选择的群组 默认第一个群组
    @CreatorMod.Action("tabHandle") tabHandle; //当前选择的群组  action修改方法
    @Prop({
      required:false,
      default:null
    }) logOutCb;

    //退出登录修改
    @Emit logOut(){
      this.cbFun('hide',false);
    }

    //退出登录取消
    @Emit out(){
      this.cbFun('hide',false);
    }

    //退出登录确认事件
    @Emit signOut(){
      this.tabHandle({
        tab:'我的创作',
      });
      window.sessionStorage.clear();
      this.$router.push("/main");
    }

    @Emit cbFun(type,val){
      if(typeof this.logOut==='function'){
        this.logOutCb(type,val);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .signout {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 2020;
    line-height: normal;
    .tc {
      width: 410px;
      height: 200px;
      background: rgba(255, 255, 255, 1);
      border-radius: 13px;
      padding: 26px 32px 20px 32px;
      .header {
        position: absolute;
        left: 32px;
        width: 100px;
        height: 28px;
        font-size: 20px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;
        cursor: pointer;
      }
      .main {
        margin:43px 0 15px 0;
        height: 60px;
        font-size: 16px;
        font-weight: 400;
        color: #999999;
        cursor: pointer;
        span {
          color: #fe7865;
        }
      }
      .footer {
        position: absolute;
        right: 32px;
        .el-button:first-child {
          width: 109px;
          height: 36px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 0.4);
          border-radius: 18px;
          border: 1px solid rgba(254, 120, 101, 0.4);
          line-height: 11px;
          font-size: 16px;
          font-weight: 500;
          color: rgba(254, 120, 101, 1);
          &:hover {
            color: rgba(254, 120, 101, 1);
          }
          &:focus {
            color: rgba(254, 120, 101, 1);
          }
        }

        .el-button:last-child {
          width: 110px;
          height: 36px;
          background: linear-gradient(
              90deg,
              rgba(255, 176, 158, 1) 0%,
              rgba(254, 120, 101, 1) 100%
          );
          border-radius: 18px;
          line-height: 11px;
          font-size: 16px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          border: none;
          &:hover {
            color: rgba(255, 255, 255, 1);
            border: none;
          }
          &:focus {
            color: rgba(255, 255, 255, 1);
            border: none;
          }
        }
      }
    }
  }

  .bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2019;
  }
</style>
