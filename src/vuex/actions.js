import localforage from 'localforage'
import { isEmpty } from 'lodash'
import http from '../utils/http'
import * as TYPES from './mutations-types'

export const attemptLogin = ({ dispatch }, payload) =>
  http.post('/api/auth/login', payload)
    .then(({ access_token }) => {
      dispatch('setToken', access_token)
      return Promise.resolve()
    })
    .then(() => dispatch('loadUser'))

export const attemptRegister = ({ dispatch }, payload) =>
  http.post('/api/auth/register', payload)
    .then(({ token }) => {
      dispatch('setToken', token)
      return Promise.resolve()
    })
    .then(() => dispatch('loadUser'))

export const logout = ({ dispatch }) => {
  return localforage
    .removeItem("AuthToken")
    .then(dispatch('setToken', null))
    .then(dispatch('setUser', {}))
}

export const setUser = ({ commit }, user) => {
  commit(TYPES.SET_USER, user)
  Promise.resolve(user)
}

export const setToken = ({ commit }, payload) => {
  const token = isEmpty(payload) ? null : payload.token || payload
  commit(TYPES.SET_TOKEN, token)
  return Promise.resolve(token)
}

export const checkUserToken = ({ dispatch, state }) => {
  if (!isEmpty(state.token)) {
    return Promise.resolve(state.token)
  }
  return (
    localforage
      .getItem("AuthToken")
      .then(token => {
        if (isEmpty(token)) {
          return Promise.reject('NO_TOKEN')
        }
        return dispatch('setToken', token)
      })
      .then(() => dispatch('loadUser'))
  )
}

export const loadUser = ({ dispatch }) =>
  http.get('/api/me')
    .then(user => dispatch('setUser', user))
    .catch(logout)
