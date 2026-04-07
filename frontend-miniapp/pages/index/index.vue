<template>
	<view class="index-page">
		<!-- 搜索栏 -->
		<view class="search-bar">
			<view class="search-input">
				<text class="search-icon">🔍</text>
				<input type="text" placeholder="搜索馆子名称..." v-model="searchText" />
			</view>
		</view>

		<!-- 分类筛选 -->
		<view class="category-filter">
			<view
				class="category-item"
				:class="{ active: currentCategory === 'all' }"
				@click="selectCategory('all')">
				全部
			</view>
			<view
				class="category-item"
				:class="{ active: currentCategory === 'food' }"
				@click="selectCategory('food')">
				美食
			</view>
			<view
				class="category-item"
				:class="{ active: currentCategory === 'drink' }"
				@click="selectCategory('drink')">
				饮品
			</view>
			<view
				class="category-item"
				:class="{ active: currentCategory === 'snack' }"
				@click="selectCategory('snack')">
				小吃
			</view>
		</view>

		<!-- 馆子列表 -->
		<view class="restaurant-list">
			<restaurant-card
				v-for="item in restaurantList"
				:key="item.id"
				:restaurant="item"
				@click="goToDetail(item.id)" />
		</view>

		<!-- 空状态 -->
		<view v-if="restaurantList.length === 0" class="empty-state">
			<text class="empty-text">暂无馆子数据</text>
		</view>

		<!-- 添加按钮 -->
		<view class="add-btn" @click="goToInput">
			<text class="add-icon">+</text>
		</view>
	</view>
</template>

<script>
import RestaurantCard from '@/components/restaurant-card/restaurant-card.vue'

export default {
	components: {
		RestaurantCard
	},
	data() {
		return {
			searchText: '',
			currentCategory: 'all',
			// Mock 数据 - 后续替换为真实接口
			restaurantList: [
				{
					id: 1,
					name: '老王烧饼',
					category: 'snack',
					address: 'XX街XX号',
					rating: 4.5,
					image: '/static/images/default.png'
				},
				{
					id: 2,
					name: '小李面馆',
					category: 'food',
					address: 'XX路XX号',
					rating: 4.8,
					image: '/static/images/default.png'
				},
				{
					id: 3,
					name: '阿明奶茶',
					category: 'drink',
					address: 'XX广场XX层',
					rating: 4.2,
					image: '/static/images/default.png'
				}
			]
		}
	},
	methods: {
		selectCategory(category) {
			this.currentCategory = category
			// TODO: 根据 category 筛选数据
		},
		goToDetail(id) {
			uni.navigateTo({
				url: `/pages/detail/detail?id=${id}`
			})
		},
		goToInput() {
			uni.navigateTo({
				url: '/pages/input/input'
			})
		}
	}
}
</script>

<style scoped>
.index-page {
	min-height: 100vh;
	background-color: #f5f5f5;
}

.search-bar {
	padding: 20rpx;
	background-color: #fff;
}

.search-input {
	display: flex;
	align-items: center;
	padding: 16rpx 24rpx;
	background-color: #f5f5f5;
	border-radius: 32rpx;
}

.search-icon {
	margin-right: 16rpx;
	font-size: 28rpx;
}

.search-input input {
	flex: 1;
	font-size: 28rpx;
}

.category-filter {
	display: flex;
	padding: 20rpx;
	background-color: #fff;
	border-bottom: 1rpx solid #eee;
}

.category-item {
	padding: 12rpx 32rpx;
	margin-right: 16rpx;
	font-size: 26rpx;
	color: #666;
	border-radius: 24rpx;
	background-color: #f5f5f5;
}

.category-item.active {
	color: #fff;
	background-color: #007AFF;
}

.restaurant-list {
	padding: 20rpx;
}

.empty-state {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 100rpx 0;
}

.empty-text {
	color: #999;
	font-size: 28rpx;
}

.add-btn {
	position: fixed;
	right: 40rpx;
	bottom: 120rpx;
	width: 100rpx;
	height: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #007AFF;
	border-radius: 50%;
	box-shadow: 0 4rpx 20rpx rgba(0, 122, 255, 0.4);
}

.add-icon {
	color: #fff;
	font-size: 48rpx;
}
</style>