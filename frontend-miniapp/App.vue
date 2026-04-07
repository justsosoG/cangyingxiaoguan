<script>
export default {
	onLaunch: function() {
		console.log('App Launch')
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style>
/* 全局样式 */
page {
	background-color: #f5f5f5;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	font-size: 14px;
	color: #333333;
}

/* 清除默认样式 */
view, text, image {
	box-sizing: border-box;
}

/* 通用类 */
.container {
	padding: 20rpx;
}

.flex {
	display: flex;
}

.flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}

.flex-between {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>