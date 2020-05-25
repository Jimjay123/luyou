<template>
<div class="loginBox">
    <h3>{{shown[type].title}}</h3>
    <section v-if="!$route.meta.showQr">
        <el-row>
            <el-col :span="20" :offset="2">
                <el-input v-model="username" :type="shown[type].type0" :placeholder="shown[type].placeholder0"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20" :offset="2">
                <el-input v-model="pwd" :type="shown[type].type1" :placeholder="shown[type].placeholder1"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-button @click="leftButtonHandle" v-if="shown[type].button0">{{shown[type].button0}}</el-button>
            </el-col>
            <el-col :span="10">
                <el-button @click="rightButtonHandle" v-if="shown[type].button1">{{shown[type].button1}}</el-button>
            </el-col>
        </el-row>
    </section>
    <section v-else>
        <div class="qr"></div>
    </section>
</div>
</template>

<script>
import {
    Component,
    Vue
} from "vue-property-decorator";
import {login} from '../../../service/index.js'

@Component({
    name: "login"
})
export default class Login extends Vue {
    type = "";
    shown = {
        login: {
            title: "登录",
            button0: "登录",
            button1: "使用验证码登录",
            type0: "text",
            type1: "password",
            placeholder0: "手机号",
            placeholder1: "密码"
        },
        register: {
            title: "创建您的陆由云账号",
            button0: "下一步",
            type0: "text",
            type1: "text",
            placeholder0: "手机号",
            placeholder1: "验证码"
        },
        setPwd: {
            title: "设置您的密码",
            button0: "重设密码",
            button1: "跳过，以后再说",
            type0: "password",
            type1: "password",
            placeholder0: "密码",
            placeholder1: "重设密码"
        },
        forget: {
            title: "忘记密码？",
            button0: "下一步",
            type0: "text",
            type1: "password",
            placeholder0: "手机号",
            placeholder1: "验证码"
        },
        loginQr:{
            title:'微信登录'
        },
        bindMobile:{
            title:'绑定手机号'
        },
        releaseMobile:{
            title:'解绑手机号'
        },
        validMobile:{
            title: "验证手机号",
            button0: "下一步",
            type0: "text",
            type1: "text",
            placeholder0: "手机号",
            placeholder1: "验证码"
        }
    };
    username = "";
    pwd = "";

    created() {
        this.type = this.$route.meta.type;
        if(this.$route.meta.type == 'loginQr'){
            this.shown.loginQr.title = this.$route.query.source || '微信登录';
        }
      login();
    }
    leftButtonHandle() {
        switch (true) {
            case type == "login":
                break;
            case type == "register":
                break;
            case type == "setPwd":
                break;
            case type == "forget":
                break;
        }
        //this.route();
    }

    route() {
        this.$router.push({
            path: "/tip",
            query: {
                type: this.type
            }
        });
    }

    rightButtonHandle() {}
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.loginBox {
    width: 400px;
    height: 300px;
    @include absolute(0, 0, 0, 0);
    margin: auto;
    text-align: center;
    @include border(1px, #333, 4px);

    .el-row {
        margin-bottom: 20px;
    }
    .qr{
        width: 200px;
        height:200px;
        margin: 20px auto;
        background:#333;
    }
}
</style>
