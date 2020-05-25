<template>
<div class="authorizeList">
    <Layout>
        <div slot="topLeft">
            <h2>社会工作产品授权详细-社工产品对外试用</h2>
        </div>
        <div slot="topRight">
            <span>已授权产品总数：11</span>
            <el-button-group>
                <el-button>取消本类别全部授权</el-button>
                <el-button type="danger">授权本类别全部产品</el-button>
            </el-button-group>
        </div>
        <section slot="center" class="users">
            <h2 class="title">授权详情</h2>
        </section>
    </Layout>
    <Layout>
        <div slot="topLeft">
            <h4>敏捷新实训</h4>
        </div>
        <div slot="topRight">
            <span>已授权产品总数：11</span>
            <el-button-group>
                <el-button size="mini">取消本类别全部授权</el-button>
                <el-button type="danger" size="mini">授权本类别全部产品</el-button>
            </el-button-group>
        </div>
        <section slot="center" class="users">
            <el-table>
                <el-table-column type="index"></el-table-column>
                <el-table-column v-for="name in header" :key="name" :label="name" :prop="name" width="140"></el-table-column>
            </el-table>
        </section>
    </Layout>
    <Layout>
        <div slot="topLeft">
            <h4>敏捷新实践</h4>
        </div>
        <div slot="topRight">
            <span>已授权产品总数：11</span>
            <el-button-group>
                <el-button size="mini">取消本类别全部授权</el-button>
                <el-button type="danger" size="mini">授权本类别全部产品</el-button>
            </el-button-group>
        </div>
        <section slot="center" class="users">
            <el-table>
                <el-table-column type="index"></el-table-column>
                <el-table-column v-for="name in header" :key="name" :label="name" :prop="name" width="140"></el-table-column>
            </el-table>
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

@Component({
    name: "customAuthorizeList",
    components: {
        Layout
    }
})
export default class CustomAuthorizeList extends Vue {
    header = ['操作时间','学校','功能模块','修改类型','修改人','备注']

}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.authorizeList {
    @include relative();
    width: 100%;
    h2.title{
        text-align: center;
        border-bottom:solid 1px #333;
        margin:3rem 0;
    }

    h2{
        margin:0;
        line-height: 2rem;
    }

    h4{
        margin:0;
        line-height: 1rem;
    }
    .el-table{
        margin: 1rem 0;
    }
    .el-col {
        @include flex(1, row);

        .el-input {
            width: 70%
        }
    }
}
</style>
