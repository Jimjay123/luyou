<template>
<div class="customAccount">
    <Layout>
        <div slot="topLeft">
            <h2>管理员账户列表～</h2>
        </div>
        <div slot="topRight">
            <el-button>申请列表</el-button>
        </div>
        <section slot="center" class="users">
            <span>当前管理员账户数量:11</span>
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
    name: "customAccount",
    components: {
        Layout
    }
})
export default class CustomAccount extends Vue {
    header = ['姓名','账户状态','手机号码','电子邮箱','学院','专业','职称','职务','操作']

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
