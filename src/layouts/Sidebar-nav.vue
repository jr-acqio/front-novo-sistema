<script>
import menu from './../configs/menu'
import { getHeader } from './../services/config'
import {mapState} from 'vuex'
export default{
	data() {
		return {
			menu: menu
		}
	},
	created() {
		this.$nextTick(function () {
			// $.getScript('/static/assets/js/core/app.js')
		})
	},
	methods: {
		// active(val) {
		// 	let patt = new RegExp(val + "/")
		// 	if (this.$route.path === val || patt.test(this.$route.path)) {
		// 		return true
		// 	}
		// 	return false
		// },
		// activeChildren(val) {
		// 	if (this.$route.path === val) {
		// 		return true
		// 	}
		// 	return false
		// }
	},
	computed: {
		...mapState({
			userStore: state => state.userStore
		})
	}
}
</script>


<template>
	<!-- Main sidebar -->
	<div class="sidebar sidebar-main">
		<div class="sidebar-content">

			<!-- User menu -->
			<div class="sidebar-user">
				<div class="category-content">
					<div class="media">
						<a href="#" class="media-left"><img src="/static/assets/images/demo/users/face0.jpg" class="img-circle img-sm" alt=""></a>
						<div class="media-body">
							<span class="media-heading text-semibold">{{userStore.authUser.name}}</span>
							<!-- <div class="text-size-mini text-muted">
							<i class="icon-pin text-size-small"></i> &nbsp;Santa Ana, CA
						</div> -->
					</div>

					<div class="media-right media-middle">
						<ul class="icons-list">
							<li>
								<a href="#"><i class="icon-cog3"></i></a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!-- /user menu -->


		<!-- Main navigation -->
		<div class="sidebar-category sidebar-category-visible">
			<div class="category-content no-padding">
				<ul class="navigation navigation-main navigation-accordion">

					<li class="navigation-header">
						<span>Menu</span> <i title="" class="icon-menu" data-original-title="Menu"></i>
					</li>
					<li>
						<router-link to="/home"><i class="icon-home2"></i> <span>Dashboard</span></router-link>
					</li>
					<li>
						<a href="javascript:void(0)" class="has-ul"><i class="icon-tree5"></i> <span>Usuários</span></a>
						<ul class="hidden-ul" style="display: none;">
							<li>
								<router-link to="/users"><i class="icon-users4"></i> Usuários</router-link>
							</li>
							<li>
								<router-link to="/users/create"><i class="icon-user-plus"></i> Novo Usuário</router-link>
							</li>
							<!-- <li class="active">
							<a href="#" class="has-ul"><i class="icon-firefox"></i> Second level with child</a>
							<ul class="hidden-ul" style="display: block;">
							<li><a href="#"><i class="icon-android"></i> Third level</a></li>
							<li>
							<a href="#" class="has-ul"><i class="icon-apple2"></i> Third level with child</a>
							<ul class="hidden-ul">
							<li><a href="#"><i class="icon-html5"></i> Fourth level</a></li>
							<li><a href="#"><i class="icon-css3"></i> Fourth level</a></li>
						</ul>
					</li>
					<li><a href="#"><i class="icon-windows"></i> Third level</a></li>
				</ul>
			</li> -->
		</ul>
	</li>

	<li>
		<a href="javascript:void(0)" class="has-ul"><i class="icon-barcode2"></i> <span>Boletos</span></a>
		<ul class="hidden-ul" style="display: none;">
			<li>
				<router-link to="/boletos/conciliation"><i class="icon-wallet"></i> Conciliar</router-link>
			</li>
			<li>
				<router-link to="/boletos/clientes"><i class="icon-barcode2"></i> Boletos Clientes</router-link>
			</li>
			<li>
				<router-link to="/boletos/franchising"><i class="icon-barcode2"></i> Boletos Franchising</router-link>
			</li>
		</ul>
	</li>

	<li class="navigation-header">
		<span>Segurança</span> <i title="" class="icon-menu" data-original-title="Segurança"></i>
	</li>
	<li>
		<router-link to="/security/profile"><i class="icon-user-lock"></i> <span>Meu Perfil</span></router-link>
	</li>

	<li class="navigation-header">
		<span>Analytics</span> <i title="" class="icon-menu" data-original-title="Analytics"></i>
	</li>
	<li>
		<a href="javascript:void(0)" class="has-ul"><i class="icon-statistics"></i> <span>Analytics</span></a>
		<ul class="hidden-ul" style="display: none;">
			<li>
				<router-link to="/analytics/boletos"><i class="icon-barcode2"></i> Boletos</router-link>
			</li>
		</ul>
	</li>
	<!-- \Menu -->
</ul>
</div>
</div>
<!-- /main navigation -->

</div>
</div>
<!-- /main sidebar -->
</template>

<style></style>
