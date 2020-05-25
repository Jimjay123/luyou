<template>
<div class="create">
    <Layout>
        <div slot="topLeft">
            <el-col :span="10">
                <el-input placeholder="未命名课程"></el-input>
            </el-col>
        </div>
        <div slot="topRight">
            <el-button type="primary">课程详细页面</el-button>
            <el-button type="primary">课程规划信息</el-button>
        </div>
        <div slot="center" style="margin-top:20px;">
            <div class="view">
                这里是ppt编辑页面{{$route.meta.type}}
            </div>

        </div>
    </Layout>
</div>
</template>

<script>
import {
    Component,
    Vue
} from "vue-property-decorator";
import Layout from "@/components/tableTriditionLayout";
import Card from '@/components/card';

@Component({
    name: "creatorCreate",
    components: {
        Layout,
        Card
    }
})
export default class CreatorCreate extends Vue {
    drop = "";
    select = [{
        label: "123",
        value: "123"
    }, {
        label: "234",
        value: "234"
    }];
    cardList = [1,2,3,4]
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.create {
    width: 100%;
    height: 600px;
    margin-top: 20px;
    .view{
        width:100%;
        overflow: auto;
        height:500px;
        background:#ccc;
        @include flex(1)
    }
}
</style>
