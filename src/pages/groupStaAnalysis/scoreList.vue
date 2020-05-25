/**

* Created by wangxin

* @date 2019/8/20 11:26

*/
<template>
  <div class="record">
    <div class="title clearfix">
      成绩排名
      <div class="score" v-if="sortList != ''">
        平均分：
        <span style="color:#FE7865">{{coursePlanScoreAvg}}</span>
      </div>
    </div>
    <ul class="list">
      <li v-for="(item,index) in sortList" :key="item.memberName">
        <i :class="{'high':index<3}">{{index+1}}</i>
        <span class="name">{{item.memberName}}</span>
        <span class="score">{{item.score}}</span>
      </li>
      <li v-for="(item,index) in list" :key="item.id" v-if="sortList.length < 1 ">
        <i :class="{'high':index<3}">1</i>
        <span class="name">{{"-"}}</span>
        <span class="score">{{"-"}}</span>
      </li>
      <li v-for="(item,index) in list1" :key="item.id" v-if="sortList.length < 2 ">
        <i :class="{'high':index<3}">2</i>
        <span class="name">{{"-"}}</span>
        <span class="score">{{"-"}}</span>
      </li>
      <li v-for="(item,index) in list2" :key="item.id" v-if="sortList.length < 3 ">
        <i :class="{'high':index<3}">3</i>
        <span class="name">{{"-"}}</span>
        <span class="score">{{"-"}}</span>
      </li>
      <li v-for="(item,index) in list3" :key="item.id" v-if="sortList.length < 4 ">
        <i :class="{'high':index<0}">{{4}}</i>
        <span class="name">{{"-"}}</span>
        <span class="score">{{"-"}}</span>
      </li>
      <li v-for="(item,index) in list4" :key="item.id" v-if="sortList.length < 5 ">
        <i :class="{'high':index<0}">{{5}}</i>
        <span class="name">{{"-"}}</span>
        <span class="score">{{"-"}}</span>
      </li>
      <li v-for="(item,index) in list5" :key="item.id" v-if="sortList.length < 6 ">
        <i :class="{'high':index<0}">{{6}}</i>
        <span class="name">{{"-"}}</span>
        <span class="score">{{"-"}}</span>
      </li>
      <li v-for="(item,index) in list6" :key="item.id" v-if="sortList.length < 7 ">
        <i :class="{'high':index<0}">{{7}}</i>
        <span class="name">{{"-"}}</span>
        <span class="score">{{"-"}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
@Component({
  name: "ScoreList"
})
export default class ScoreList extends Vue {
  @Prop({
    default: () => {
      return [];
    },
    required: false
  })
  sortList;
  @Prop({
    required: false,
    default: ""
  })
  coursePlanScoreAvg;
  list = [{ id: 1 }];
  list1 = [{ id: 2 }];
  list2 = [{ id: 3 }];
  list3 = [{ id: 4 }];
  list4 = [{ id: 5 }];
  list5 = [{ id: 6 }];
  list6 = [{ id: 7 }];
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}
.record {
  .title {
    @include fontSet(14px, #999, 500);
    margin-bottom: 14px;
    .score {
      float: right;
    }
  }
  li {
    display: flex;
    align-items: center;
    margin-bottom: 22px;
    i {
      display: inline-block;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 10px;
      background: rgba(240, 242, 245, 1);
      @include fontSet(12px, rgba(0, 0, 0, 0.65), 500);
      margin-right: 24px;
    }
    span {
      @include fontSet(14px, rgba(0, 0, 0, 0.65), 500);
      font-size: 14px;
    }
    .name {
      display: inline-block;
      flex-grow: 1;
      width: 86px;
      margin-right: 16px;
    }
    .high {
      background: rgba(254, 120, 101, 1);
      color: #fff;
    }
  }
}
</style>
