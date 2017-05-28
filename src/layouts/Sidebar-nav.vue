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
		// console.log(this.menu)
		// this.setAuthenticatedUser()
		this.$nextTick(function () {
			// $.getScript('/static/assets/js/core/app.js')
		})
	},
	methods: {
		active(val) {
			let patt = new RegExp(val + "/")
			if (this.$route.path === val || patt.test(this.$route.path)) {
				return true
			}
			return false
		},
		activeChildren(val) {
			// console.log(this.$route.path, val, this.$route.path === val)
			if (this.$route.path === val) {
				return true
			}
			return false
		}
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

					<!-- Menu -->
					<template v-for="h in menu">
						<li class="navigation-header">
							<span>{{h.header}}</span> <i class="icon-menu" :title="h.header"></i>
						</li>
						<li :class="{ 'active' : active(m.link) }" v-for="m in h.navigations">

							<template v-if="m.hasOwnProperty('children')">
								<a :class="{ 'has-ul': m.hasOwnProperty('children') }">
									<i :class="m.icon"></i> 	<span>{{m.name}}</span>
								</a>
								<ul v-if="m.hasOwnProperty('children')" class="">
									<li v-for="child in m.children" :class="{ 'active' : activeChildren(child.link) }">
										<router-link :to="{ name: child.path_name }">{{child.name}}</router-link>
									</li>
								</ul>
							</template>
							<template v-else>
								<router-link :to="{ name: m.path_name }">
									<i :class="m.icon"></i> 	<span>{{m.name}}</span>
								</router-link>

							</template>

						</li>
					</template>
					<li class="navigation-header">
						<span>Usuario</span> <i class="icon-menu" :title="Usuario"></i>
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
