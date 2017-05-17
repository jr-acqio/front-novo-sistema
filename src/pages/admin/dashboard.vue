<template>
	<div>
		<div class="row" v-if="$route.path == '/home'">
			<div class="col-lg-12">
				<graph-boleto-solicitado></graph-boleto-solicitado>
			</div>
		</div>

		<div class="row">
			<div class="col-lg-12">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
import GraphBoletoSolicitado from './../../Modulos/Boletos/components/Graphs/BoletoSolicitado'
export default {
	metaInfo: {
		titleTemplate: '%s - Dashboard'
	},
	components: {
		GraphBoletoSolicitado
	},
	mounted() {
	},
	methods: {
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
