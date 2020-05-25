<template>
<div class="admin">
    <System>
        <div slot="nav">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="select">
                <el-menu-item v-for="(item,index) in navList" :key="index" :index="('' + (index + 1))">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{item.label}}</span>
                </el-menu-item>
            </el-menu>
        </div>
    </System>
    <footer />
</div>
</template>

<script>
import {
    Component,
    Vue
} from "vue-property-decorator";
import System from "@/pages/index/systemIndex";

@Component({
    name: "admin",
    components: {
        System,
    }
})
export default class Admin extends Vue {
    navList = [
        {label:'工作台'},
        {label:'用户管理'},
        {label:'客户管理'},
        {label:'内容管理'},
        {label:'运营管理'}
    ]
    activeIndex = '1';

    select(...args){
        console.log(args)
    }
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.admin {}
</style>
