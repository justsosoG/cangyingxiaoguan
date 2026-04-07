<template>
	<view class="input-page">
		<view class="form-section">
			<!-- 馆子名称 -->
			<view class="form-item">
				<text class="form-label required">馆子名称</text>
				<input
					class="form-input"
					type="text"
					v-model="form.name"
					placeholder="请输入馆子名称"
					maxlength="50" />
			</view>

			<!-- 分类 -->
			<view class="form-item">
				<text class="form-label required">分类</text>
				<picker
					mode="selector"
					:range="categoryOptions"
					range-key="label"
					@change="onCategoryChange">
					<view class="form-picker">
						<text :class="{ placeholder: !form.categoryName }">
							{{ form.categoryName || '请选择分类' }}
						</text>
						<text class="picker-arrow">▼</text>
					</view>
				</picker>
			</view>

			<!-- 地址 -->
			<view class="form-item">
				<text class="form-label required">地址</text>
				<view class="location-input">
					<input
						class="form-input"
						type="text"
						v-model="form.address"
						placeholder="请输入地址"
						maxlength="100" />
					<view class="location-btn" @click="getLocation">
						<text>📍</text>
					</view>
				</view>
			</view>

			<!-- 评分 -->
			<view class="form-item">
				<text class="form-label">评分</text>
				<view class="rating-input">
					<view
						v-for="star in 5"
						:key="star"
						class="star"
						@click="setRating(star)">
						<text>{{ star <= form.rating ? '★' : '☆' }}</text>
					</view>
					<text class="rating-text">{{ form.rating }}分</text>
				</view>
			</view>

			<!-- 描述 -->
			<view class="form-item">
				<text class="form-label">描述</text>
				<textarea
					class="form-textarea"
					v-model="form.description"
					placeholder="请输入描述信息"
					maxlength="200" />
			</view>

			<!-- 图片上传 -->
			<view class="form-item">
				<text class="form-label">图片</text>
				<view class="image-upload">
					<view class="image-item" v-if="form.image">
						<image :src="form.image" mode="aspectFill" />
						<view class="delete-btn" @click="deleteImage">×</view>
					</view>
					<view class="upload-btn" v-else @click="chooseImage">
						<text class="upload-icon">+</text>
						<text class="upload-text">上传图片</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 提交按钮 -->
		<view class="submit-section">
			<button class="submit-btn" @click="submit">提交</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: '',
				category: '',
				categoryName: '',
				address: '',
				rating: 0,
				description: '',
				image: ''
			},
			categoryOptions: [
				{ value: 'food', label: '美食' },
				{ value: 'drink', label: '饮品' },
				{ value: 'snack', label: '小吃' }
			],
			isEdit: false,
			editId: null
		}
	},
	onLoad(options) {
		if (options.id) {
			this.isEdit = true
			this.editId = options.id
			// TODO: 获取详情数据填充表单
		}
	},
	methods: {
		onCategoryChange(e) {
			const index = e.detail.value
			this.form.category = this.categoryOptions[index].value
			this.form.categoryName = this.categoryOptions[index].label
		},
		getLocation() {
			uni.chooseLocation({
				success: (res) => {
					this.form.address = res.address + res.name
				},
				fail: () => {
					uni.showToast({
						title: '获取位置失败',
						icon: 'none'
					})
				}
			})
		},
		setRating(star) {
			this.form.rating = star
		},
		chooseImage() {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					this.form.image = res.tempFilePaths[0]
				}
			})
		},
		deleteImage() {
			this.form.image = ''
		},
		validate() {
			if (!this.form.name.trim()) {
				uni.showToast({
					title: '请输入馆子名称',
					icon: 'none'
				})
				return false
			}
			if (!this.form.category) {
				uni.showToast({
					title: '请选择分类',
					icon: 'none'
				})
				return false
			}
			if (!this.form.address.trim()) {
				uni.showToast({
					title: '请输入地址',
					icon: 'none'
				})
				return false
			}
			return true
		},
		submit() {
			if (!this.validate()) return

			uni.showLoading({
				title: '提交中...'
			})

			// TODO: 调用接口提交数据
			setTimeout(() => {
				uni.hideLoading()
				uni.showToast({
					title: this.isEdit ? '修改成功' : '添加成功',
					icon: 'success'
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1500)
			}, 1000)
		}
	}
}
</script>

<style scoped>
.input-page {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding-bottom: 120rpx;
}

.form-section {
	padding: 20rpx;
}

.form-item {
	background-color: #fff;
	padding: 30rpx;
	margin-bottom: 20rpx;
	border-radius: 16rpx;
}

.form-label {
	display: block;
	font-size: 28rpx;
	color: #333;
	margin-bottom: 16rpx;
}

.form-label.required::before {
	content: '*';
	color: #DD524D;
	margin-right: 8rpx;
}

.form-input {
	width: 100%;
	height: 80rpx;
	padding: 0 20rpx;
	font-size: 28rpx;
	background-color: #f5f5f5;
	border-radius: 8rpx;
}

.form-picker {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 80rpx;
	padding: 0 20rpx;
	background-color: #f5f5f5;
	border-radius: 8rpx;
}

.form-picker .placeholder {
	color: #999;
}

.picker-arrow {
	font-size: 20rpx;
	color: #999;
}

.location-input {
	display: flex;
	align-items: center;
}

.location-input .form-input {
	flex: 1;
}

.location-btn {
	width: 80rpx;
	height: 80rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 16rpx;
	background-color: #007AFF;
	border-radius: 8rpx;
}

.rating-input {
	display: flex;
	align-items: center;
}

.star {
	padding: 0 8rpx;
}

.star text {
	font-size: 48rpx;
	color: #FF9500;
}

.rating-text {
	margin-left: 16rpx;
	font-size: 28rpx;
	color: #666;
}

.form-textarea {
	width: 100%;
	height: 200rpx;
	padding: 20rpx;
	font-size: 28rpx;
	background-color: #f5f5f5;
	border-radius: 8rpx;
}

.image-upload {
	display: flex;
	flex-wrap: wrap;
}

.image-item {
	position: relative;
	width: 200rpx;
	height: 200rpx;
	margin-right: 20rpx;
	margin-bottom: 20rpx;
	border-radius: 8rpx;
	overflow: hidden;
}

.image-item image {
	width: 100%;
	height: 100%;
}

.delete-btn {
	position: absolute;
	top: 0;
	right: 0;
	width: 40rpx;
	height: 40rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
	color: #fff;
	font-size: 28rpx;
}

.upload-btn {
	width: 200rpx;
	height: 200rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #f5f5f5;
	border-radius: 8rpx;
	border: 2rpx dashed #ccc;
}

.upload-icon {
	font-size: 60rpx;
	color: #999;
}

.upload-text {
	font-size: 24rpx;
	color: #999;
	margin-top: 8rpx;
}

.submit-section {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 20rpx 30rpx;
	background-color: #fff;
}

.submit-btn {
	width: 100%;
	height: 88rpx;
	line-height: 88rpx;
	background-color: #007AFF;
	color: #fff;
	font-size: 32rpx;
	border-radius: 44rpx;
}
</style>