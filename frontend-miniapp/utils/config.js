/**
 * 配置文件
 * 管理API地址、应用配置等
 */

// 环境配置
const ENV = {
	DEV: 'development',
	TEST: 'test',
	PROD: 'production'
}

// 当前环境
const currentEnv = ENV.DEV

// API 基础地址配置
const API_BASE_URL = {
	[ENV.DEV]: 'http://localhost:3000/api',
	[ENV.TEST]: 'https://test-api.cangyingxiaoguan.com/api',
	[ENV.PROD]: 'https://api.cangyingxiaoguan.com/api'
}

// 应用配置
const APP_CONFIG = {
	// 应用名称
	appName: '苍蝇小馆',
	// 版本号
	version: '1.0.0',
	// 请求超时时间（毫秒）
	requestTimeout: 30000,
	// 分页配置
	pageSize: 20,
	// 图片上传配置
	upload: {
		maxSize: 5 * 1024 * 1024, // 5MB
		allowedTypes: ['jpg', 'jpeg', 'png', 'gif']
	}
}

export default {
	// 当前环境
	env: currentEnv,
	// API 基础地址
	apiBaseUrl: API_BASE_URL[currentEnv],
	// 应用配置
	...APP_CONFIG
}