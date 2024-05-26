import request from '@/utils/request'

export function getList(type) {
    return request({
        url: '/admin/check/' + type,
        method: 'get',
    })
}

export function getArticleById(id) {
    return request({
        url: '/admin/article/' + id,
        method: 'get',
    })
}

export function getFaqById(id) {
    return request({
        url: '/admin/faq/Info/' + id,
        method: 'get',
    })
}

export function upArticleById(id, status) {
    return request({
        url: '/admin/article/',
        method: 'post',
        data: {
            id: id,
            status: status
        }
    })
}

export function upFaqById(id, status) {
    return request({
        url: '/admin/faq/Info/',
        method: 'post',
        data: {
            id: id,
            status: status
        }
    })
}

export function delArticleById(id) {
    return request({
        url: '/admin/article/' + id,
        method: 'post',
    })
}

export function delFaqById(id) {
    return request({
        url: '/admin/faq/Info/' + id,
        method: 'post',
    })
}


export function getUserList() {
    return request({
        url: '/admin/user',
        method: 'get',
    })
}
export function banUserById(data) {
    return request({
        url: '/admin/user',
        method: 'post',
        data: data
    })
}