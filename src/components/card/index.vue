<template>
<el-card class="card">
    <img :src="require('@/assets/logo.png')" alt="" class="cardImage">
    <Layout>
        <div slot="topLeft">
            <h4>title</h4>
            <h5>something</h5>
            <p>write something</p>
        </div>
    </Layout>
</el-card>
</template>

<script>
import {
    Component,
    Vue
} from "vue-property-decorator";
import Layout from '../tableTriditionLayout';

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
