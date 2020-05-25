<template>
<div class="users">
    <img :src="require('@/assets/demo.png')" alt="">
</div>
</template>

<script>
import {
    Component,
    Vue
} from "vue-property-decorator";
import Layout from "@/components/tableTriditionLayout";
import Card from './card';

@Component({
    name: "users",
    components: {
        Layout,
        Card
    }
})
export default class Users extends Vue {

}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.users {
    @include relative();
    width: 100%;
    img{
        width:100%;
    }

    .el-col {
        @include flex(1, row);

        .el-input {
            width: 70%;
        }
    }
}
</style>
