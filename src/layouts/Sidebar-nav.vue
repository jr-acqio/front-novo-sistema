<script>
import menu from './../configs/menu'
import {mapState} from 'vuex'
export default{
	data() {
		return {
			menu: menu
		}
	},
	created() {
		// console.log(this.menu)
		this.$nextTick(function () {
			// $.getScript('/static/assets/js/core/app.js')
		})
	},
	methods: {
		active(val) {
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
									<li v-for="child in m.children">
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
