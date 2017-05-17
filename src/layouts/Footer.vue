<template>
		<!-- Footer -->
    <div class="footer text-muted text-center">
      &copy; 2014 - {{ now }}. <a href="#">Sistema Acqio</a> by <a href="http://github.com/juniorpaiva95" target="_blank">Júnior Paiva</a>
    </div>
    <!-- /footer -->
</template>

<script>
	export default{
    computed: {
      now() {
        return moment().format('YYYY')
      }
    }
	}
</script>
