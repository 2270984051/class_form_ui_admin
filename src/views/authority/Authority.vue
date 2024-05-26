<template>
    <div class="container">
        <div class="body">
            <a-table :columns="columns" :data-source="data" bordered :row-key="(record) => record.id">

                <template slot="authority" slot-scope="record">
                    <a-radio-group v-model="record.authority">
                        <a-radio :value="1">文章区管理员</a-radio>
                        <a-radio :value="2">提问区管理员</a-radio>
                        <a-radio :value="3">总审核</a-radio>
                    </a-radio-group>
                </template>

                <!-- 添加“操作”列的自定义渲染插槽 -->
                <template slot=operation slot-scope="record">
                    <!-- 按钮代码 -->
                    <a-button @click="handleUpdate(record.id, record.authority)"
                        style="margin-left: 10px;">提交</a-button>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script>
import { getAdminList, updateAdmin } from "@/api/admin";

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '用户名',
        className: 'column-username',
        dataIndex: 'username',
    },
    {
        title: '权限',
        className: 'column-authority',
        scopedSlots: { customRender: 'authority' },
    },
    {
        title: '操作',
        scopedSlots: { customRender: 'operation' }, // 添加操作列的自定义渲染
    }
];

const data = [];

export default {
    mounted() {
        this.getList();
    },
    data() {
        return {
            columns,
            data,
        }
    },
    methods: {

        getList() {
            getAdminList().then(res => {
                if (res.data.code === 1) {
                    this.data = res.data.data
                } else {
                    alert("获取用户列表失败")
                }
            })
        },
        handleUpdate(id, authority) {
            updateAdmin({ id, authority }).then(res => {
                if (res.data.code === 1) {
                    alert("操作成功")
                    this.data = []
                    this.getList()
                } else {
                    alert("操作失败")
                }
            })
        },
    }

}
</script>

<style></style>