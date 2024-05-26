<template>
    <div class="Box">
        <div class="left">
            <div class="centerBox">
                <img src="https://img0.baidu.com/it/u=2804005887,994501744&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200"
                    alt="">
                <h4>后台管理系统</h4>
            </div>
        </div>
        <div class="right">
            <a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit">
                <a-form-item>
                    <a-input v-decorator="[
                        'userName',
                        { rules: [{ required: true, message: 'Please input your username!' }] },
                    ]" placeholder="Username">
                        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input v-decorator="[
                        'password',
                        { rules: [{ required: true, message: 'Please input your Password!' }] },
                    ]" type="password" placeholder="Password">
                        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit" class="login-form-button">
                        Log in
                    </a-button>
                </a-form-item>
            </a-form>

        </div>
    </div>
</template>

<script>
import { login } from "@/api/admin";
import { setToken } from "@/utils/auth";

export default {
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'normal_login' });
    },


    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    this.loginForm.username = values.userName;
                    this.loginForm.password = values.password;
                    this.submitForm();
                }
            });
        },
        //调用登录后端接口
        submitForm() {
            login(this.loginForm).then((result) => {
                console.log(result)
                console.log(result.data.code)
                if (result.data.code == 1) {
                    setToken(result.data.data.token);
                    alert(result.data.data.token)
                    console.log('login success');
                    this.$router.push('/home');
                } else {
                    this.$message.error(result.data.msg);
                    this.loading = false
                }
            })
        }
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    height: 100vh;
    background-color: aquamarine;
    background: url("https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1") no-repeat;
    background-size: cover;
}

.Box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 550px;
    height: 330px;
    display: flex;
}

.left {
    position: relative;
    width: 50%;
    height: 100%;
    background-color: rgba(57, 99, 134, 0.75);
}

.right {
    position: relative;
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
}

.centerBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    text-align: center;
}

.left img {
    width: 50px;
    height: 50px;
    margin-bottom: 5px;
}

.left p {
    font-size: 14px;
    color: #fff;
}

.left h4 {
    font-size: 18px;
    color: #fff;
    margin-bottom: 10px;
}

.right form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    text-align: center;
}

h3 {
    margin-bottom: 20px;
}

input {
    width: 100%;
    height: 30px;
    border: 1px solid #767676;
    background-color: transparent;
    padding-left: 10px;
    font-size: 12px;
    color: #000000;
    margin-bottom: 15px;
    outline: none;
}

.loginBtn {
    width: 100%;
    height: 35px;
    line-height: 32px;
    text-align: center;
    font-size: 15px;
    color: #fff;
    border-radius: 6px;
    background: rgb(57, 99, 134);
    outline: none;
    border: none;
    margin-top: 10px;
}

.no {
    cursor: pointer;
    margin-top: 30px;
    text-align: center;
    font-size: 12px;
    color: #828282;
}
</style>