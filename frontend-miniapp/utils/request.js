/**
 * API 请求封装
 * 统一处理请求、响应、错误
 */

import config from './config.js'

// Token 存储 key
const TOKEN_KEY = 'token'

/**
 * 获取存储的 Token
 * @returns {string|null}
 */
function getToken() {
	return uni.getStorageSync(TOKEN_KEY) || null
}

/**
 * 设置 Token
 * @param {string} token
 */
function setToken(token) {
	uni.setStorageSync(TOKEN_KEY, token)
}

/**
 * 移除 Token
 */
function removeToken() {
	uni.removeStorageSync(TOKEN_KEY)
}

/**
 * 显示加载提示
 * @param {string} title
 */
function showLoading(title = '加载中...') {
	uni.showLoading({
		title,
		mask: true
	})
}

/**
 * 隐藏加载提示
 */
function hideLoading() {
	uni.hideLoading()
}

/**
 * 显示提示
 * @param {string} title
 * @param {string} icon - success/error/none
 */
function showToast(title, icon = 'none') {
	uni.showToast({
		title,
		icon,
		duration: 2000
	})
}

/**
 * 请求拦截器
 * @param {Object} options
 * @returns {Object}
 */
function requestInterceptor(options) {
	// 添加 Token
	const token = getToken()
	if (token) {
		options.header = options.header || {}
		options.header['Authorization'] = `Bearer ${token}`
	}

	return options
}

/**
 * 响应拦截器
 * @param {Object} response
 * @returns {Object}
 */
function responseInterceptor(response) {
	const { statusCode, data } = response

	// HTTP 状态码判断
	if (statusCode === 200) {
		// 业务状态码判断
		if (data.code === 0 || data.code === 200) {
			return data.data
		} else {
			// 业务错误
			const error = new Error(data.message || '请求失败')
			error.code = data.code
			throw error
		}
	} else if (statusCode === 401) {
		// 未授权，清除 Token 并跳转登录
		removeToken()
		uni.reLaunch({
			url: '/pages/login/login'
		})
		throw new Error('登录已过期，请重新登录')
	} else if (statusCode === 403) {
		throw new Error('没有权限访问')
	} else if (statusCode === 404) {
		throw new Error('请求的资源不存在')
	} else if (statusCode >= 500) {
		throw new Error('服务器错误，请稍后重试')
	} else {
		throw new Error(data.message || '网络错误')
	}
}

/**
 * 统一请求方法
 * @param {Object} options
 * @param {string} options.url - 请求地址
 * @param {string} options.method - 请求方法
 * @param {Object} options.data - 请求数据
 * @param {Object} options.header - 请求头
 * @param {boolean} options.showLoading - 是否显示加载提示
 * @param {string} options.loadingText - 加载提示文字
 * @param {boolean} options.showError - 是否显示错误提示
 * @returns {Promise}
 */
function request(options) {
	const {
		url,
		method = 'GET',
		data = {},
		header = {},
		showLoading: shouldShowLoading = true,
		loadingText = '加载中...',
		showError: shouldShowError = true
	} = options

	// 显示加载提示
	if (shouldShowLoading) {
		showLoading(loadingText)
	}

	// 构建请求配置
	let requestConfig = {
		url: config.apiBaseUrl + url,
		method,
		data,
		header: {
			'Content-Type': 'application/json',
			...header
		},
		timeout: config.requestTimeout
	}

	// 请求拦截
	requestConfig = requestInterceptor(requestConfig)

	// 发起请求
	return new Promise((resolve, reject) => {
		uni.request({
			...requestConfig,
			success: (response) => {
				try {
					const result = responseInterceptor(response)
					resolve(result)
				} catch (error) {
					if (shouldShowError) {
						showToast(error.message)
					}
					reject(error)
				}
			},
			fail: (error) => {
				const err = new Error(error.errMsg || '网络请求失败')
				if (shouldShowError) {
					showToast(err.message)
				}
				reject(err)
			},
			complete: () => {
				if (shouldShowLoading) {
					hideLoading()
				}
			}
		})
	})
}

/**
 * GET 请求
 * @param {string} url
 * @param {Object} data
 * @param {Object} options
 */
function get(url, data = {}, options = {}) {
	return request({
		url,
		method: 'GET',
		data,
		...options
	})
}

/**
 * POST 请求
 * @param {string} url
 * @param {Object} data
 * @param {Object} options
 */
function post(url, data = {}, options = {}) {
	return request({
		url,
		method: 'POST',
		data,
		...options
	})
}

/**
 * PUT 请求
 * @param {string} url
 * @param {Object} data
 * @param {Object} options
 */
function put(url, data = {}, options = {}) {
	return request({
		url,
		method: 'PUT',
		data,
		...options
	})
}

/**
 * DELETE 请求
 * @param {string} url
 * @param {Object} data
 * @param {Object} options
 */
function del(url, data = {}, options = {}) {
	return request({
		url,
		method: 'DELETE',
		data,
		...options
	})
}

/**
 * 文件上传
 * @param {string} url
 * @param {string} filePath
 * @param {Object} formData
 * @param {Object} options
 */
function upload(url, filePath, formData = {}, options = {}) {
	const { showLoading: shouldShowLoading = true, loadingText = '上传中...' } = options

	if (shouldShowLoading) {
		showLoading(loadingText)
	}

	return new Promise((resolve, reject) => {
		const token = getToken()
		uni.uploadFile({
			url: config.apiBaseUrl + url,
			filePath,
			name: 'file',
			formData,
			header: {
				'Authorization': token ? `Bearer ${token}` : ''
			},
			success: (response) => {
				try {
					const data = JSON.parse(response.data)
					if (data.code === 0 || data.code === 200) {
						resolve(data.data)
					} else {
						throw new Error(data.message || '上传失败')
					}
				} catch (error) {
					reject(error)
				}
			},
			fail: (error) => {
				reject(new Error(error.errMsg || '上传失败'))
			},
			complete: () => {
				if (shouldShowLoading) {
					hideLoading()
				}
			}
		})
	})
}

export default {
	request,
	get,
	post,
	put,
	del,
	upload,
	getToken,
	setToken,
	removeToken,
	showToast,
	showLoading,
	hideLoading
}