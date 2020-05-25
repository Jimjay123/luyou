<template>
    <div class="page">
        <section class="headMenu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item v-for="(item,index) in menuList" :index="'' + (index + 1)"  :key="index">{{item}}</el-menu-item>
            </el-menu>
        </section>
        <section class="infoDetail">
            <router-view/>
        </section>
    </div>
</template>
<script>
import {Component,Vue} from 'vue-property-decorator';

@Component({
    name:'userinfo'
})
export default class UserInfo extends Vue{
    menuList = ['个人资料','身份认证','安全设置','偏好设置']
    activeIndex = '1'

    created(){
        ['detail','idCard','security'].forEach((item,index)=>{
            if(new RegExp(item).test(location.href)){
                this.activeIndex = '' + (index+1)
                console.log(item,index);
            }
        })

        console.log(this.activeIndex)
    }

    handleSelect(...args){
        console.log(args)
        let map = {
            '1':'detail',
            '2':'idCard',
            '3':'security',
            '4':'favor',
        }
        this.$router.push(`/userinfo/${map[args[0]]}`);
    }
}
</script>
<style lang="scss" scoped>

</style>

