<template>
<div class="authorize">
    <Layout>
        <div slot="topLeft">
            <h2>功能授权记录</h2>
        </div>
        <div slot="topRight">
            <el-button type="danger">添加</el-button>
        </div>
        <section slot="center" class="users">
            <el-row :gutter="20" style="margin:20px 0">
                <el-col :span="6">
                    学校：<el-input></el-input>
                </el-col>
                <el-col :span="6">
                    功能模块：<el-input></el-input>
                </el-col>
                <el-col :span="6">
                    修改类型：<el-input></el-input>
                </el-col>
                <el-col :span="6">
                    备注：<el-input></el-input>
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
    name: "customAuthorize",
    components: {
        Layout
    }
})
export default class CustomAuthorize extends Vue {
    header = ['操作时间','学校','功能模块','修改类型','修改人','备注']

}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.authorize {
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
