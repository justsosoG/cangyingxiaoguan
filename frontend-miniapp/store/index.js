/**
 * 状态管理
 * 使用 Vue 响应式数据实现简单的状态管理
 * 如需更复杂的状态管理，可迁移到 Vuex 或 Pinia
 */

import Vue from 'vue'

// 状态存储
const state = Vue.observable({
	// 用户信息
	userInfo: null,
	// 登录状态
	isLoggedIn: false,
	// 当前位置
	location: null,
	// 馆子列表
	restaurantList: [],
	// 当前选中的馆子
	currentRestaurant: null
})

// Getters
const getters = {
	userInfo: () => state.userInfo,
	isLoggedIn: () => state.isLoggedIn,
	location: () => state.location,
	restaurantList: () => state.restaurantList,
	currentRestaurant: () => state.currentRestaurant
}

// Actions
const actions = {
	/**
	 * 设置用户信息
	 * @param {Object} userInfo
	 */
	setUserInfo(userInfo) {
		state.userInfo = userInfo
		state.isLoggedIn = !!userInfo
	},

	/**
	 * 清除用户信息
	 */
	clearUserInfo() {
		state.userInfo = null
		state.isLoggedIn = false
	},

	/**
	 * 设置当前位置
	 * @param {Object} location
	 */
	setLocation(location) {
		state.location = location
	},

	/**
	 * 设置馆子列表
	 * @param {Array} list
	 */
	setRestaurantList(list) {
		state.restaurantList = list
	},

	/**
	 * 添加馆子到列表
	 * @param {Object} restaurant
	 */
	addRestaurant(restaurant) {
		state.restaurantList.unshift(restaurant)
	},

	/**
	 * 更新馆子信息
	 * @param {Object} restaurant
	 */
	updateRestaurant(restaurant) {
		const index = state.restaurantList.findIndex(item => item.id === restaurant.id)
		if (index !== -1) {
			state.restaurantList.splice(index, 1, restaurant)
		}
	},

	/**
	 * 从列表中删除馆子
	 * @param {number} id
	 */
	removeRestaurant(id) {
		const index = state.restaurantList.findIndex(item => item.id === id)
		if (index !== -1) {
			state.restaurantList.splice(index, 1)
		}
	},

	/**
	 * 设置当前选中的馆子
	 * @param {Object} restaurant
	 */
	setCurrentRestaurant(restaurant) {
		state.currentRestaurant = restaurant
	},

	/**
	 * 清除当前选中的馆子
	 */
	clearCurrentRestaurant() {
		state.currentRestaurant = null
	}
}

export default {
	state,
	getters,
	...actions
}