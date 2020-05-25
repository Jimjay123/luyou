<template>
    <div>
        {{$store.state.userinfo.tips[$route.query.type] || ''}}
    </div>
</template>
<script>
import {Component,Vue} from 'vue-property-decorator';

@Component({
    name:'tip'
})
export default class Tip extends Vue{
    
    
    mounted() {
        console.log(this.$store.state.userinfo.tips);
        console.log(this.$route.query)   
    }
}
</script>
<style lang="scss" scoped>

</style>

