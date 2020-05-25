<template>
<el-card class="card">
    <img :src="require('@/assets/logo.png')" alt="" class="cardImage">
    <h4>标题</h4>
    <p>内容</p>
    <Layout>
        <section slot="center">
            <el-button-group style="width:100%">
                <el-button style="width:50%"><i class="el-icon-document"></i></el-button>
                <el-button style="width:50%"><i class="el-icon-edit"></i></el-button>
            </el-button-group>
        </section>
    </Layout>
</el-card>
</template>

<script>
import {
    Component,
    Vue
} from "vue-property-decorator";
import Layout from '@/components/tableTriditionLayout';

@Component({
    name: "card",
    components: {
        Layout
    }
})
export default class Card extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.card {
    @include relative();
    float:left;
    margin:10px;
    width:15vw;
    .cardImage {
        width: 150px;
        height: 150px;

    }

    h4,
    h5,
    p {
        margin: 5px 0;
    }
}
</style>
