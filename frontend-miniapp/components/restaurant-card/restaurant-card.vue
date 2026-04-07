<template>
	<view class="restaurant-card" @click="handleClick">
		<!-- 图片 -->
		<view class="card-image">
			<image :src="restaurant.image || '/static/images/default.png'" mode="aspectFill" />
		</view>

		<!-- 信息 -->
		<view class="card-info">
			<view class="card-header">
				<text class="card-name">{{ restaurant.name }}</text>
				<view class="card-rating">
					<text class="rating-star">★</text>
					<text class="rating-value">{{ restaurant.rating }}</text>
				</view>
			</view>
			<view class="card-address">
				<text class="address-icon">📍</text>
				<text class="address-text">{{ restaurant.address }}</text>
			</view>
			<view class="card-category">
				<text class="category-tag">{{ getCategoryName(restaurant.category) }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'RestaurantCard',
	props: {
		restaurant: {
			type: Object,
			required: true,
			default: () => ({
				id: 0,
				name: '',
				category: '',
				address: '',
				rating: 0,
				image: ''
			})
		}
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
		handleClick() {
			this.$emit('click')
		}
	}
}
</script>

<style scoped>
.restaurant-card {
	display: flex;
	padding: 24rpx;
	margin-bottom: 20rpx;
	background-color: #fff;
	border-radius: 16rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.card-image {
	width: 180rpx;
	height: 180rpx;
	border-radius: 12rpx;
	overflow: hidden;
	flex-shrink: 0;
}

.card-image image {
	width: 100%;
	height: 100%;
}

.card-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-left: 20rpx;
	min-width: 0;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}

.card-name {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	flex: 1;
	margin-right: 16rpx;
}

.card-rating {
	display: flex;
	align-items: center;
	flex-shrink: 0;
}

.rating-star {
	color: #FF9500;
	font-size: 24rpx;
}

.rating-value {
	color: #FF9500;
	font-size: 28rpx;
	font-weight: bold;
	margin-left: 4rpx;
}

.card-address {
	display: flex;
	align-items: center;
	margin-top: 12rpx;
}

.address-icon {
	font-size: 24rpx;
	margin-right: 8rpx;
}

.address-text {
	font-size: 24rpx;
	color: #999;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.card-category {
	margin-top: 12rpx;
}

.category-tag {
	display: inline-block;
	padding: 4rpx 16rpx;
	font-size: 22rpx;
	color: #007AFF;
	background-color: rgba(0, 122, 255, 0.1);
	border-radius: 4rpx;
}
</style>