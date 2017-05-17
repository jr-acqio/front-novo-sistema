<template>
	<div>
		<div class="row" v-if="$route.path == '/home'">
			<div class="col-lg-12">
				<div class="panel panel-flat">

					<div class="panel-heading">
						<h6 class="panel-title">Gráfico - Boletos Solicitados / Mês</h6>
						<div class="heading-elements">
							<form class="heading-form" action="#">
								<div class="form-group">
									<div class="input-group">
										<span class="input-group-addon"><i class="icon-calendar22"></i></span>
										<input type="text" class="form-control daterange" value="">
									</div>
								</div>
							</form>
						</div>
					</div>
					<div class="panel-body">
						<chartjs-line :height="50" :fill="false" datalabel="Boletos Solicitados" :labels="labels" :data="data" :bind="true"></chartjs-line>

					</div>

				</div>
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
export default {
	metaInfo: {
		titleTemplate: '%s - Dashboard'
	},
	mounted() {
		this.$nextTick(function () {
			$('.daterange').daterangepicker()
		})
	},
	methods: {
	},
	data () {
		return {
			label: "Boletos Solicitados",
			labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Setembro", "Outubro", "Novembro", "Dezembro"],
			data: [65, 59, 80, 81, 56, 55, 40, 55, 10, 30, 15]
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
