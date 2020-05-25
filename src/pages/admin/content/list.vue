<template>
<div class="users">
    <Layout>
        <div slot="topLeft">
            <h2>社会工作</h2>
        </div>
        <div slot="topRight" style="width:100%">
            <el-row style="width:25vw;">
                <el-col :span="16">
                    <el-input placeholder="搜索" style="width:100%"></el-input>
                </el-col>
                <el-col :span="8">
                    <el-button-group>
                        <el-button>搜索</el-button>
                        <el-button type="danger">新建</el-button>
                    </el-button-group>
                </el-col>
            </el-row>
        </div>
        <section slot="center" class="users">
            <Card v-for="(item,index) in demoList" :key="index"/>
        </section>
    </Layout>
</div>
</template>

<script>
import {
    Component,
    Vue
} from "vue-property-decorator";
import Layout from "@/components/tableTriditionLayout";
import Card from './card';

@Component({
    name: "users",
    components: {
        Layout,
        Card
    }
})
export default class Users extends Vue {
    demoList = Array.from({length:16});
    
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.users {
    @include relative();
    width: 100%;

    .el-col {
        @include flex(1, row);

        .el-input {
            width: 70%;
        }
    }
}
</style>
