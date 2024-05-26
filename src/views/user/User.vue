<template>
  <div class="container">
    <div class="body">
      <a-table :columns="columns" :data-source="data" bordered :row-key="(record) => record.id">
        <template slot="avatar" slot-scope="record">
          <img :src="record.avatar" style="width: 50px; height: 50px;" />
        </template>

        <template slot="status" slot-scope="record">
          <span v-if="record.status == 1" style="color: green;">正常</span>
          <span v-if="record.status == 0" style="color: red;">封禁</span>
        </template>

        <!-- 添加“操作”列的自定义渲染插槽 -->
        <template slot=operation slot-scope="record">
          <!-- 按钮代码 -->
          <a-button v-if="record.status == 1" @click="handleBan(record.id, 0)" style="margin-left: 10px;">封禁</a-button>

          <a-button v-if="record.status == 0" @click="handleBan(record.id, 1)" style="margin-left: 10px;">解禁</a-button>

          <a-button type="danger" @click="handleDelete(record.id)" style="margin-left: 10px;">删除</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>

import { getUserList, banUserById } from '@/api/check'

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
  }, {
    title: '头像',
    scopedSlots: { customRender: 'avatar' },
  }, {
    title: '邮箱',
    className: 'column-email',
    dataIndex: 'email',
  },
  {
    title: '状态',
    className: 'column-status',
    scopedSlots: { customRender: 'status' },
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' }, // 添加操作列的自定义渲染
  }
];

const data = [];


export default {

  mounted() {
    this.getUser()
  },
  data() {
    return {
      columns,
      data,
    }
  },
  methods: {
    getUser() {
      getUserList().then(res => {
        if (res.data.code === 1) {
          this.data = res.data.data
        } else {
          alert("获取用户列表失败")
        }
      })
    },
    handleBan(id, status) {
      alert(id, status)
      banUserById({id, status}).then(res => {
        if (res.data.code === 1) {
          alert("操作成功")
          this.data = []
          this.getUser()
        } else {
          alert("操作失败")
        }
      })
    },
  },
}
</script>

<style></style>