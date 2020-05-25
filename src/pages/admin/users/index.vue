<template>
<div class="users">
    <Layout>
        <div slot="topLeft">
            <h2>课程中心</h2>
        </div>
        <div slot="topRight">
            <el-button>创建账号</el-button>
        </div>
        <section slot="center" class="users">
            <el-row :gutter="20" style="margin:20px 0">
                <el-col :span="6">
                    用户名：<el-input></el-input>
                </el-col>
                <el-col :span="6">
                    手机：<el-input></el-input>
                </el-col>
                <el-col :span="6">
                    邮箱：<el-input></el-input>
                </el-col>
                <el-col :span="6">
                    状态：<el-input></el-input>
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
    name: "users",
    components: {
        Layout
    }
})
export default class Users extends Vue {
    header = ['姓名','手机号','电子邮箱','账户状态','用户角色','加入的学校','学校中的角色','操作']

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
            width: 70%
        }
    }
}
</style>
