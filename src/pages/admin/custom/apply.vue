<template>
<div class="apply">
    <Layout>
        <div slot="topLeft">
            <h2>认证审核</h2>
        </div>
        <section slot="center" class="users">
            <el-row :gutter="20" style="margin:20px 0">
                <el-col :span="6">
                    申请时间：<el-input></el-input>
                </el-col>
                <el-col :span="6">
                    申请类型：<el-input></el-input>
                </el-col>
                <el-col :span="6">
                    申请状态：<el-input></el-input>
                </el-col>
                <el-col :span="6">
                    申请人：<el-input></el-input>
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
    name: "customApply",
    components: {
        Layout
    }
})
export default class CustomApply extends Vue {
    header = ['申请时间','申请类型','申请状态','申请人','学校','处理时间','处理人','操作']

}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.custom {
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
