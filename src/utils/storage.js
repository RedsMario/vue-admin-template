/*
 * @Author: Mario
 * @Date: 2021-04-23 16:05:53
 * @Last Modified by: Mario
 * @Last Modified time: 2021-04-25 12:02:20
 */
import Cookies from 'js-cookie'
// 导入默认存储配置
import { storage } from '@/config/setting'
import { Message } from 'element-ui'

/**
 *  @description 操作本地存储时发生错误的提示消息
 */
const getError = (key, isTip, location) => {
  isTip && Message.error(`未发现存储在${location}上键为: ${key}的数据`)
}
const setError = (key, val, isTip, location) => {
  isTip && Message.error(`将键为: ${key},值为：${val}存储到${location}时,发生了错误!`)
}
const removeError = (key, isTip, location) => {
  isTip && Message.error(`移除${location}上的${key}时,发生了错误!`)
}

// 获取数据
const get = (key, isTip, location) => {
  const data = window[location].getItem(key)
  if (!data) {
    return getError(key, isTip, location)
  }
  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}
// 存储数据
const set = (key, val, isTip, location) => {
  try {
    if (typeof val === 'object') {
      window[location].setItem(key, JSON.stringify(val))
    } else {
      window[location].setItem(key, val)
    }
  } catch (error) {
    return setError(key, val, isTip, location)
  }
}
// 移除数据
const remove = (key, isTip, location) => {
  try {
    window[location].removeItem(key)
  } catch (error) {
    return removeError(key, isTip, location)
  }
}
/**
 *  @param 获取的键名
 *  @param 获取的位置
 *  @description 获取本地数据
 */
const getStorageLocation = (key, isTip, location) => {
  if (location === 'localStorage') {
    return get(key, isTip, location)
  } else if (location === 'sessionStorage') {
    return get(key, isTip, location)
  } else if (location === 'cookie') {
    return Cookies.get(key) || getError(key, isTip, location)
  } else {
    return get(key, isTip, 'localStorage')
  }
}

/**
 *  @param 设置的键名
 *  @param 设置的位置
 *  @description 设置本地数据
 */
const setStorageLocation = (key, val, isTip, location) => {
  if (location === 'localStorage') {
    return set(key, val, isTip, location)
  } else if (location === 'sessionStorage') {
    return set(key, val, isTip, location)
  } else if (location === 'cookie') {
    try {
      Cookies.set(key, val)
    } catch (error) {
      return setError(key, val, isTip, location)
    }
  } else {
    return set(key, val, isTip, 'localStorage')
  }
}

/**
 *  @param 移除的键名
 *  @param 移除的位置
 *  @description 移除本地数据
 */
const removeStorageLocation = (key, isTip, location) => {
  if (location === 'localStorage') {
    return remove(key, isTip, location)
  } else if (location === 'sessionStorage') {
    return remove(key, isTip, location)
  } else if (location === 'cookie') {
    try {
      Cookies.remove(key)
    } catch (error) {
      return removeError(key, isTip, location)
    }
  } else {
    return remove(key, isTip, 'localStorage')
  }
}

/**
 *  @param {String}  键名
 *  @param {Boolean} 是否提示错误信息，默认为true
 *  @param {String}  存储到哪里
 *  @description 获取本地存储值
 */
export const getItem = (key, isTip = true, dynaicStorage) => {
  if (dynaicStorage) {
    return getStorageLocation(key, isTip, dynaicStorage)
  } else if (storage) {
    return getStorageLocation(key, isTip, storage)
  } else {
    return getStorageLocation(key, isTip)
  }
}

/**
 *  @param {String} 键名
 *  @param {any} 值
 *  @param {Boolean} 是否提示错误信息，默认为true
 *  @param {String} 存储到哪里
 *  @description 设置本地存储值
 */
export const setItem = (key, val, isTip = true, dynaicStorage) => {
  if (dynaicStorage) {
    return setStorageLocation(key, val, isTip, dynaicStorage)
  } else if (storage) {
    return setStorageLocation(key, val, isTip, storage)
  } else {
    return setStorageLocation(key, val, isTip)
  }
}
/**
 *  @param {String} 键名
 *  @param {Boolean} 是否提示错误信息，默认为true
 *  @param {String} 位置
 *  @description 移除本地存储值
 */
export const removeItem = (key, isTip = true, dynaicStorage) => {
  if (dynaicStorage) {
    return removeStorageLocation(key, isTip, dynaicStorage)
  } else if (storage) {
    return removeStorageLocation(key, isTip, storage)
  } else {
    return removeStorageLocation(key, isTip)
  }
}
