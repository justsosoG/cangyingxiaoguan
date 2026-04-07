<template>
	<view class="login-page">
		<!-- Logo -->
		<view class="logo-section">
			<text class="logo-text">🪰</text>
			<text class="app-name">苍蝇小馆</text>
			<text class="app-slogan">发现身边的美味小店</text>
		</view>

		<!-- 用户信息 -->
		<view class="user-section" v-if="isLoggedIn">
			<image class="avatar" :src="userInfo.avatar" mode="aspectFill" />
			<text class="nickname">{{ userInfo.nickname }}</text>
			<view class="stats-row">
				<view class="stat-item">
					<text class="stat-value">{{ userInfo.collectCount }}</text>
					<text class="stat-label">收藏</text>
				</view>
				<view class="stat-item">
					<text class="stat-value">{{ userInfo.contribCount }}</text>
					<text class="stat-label">贡献</text>
				</view>
			</view>
		</view>

		<!-- 登录按钮 -->
		<view class="login-section" v-else>
			<button class="wx-login-btn" open-type="getUserInfo" @getuserinfo="onGetUserInfo">
				<text class="wx-icon">微信</text>
				<text class="btn-text">微信登录</text>
			</button>
			<view class="privacy-tips">
				<text>登录即表示同意</text>
				<text class="link" @click="openPrivacy">《用户协议》</text>
				<text>和</text>
				<text class="link" @click="openPrivacy">《隐私政策》</text>
			</view>
		</view>

		<!-- 功能菜单 -->
		<view class="menu-section" v-if="isLoggedIn">
			<view class="menu-item" @click="goToCollect">
				<text class="menu-icon">⭐</text>
				<text class="menu-text">我的收藏</text>
				<text class="menu-arrow">›</text>
			</view>
			<view class="menu-item" @click="goToContrib">
				<text class="menu-icon">📝</text>
				<text class="menu-text">我的贡献</text>
				<text class="menu-arrow">›</text>
			</view>
			<view class="menu-item" @click="goToSetting">
				<text class="menu-icon">⚙️</text>
				<text class="menu-text">设置</text>
				<text class="menu-arrow">›</text>
			</view>
		</view>

		<!-- 退出登录 -->
		<view class="logout-section" v-if="isLoggedIn">
			<view class="logout-btn" @click="logout">
				<text>退出登录</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isLoggedIn: false,
			userInfo: {
				avatar: '/static/images/default-avatar.png',
				nickname: '用户昵称',
				collectCount: 0,
				contribCount: 0
			}
		}
	},
	onShow() {
		// 检查登录状态
		this.checkLoginStatus()
	},
	methods: {
		checkLoginStatus() {
			// TODO: 检查本地存储的登录状态
			const token = uni.getStorageSync('token')
			this.isLoggedIn = !!token
		},
		onGetUserInfo(e) {
			if (e.detail.userInfo) {
				// 用户授权登录
				this.doLogin(e.detail.userInfo)
			} else {
				// 用户拒绝授权
				uni.showToast({
					title: '您拒绝了授权',
					icon: 'none'
				})
			}
		},
		doLogin(userInfo) {
			uni.showLoading({
				title: '登录中...'
			})

			// TODO: 调用登录接口
			setTimeout(() => {
				uni.hideLoading()
				this.isLoggedIn = true
				this.userInfo = {
					avatar: userInfo.avatarUrl || '/static/images/default-avatar.png',
					nickname: userInfo.nickName || '用户',
					collectCount: 0,
					contribCount: 0
				}
				// 保存登录状态
				uni.setStorageSync('token', 'mock_token')
				uni.showToast({
					title: '登录成功',
					icon: 'success'
				})
			}, 1000)
		},
		openPrivacy() {
			// TODO: 打开用户协议/隐私政策页面
			uni.showToast({
				title: '功能开发中',
				icon: 'none'
			})
		},
		goToCollect() {
			// TODO: 跳转到收藏页面
			uni.showToast({
				title: '功能开发中',
				icon: 'none'
			})
		},
		goToContrib() {
			// TODO: 跳转到贡献页面
			uni.showToast({
				title: '功能开发中',
				icon: 'none'
			})
		},
		goToSetting() {
			// TODO: 跳转到设置页面
			uni.showToast({
				title: '功能开发中',
				icon: 'none'
			})
		},
		logout() {
			uni.showModal({
				title: '提示',
				content: '确定要退出登录吗？',
				success: (res) => {
					if (res.confirm) {
						uni.removeStorageSync('token')
						this.isLoggedIn = false
						uni.showToast({
							title: '已退出登录',
							icon: 'success'
						})
					}
				}
			})
		}
	}
}
</script>

<style scoped>
.login-page {
	min-height: 100vh;
	background-color: #f5f5f5;
}

.logo-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 120rpx;
	padding-bottom: 60rpx;
	background-color: #fff;
}

.logo-text {
	font-size: 120rpx;
}

.app-name {
	font-size: 48rpx;
	font-weight: bold;
	color: #333;
	margin-top: 20rpx;
}

.app-slogan {
	font-size: 28rpx;
	color: #999;
	margin-top: 12rpx;
}

.user-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40rpx;
	background-color: #fff;
}

.avatar {
	width: 160rpx;
	height: 160rpx;
	border-radius: 50%;
	background-color: #f5f5f5;
}

.nickname {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
	margin-top: 20rpx;
}

.stats-row {
	display: flex;
	margin-top: 30rpx;
}

.stat-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 60rpx;
}

.stat-value {
	font-size: 40rpx;
	font-weight: bold;
	color: #333;
}

.stat-label {
	font-size: 24rpx;
	color: #999;
	margin-top: 8rpx;
}

.login-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 60rpx 40rpx;
}

.wx-login-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 600rpx;
	height: 88rpx;
	background-color: #07C160;
	border-radius: 44rpx;
	border: none;
}

.wx-icon {
	color: #fff;
	font-size: 32rpx;
	margin-right: 16rpx;
}

.btn-text {
	color: #fff;
	font-size: 32rpx;
}

.privacy-tips {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 30rpx;
	font-size: 24rpx;
	color: #999;
}

.privacy-tips .link {
	color: #007AFF;
}

.menu-section {
	margin-top: 20rpx;
	background-color: #fff;
}

.menu-item {
	display: flex;
	align-items: center;
	padding: 30rpx;
	border-bottom: 1rpx solid #f5f5f5;
}

.menu-item:last-child {
	border-bottom: none;
}

.menu-icon {
	font-size: 36rpx;
	margin-right: 20rpx;
}

.menu-text {
	flex: 1;
	font-size: 30rpx;
	color: #333;
}

.menu-arrow {
	font-size: 32rpx;
	color: #ccc;
}

.logout-section {
	margin-top: 60rpx;
	padding: 0 40rpx;
}

.logout-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 88rpx;
	background-color: #fff;
	border-radius: 8rpx;
	border: 1rpx solid #DD524D;
}

.logout-btn text {
	color: #DD524D;
	font-size: 30rpx;
}
</style>