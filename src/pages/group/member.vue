<template>
<div class="member pages">
    <section class="btnList">
        <el-checkbox v-model="checkAll">全选</el-checkbox>
        <el-button type="danger" plain size="mini">删除</el-button>
        <el-button type="success">批准</el-button>
        <el-button type="danger">拒绝</el-button>
        <el-button type="danger" class="floatRight">
            <i class="el-icon-plus" /> 邀请
        </el-button>
    </section>
    <section class="table">
        <el-table :show-header="false" :data="tableData">
            <el-table-column type="selection"></el-table-column>
            <el-table-column v-if="item != 'head' && item != 'inside'" :prop="item" label="日期" width="160" v-for="(item,index) in talbeHeader" :key="index"></el-table-column>
            <el-table-column v-else-if="item == 'head'" width="50" label="123">
                <template slot-scope="scope">
                    <img :src="require('@/assets/logo.png')" alt="" class="head">
          </template>
            </el-table-column>
            <el-table-column v-else>
                <template slot-scope="scope">
                    <div v-if="scope.row[item]">
                        <span>同意</span>
                        <span>拒绝</span>
                    </div>
                    <div v-else>
                        <i class="el-icon-delete" />
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </section>
</div>
</template>

<script>
import {
    Component,
    Vue
} from "vue-property-decorator";

@Component({
    name: "member"
})
export default class Member extends Vue {
    checkAll = false;
    talbeHeader = ["head", "name", "number", "mobile", "team", "job", "inside"];
    tableData = [{
            head: "",
            name: "users",
            number: "123466",
            mobile: "13333333333",
            team: "team1",
            job: "member",
            inside: false
        },
        {
            head: "",
            name: "users",
            number: "123466",
            mobile: "13333333333",
            team: "team1",
            job: "member",
            inside: true
        },
        {
            head: "",
            name: "users",
            number: "123466",
            mobile: "13333333333",
            team: "team1",
            job: "member",
            inside: true
        }
    ];
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.member {
    @include relative();
    padding: 20px 30px;
    width: 100%;

    .floatRight {
        float: right;
    }

    .head {
        @include border(0, #fff, 50%);
        width: 30px;
        height: 30px;
    }
}
</style>
