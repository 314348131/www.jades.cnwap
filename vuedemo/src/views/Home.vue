<template>
	<div>
		<my-header></my-header>
		<my-body></my-body>
	</div>
</template>

<script>
	import myHeader from '../components/myHeader.vue';
	import myBody from '../components/myBody.vue';
	
	export default{
		components:{
			myHeader,myBody
		},
	}
</script>

<style>
</style>
