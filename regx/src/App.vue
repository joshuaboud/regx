<template>
	<Creator />
</template>

<script setup>
import Creator from './components/Creator.vue';

import DiGraph from './classes/DiGraph';
import { RegexBase, RegexPlainString } from './classes/RegexNode';

const graph = new DiGraph();

const reg1 = new RegexPlainString("abcd");
const reg2 = new RegexPlainString("defg");
graph.addVertex(reg1);
graph.addVertex(reg2);
graph.addEdge(reg1, reg2);

console.log(graph.dumpString());

console.log(reg1.absorbAhead(graph));

console.log(graph.dumpString());
</script>
