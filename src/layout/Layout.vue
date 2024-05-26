<template>
    <a-layout id="components-layout-demo-custom-trigger" style="height: 100vh">
        <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
            <div class="logo" />
            <a-menu theme="dark" mode="inline" :default-selected-keys="['1']" @click="handleClick">
                <a-menu-item key="1">
                    <a-icon type="switcher" />
                    <span>审核</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <a-icon type="user" />
                    <span>用户管理</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <a-icon type="setting" />
                    <span>系统详情</span>
                </a-menu-item>

                <a-menu-item key="4" v-if="userInfo.authority == 5">
                    <a-icon type="control" />
                    <span>权限管理</span>
                </a-menu-item>

            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="() => (collapsed = !collapsed)" />
            </a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
import { getUserInfo } from "@/api/admin";
export default {
    mounted() {
        getUserInfo().then(res => {
            if (res.data.code === 1) {
                this.userInfo = res.data.data
            }
        })
    },
    data() {
        return {
            collapsed: false,
            userInfo: {},
        };
    }, methods: {
        handleClick(e) {
            console.log('click ', e);
            if (e.key === "1") {
                this.$router.push('/check');
            } else if (e.key === "2") {
                this.$router.push('/user');
            } else if (e.key === "3") {
                this.$router.push('/system');
            } else {
                this.$router.push('/authority');
            }
        },
    },
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
}
</style>import { getCurrentInstance } from "vue";
