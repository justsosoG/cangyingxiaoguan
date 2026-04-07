<template>
	<view class="detail-page">
		<!-- 头部图片 -->
		<view class="header-image">
			<image :src="restaurant.image || '/static/images/default.png'" mode="aspectFill" />
		</view>

		<!-- 基本信息 -->
		<view class="info-section">
			<view class="restaurant-name">{{ restaurant.name }}</view>
			<view class="rating-row">
				<text class="rating">{{ restaurant.rating }}</text>
				<text class="rating-text">分</text>
			</view>
		</view>

		<!-- 详细信息 -->
		<view class="detail-section">
			<view class="detail-item">
				<text class="label">地址</text>
				<text class="value">{{ restaurant.address }}</text>
			</view>
			<view class="detail-item">
				<text class="label">分类</text>
				<text class="value">{{ getCategoryName(restaurant.category) }}</text>
			</view>
			<view class="detail-item">
				<text class="label">描述</text>
				<text class="value">{{ restaurant.description || '暂无描述' }}</text>
			</view>
		</view>

		<!-- 推荐菜品 -->
		<view class="dishes-section">
			<view class="section-title">推荐菜品</view>
			<view class="dishes-list">
				<view class="dish-item" v-for="dish in restaurant.dishes" :key="dish.id">
					<text class="dish-name">{{ dish.name }}</text>
					<text class="dish-price">¥{{ dish.price }}</text>
				</view>
			</view>
		</view>

		<!-- 用户评价 -->
		<view class="reviews-section">
			<view class="section-title">用户评价</view>
			<view class="review-item" v-for="review in restaurant.reviews" :key="review.id">
				<view class="review-header">
					<text class="reviewer">{{ review.user }}</text>
					<text class="review-date">{{ review.date }}</text>
				</view>
				<text class="review-content">{{ review.content }}</text>
			</view>
		</view>

		<!-- 底部操作栏 -->
		<view class="action-bar">
			<view class="action-btn" @click="navigateToLocation">
				<text class="btn-icon">📍</text>
				<text class="btn-text">导航</text>
			</view>
			<view class="action-btn primary" @click="editRestaurant">
				<text class="btn-icon">✏️</text>
				<text class="btn-text">编辑</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: null,
			restaurant: {
				id: 1,
				name: '老王烧饼',
				category: 'snack',
				address: 'XX街XX号',
				rating: 4.5,
				image: '/static/images/default.png',
				description: '正宗老味道，三十年老店',
				dishes: [
					{ id: 1, name: '葱油烧饼', price: 5 },
					{ id: 2, name: '牛肉烧饼', price: 8 },
					{ id: 3, name: '豆沙烧饼', price: 6 }
				],
				reviews: [
					{ id: 1, user: '吃货小张', date: '2024-01-15', content: '味道很赞！' },
					{ id: 2, user: '美食达人', date: '2024-01-10', content: '外酥里嫩，值得一试' }
				]
			}
		}
	},
	onLoad(options) {
		this.id = options.id
		// TODO: 根据 id 获取详情数据
	},
	methods: {
		getCategoryName(category) {
			const map = {
				food: '美食',
				drink: '饮品',
				snack: '小吃'
			}
			return map[category] || '其他'
		},
		navigateToLocation() {
			// TODO: 调用地图导航
			uni.showToast({
				title: '导航功能开发中',
				icon: 'none'
			})
		},
		editRestaurant() {
			uni.navigateTo({
				url: `/pages/input/input?id=${this.id}`
			})
		}
	}
}
</script>

<style scoped>
.detail-page {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding-bottom: 120rpx;
}

.header-image {
	width: 100%;
	height: 400rpx;
}

.header-image image {
	width: 100%;
	height: 100%;
}

.info-section {
	padding: 30rpx;
	background-color: #fff;
}

.restaurant-name {
	font-size: 40rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 16rpx;
}

.rating-row {
	display: flex;
	align-items: baseline;
}

.rating {
	font-size: 48rpx;
	color: #FF9500;
	font-weight: bold;
}

.rating-text {
	font-size: 24rpx;
	color: #999;
	margin-left: 8rpx;
}

.detail-section {
	margin-top: 20rpx;
	padding: 30rpx;
	background-color: #fff;
}

.detail-item {
	display: flex;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #f5f5f5;
}

.detail-item:last-child {
	border-bottom: none;
}

.label {
	width: 120rpx;
	font-size: 28rpx;
	color: #999;
}

.value {
	flex: 1;
	font-size: 28rpx;
	color: #333;
}

.dishes-section, .reviews-section {
	margin-top: 20rpx;
	padding: 30rpx;
	background-color: #fff;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
}

.dishes-list {
	display: flex;
	flex-wrap: wrap;
}

.dish-item {
	display: flex;
	justify-content: space-between;
	width: 50%;
	padding: 16rpx 0;
}

.dish-name {
	font-size: 28rpx;
	color: #333;
}

.dish-price {
	font-size: 28rpx;
	color: #FF9500;
}

.review-item {
	padding: 20rpx 0;
	border-bottom: 1rpx solid #f5f5f5;
}

.review-header {
	display: flex;
	justify-content: space-between;
	margin-bottom: 12rpx;
}

.reviewer {
	font-size: 26rpx;
	color: #666;
}

.review-date {
	font-size: 24rpx;
	color: #999;
}

.review-content {
	font-size: 28rpx;
	color: #333;
	line-height: 1.5;
}

.action-bar {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	padding: 20rpx 30rpx;
	background-color: #fff;
	border-top: 1rpx solid #eee;
}

.action-btn {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 24rpx;
	margin: 0 10rpx;
	border-radius: 8rpx;
	background-color: #f5f5f5;
}

.action-btn.primary {
	background-color: #007AFF;
}

.action-btn.primary .btn-text {
	color: #fff;
}

.btn-icon {
	margin-right: 8rpx;
}

.btn-text {
	font-size: 28rpx;
	color: #333;
}
</style>