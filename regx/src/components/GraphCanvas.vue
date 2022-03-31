<template>
	<div class="relative">
		<div ref="draggable" class="absolute top-0 bottom-0 left-0 right-0 z-10" />
		<canvas ref="canvas" class="absolute top-0 bottom-0 left-0 right-0 z-0" />
	</div>
</template>

<script>
import { ref } from 'vue';
export default {
	props: {
		regexGraph: Graph,
	},
	setup(props) {
		const draggable = ref();
		const canvas = ref();
	},
}
</script>