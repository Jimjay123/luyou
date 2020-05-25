/* *

* Created by wangxin

* @date 2019/8/9 16:49

*/
<template>
  <div class="add">
    成员删除成功。<span id="groupRecall" @click="recall">[撤回]</span>
  </div>
</template>

<script>
  import {Component, Vue, Emit, Watch} from "vue-property-decorator";
  import {cloneObj, tokenFun, tipsFail} from '../../utils/utils';
  import {
    groMemCanRemove, groMemGroMemList
  } from '../../service/groupApi';
  import {State, Action, namespace} from 'vuex-class';

  const GroupMod = namespace('group');
  @Component({
    name: "recall",
    components: {}
  })
  export default class Recall extends Vue {
    @GroupMod.Action('groMemListHandle') groMemListHandle;//当前选择的群组 所有群成员list  action修改方法

    @GroupMod.State('selGroup') selGroup;//当前选择的群组 默认第一个群组

    @GroupMod.State('delStuId') delStuId;//已删除学生 缓存信息
    @GroupMod.Action('delStuIdHandle') delStuIdHandle;//已删除学生 缓存信息  action修改方法

    data = {id: '', memberName: ''};

    timer = null;//定时器方法
    count = 6;//定时器计时

    //监听 delStuId 变化
    @Watch('delStuId', {immediate: true, deep: true}) testFun() {
      console.log('监听方法实现');
      clearInterval(this.timer);
      this.count=6;
      console.log('this.delStuId.groupId',this.delStuId.groupId);
      if(this.delStuId.groupId===''||this.delStuId.groupId===undefined){
        return ;
      }
      this.timer=setInterval(this.setTime,1000);
    }

    //定时器方法
    @Emit setTime(){
      console.log(this.count);
      if(this.count>0){
        this.count--;
      }else{
        this.delStuIdHandle({
          groupId:'',
          memberId:'',
          show:false,//被删除后 撤回提示框 true 显示 false 隐藏
        });
        clearInterval(this.timer);
        this.count=0;
      }
    }

    //撤回按钮
    @Emit recall() {
      //撤回接口
      groMemCanRemove({
        groupId: this.delStuId.groupId,
        memberId: this.delStuId.memberId
      }).then((res) => {
        if (res.code == '0') {
          //如果当前展示群是 删除学生的群 更新群成员
          if (this.selGroup.id == this.delStuId.groupId) {
            this.groMemGroMemListFun(this.delStuId.groupId);
          }
          //清除缓存的 已删除学生信息
          this.delStuIdHandle({
            groupId: '',
            memberId: '',
          });
        } else {
          tipsFail(res.msg);
        }
      });
    }

    //获取群成员列表接口
    @Emit groMemGroMemListFun(id) {
      groMemGroMemList({groupId: id}).then((res) => {
        if (res.code == '0') {
          this.groMemListHandle({
            groMemList: res.list
          })
        } else {
          tipsFail(res.msg)
        }
      })
    }

    created() {
      this.data = this.$route.query.data;
    }

    updated() {

    }
  }

</script>

<style lang="scss" scoped>
  @mixin fontSet($s,$c,$w) {
    font-size: $s;
    color: $c;
    font-weight: $w;
  }

  .add {
    position: fixed;
    top: 100px;
    left: calc(50% - 60px);
    width: 137px;
    height: 23px;
    text-align: center;
    line-height: 23px;
    background: rgba(51, 51, 51, 0.44);
    border-radius: 4px;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
  }
</style>
