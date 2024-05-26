<template>
    <div class="container">
        <div class="head">
            <a-row>
                <a-col :span="24">
                    <span>选择要审核的内容: </span>
                    <a-select style="width: 120px ;margin-left: 10px;margin-right: 10px;" @change="handleChange">
                        <a-select-option value="1" :disabled="AuthorityForm.article">
                            文章
                        </a-select-option>
                        <a-select-option value="2" :disabled="AuthorityForm.question">
                            问题
                        </a-select-option>
                        <a-select-option value="3" :disabled="AuthorityForm.answer">
                            回答
                        </a-select-option>
                    </a-select>
                    <a-button type="primary" @click="handleCheck">审核</a-button>
                </a-col>
            </a-row>
        </div>
        <br />
        <div class="body">
            <a-table :columns="columns" :data-source="data" bordered :row-key="(record) => record.id">
                <!-- 添加“操作”列的自定义渲染插槽 -->
                <template slot=operation slot-scope="record">
                    <!-- 按钮代码 -->
                    <a-button @click="handleInfo(record.id)">查看</a-button>
                    <a-button v-if="record.status == 0" type="primary" style="margin-left: 10px;margin-right: 10px;"
                        @click="handleUpdate(record.id, 1)">批准</a-button>
                    <a-button v-if="record.status == 0" type="danger" @click="handleUpdate(record.id, 2)">驳回</a-button>

                    <a-button type="danger" @click="handleDelete(record.id)" style="margin-left: 10px;">删除</a-button>

                </template>
            </a-table>
        </div>

        <div>
            <a-modal v-model="visible" title="详情" @ok="handleOk">
                <h1>{{ this.result.title }}</h1>
                <hr />
                <div class="result-view">
                    <v-md-editor :value="this.result.content" mode="preview"></v-md-editor>
                </div>
            </a-modal>
        </div>


    </div>
</template>

<script>
import { getList, getArticleById, getFaqById, upArticleById, upFaqById, delArticleById, delFaqById } from "@/api/check";
import { getUserInfo } from "@/api/admin";


const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '标题',
        className: 'column-title',
        dataIndex: 'title',
    },
    {
        title: '作者',
        className: 'column-author',
        dataIndex: 'author',
    },
    {
        title: 'tag',
        className: 'column-tag',
        dataIndex: 'tag',
    },
    {
        title: '操作',
        scopedSlots: { customRender: 'operation' }, // 添加操作列的自定义渲染
    }
];


export default {

    mounted() {
        this.getAuthority()
        //   this.handleCheck();
    },

    data() {
        return {
            type: '',
            data: [],
            columns,
            userInfo: {},
            AuthorityForm: {
                // 直接使用布尔值而不是字符串
                article: true,
                question: true,
                answer: true
            },
            visible: false,
            result: {},
        };
    },
    methods: {
        handleChange(value) {
            this.type = value
        },
        handleCheck() {
            getList(this.type).then(res => {
                if (res.data.code === 1) {
                    this.data = res.data.data
                }
            })
        },
        getAuthority() {
            getUserInfo().then(res => {
                if (res.data.code === 1) {
                    this.userInfo = res.data.data
                    console.log(this.userInfo)

                    if (this.userInfo.authority == 1) {
                        this.AuthorityForm.article = false
                    } else if (this.userInfo.authority == 2) {
                        this.AuthorityForm.question = false
                    }
                    else {
                        this.AuthorityForm.article = false
                        this.AuthorityForm.question = false
                        this.AuthorityForm.answer = false
                    }

                }
            })
        },
        handleOk(e) {
            console.log(e);
            this.visible = false;
        },
        handleInfo(id) {
            if (this.type == 1) {
                getArticleById(id).then(res => {
                    if (res.data.code === 1) {
                        this.result = res.data.data
                        this.visible = true
                    }
                })
            } else if (this.type == 2) {
                getFaqById(id).then(res => {
                    if (res.data.code === 1) {
                        this.result = res.data.data
                        this.visible = true
                    }
                })
            }
        },
        handleUpdate(id, status) {
            if (this.type == 1) {
                upArticleById(id, status).then(res => {
                    if (res.data.code === 1) {
                        alert("操作成功")
                        this.data = []
                        this.handleCheck()
                    }
                })
            } else if (this.type == 2) {
                upFaqById(id, status).then(res => {
                    if (res.data.code === 1) {
                        alert("操作成功")
                        this.data = []
                        this.handleCheck()
                    }
                })
            }
        },
        handleDelete(id) {
            if (this.type == 1) {
                delArticleById(id).then(res => {
                    if (res.data.code === 1) {
                        alert("删除成功")
                        this.data = []
                        this.handleCheck()
                    }
                })
            } else if (this.type == 2) {
                delFaqById(id).then(res => {
                    if (res.data.code === 1) {
                        alert("删除成功")
                        this.data = []
                        this.handleCheck()
                    }
                })

            }
        }
    },
};
</script>