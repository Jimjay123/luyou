<template>
<div class="step2">
    <el-row>
        <el-input placeholder="课程名称"></el-input>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="12">
            <el-select v-model="sel" placeholder="所属学校">
                <el-option v-for="data in select" :key="data.label" :value="data.value" :label="data.label"></el-option>
            </el-select>
        </el-col>
        <el-col :span="12">
            <el-select v-model="sel" placeholder="专业领域">
                <el-option v-for="data in select" :key="data.label" :value="data.value" :label="data.label"></el-option>
            </el-select>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <el-select v-model="sel" placeholder="班级选择">
                <el-option v-for="data in select" :key="data.label" :value="data.value" :label="data.label"></el-option>
            </el-select>
        </el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="12">
            <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
        </el-col>
        <el-col :span="12">
            <el-select v-model="sel" placeholder="是否小组课程计划">
                <el-option v-for="data in select" :key="data.label" :value="data.value" :label="data.label"></el-option>
            </el-select>
        </el-col>
    </el-row>
    <el-row>
        <el-input type="textarea" placeholder="摘要信息"></el-input>
    </el-row>
    <el-row>
        <el-button>提交</el-button>
    </el-row>
</div>
</template>

<script>
import {
    Component,
    Vue
} from "vue-property-decorator";

@Component({
    name: "step2"
})
export default class Step2 extends Vue {
    select = [{
            label: "1",
            value: "2"
        },
        {
            label: "2",
            value: "3"
        }
    ];
    sel = ""
    value1 = ''
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.step2 {
    @include relative();
    @include setPadding();
    width: 70%;

    .block {
        @include setMargin();
        overflow: auto;
    }

    .el-row {
        margin-bottom: 20px;
    }
}
</style>
