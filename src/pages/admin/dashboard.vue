<template>
	<div>

		<div class="row">
			<div class="col-lg-12">
				<!-- <clients></clients> -->
			</div>
			<router-view></router-view>
		</div>

	</div>
</template>

<script>
import Vue from 'vue'
export default {
	metaInfo: {
		titleTemplate: '%s - Dashboard'
	},
	// My Vue table mounted
	mounted() {
	},
	methods: {
	},
	data () {
		return {
		}
	},
	created () {
		$('body').removeClass('login-container')
		this.$nextTick(function () {
			$.getScript('/static/assets/js/core/app.js')
			// $.getScript('/static/assets/js/pages/dashboard.js')
		})
	}
}
</script>

<style src="sweetalert2/dist/sweetalert2.min.css"></style>
<style lang="scss">

.pagination {
	margin: 0;
	float: right;
}
.pagination a.page {
	border: 1px solid lightgray;
	border-radius: 3px;
	padding: 5px 10px;
	margin-right: 2px;
}
.pagination a.page.active {
	color: white;
	background-color: #337ab7;
	border: 1px solid lightgray;
	border-radius: 3px;
	padding: 5px 10px;
	margin-right: 2px;
}
.pagination a.btn-nav {
	border: 1px solid lightgray;
	border-radius: 3px;
	padding: 5px 7px;
	margin-right: 2px;
}
.pagination a.btn-nav.disabled {
	color: lightgray;
	border: 1px solid lightgray;
	border-radius: 3px;
	padding: 5px 7px;
	margin-right: 2px;
	cursor: not-allowed;
}
.pagination-info {
	float: left;
}
</style>
