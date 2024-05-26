import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/admin/userinfo',
    method: 'get',
  })
}

export function getAdminList() {
  return request({
    url: '/admin/list',
    method: 'get',
  })
}

export function updateAdmin(data) {
  return request({
    url: '/admin/update',
    method: 'post',
    data: data
  })
}