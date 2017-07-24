<template>
		<!-- Footer -->
    <div class="footer text-muted text-center">
      &copy; 2014 - {{ now }}. Desenvolvido por: <a href="#" target="_blank"><i class="icon-lab"></i>  Acqio Labs</a>
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
