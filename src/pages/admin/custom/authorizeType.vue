<template>
<div class="authorizeType">
    <Layout>
        <div slot="topLeft">
            <h2>社会工作标准课产品授权列表</h2>
        </div>
        <div slot="topRight">
            <el-button type="danger">添加</el-button>
        </div>
        <section slot="center" class="users">
            <el-row :gutter="20" style="margin:20px 0">
                <el-col :span="6">
                    产品名称：<el-input></el-input>
                </el-col>
                <el-col :span="6">
                    授权状态：<el-input></el-input>
                </el-col>
                <el-col :span="6">
                    到期时间：<el-input></el-input>
                </el-col>
                <el-col :span="6">
                    修改时间：<el-input></el-input>
                </el-col>
            </el-row>
            <el-button type="danger" style="float:right;margin:20px;">搜索</el-button>
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
    name: "customAuthorizeType",
    components: {
        Layout
    }
})
export default class CustomAuthorizeType extends Vue {
    header = ['产品名称','授权状态','是否在校内公开','授权到期时间','最近一次修改人','最近一次修改时间','操作']

}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.authorizeType {
    @include relative();
    width: 100%;

    .el-col {
        @include flex(1, row);

        .el-input {
            width: 70%
        }
    }
}
</style>
