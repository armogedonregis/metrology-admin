import axios from 'axios'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { isServerForService } from './server'
import { NextPageContext } from 'next'
import Router from 'next/router'

export const isAuth = async ({ req, res }: NextPageContext) => {
  const token = getCookie('token', { req, res })

  try {
    if (!token) {
      return false
    }
    const response = await axios.get(isServerForService + '/api/user', {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!response.data) {
      deleteCookie('token')
      return false
    }
    if(response.data) {
      return response.data
    }
  } catch (error) {
    deleteCookie('token')
    return false
  }
  return {}
}

export const authLogin = async ({ token }) => {
  setCookie('token', token, { maxAge: 60 * 60 * 24 })
}

export const authLogout = () => {
  deleteCookie('token')
  Router.push('/login')
}
