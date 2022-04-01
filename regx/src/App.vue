<template>
	<Creator />
</template>

<script setup>
import Creator from './components/Creator.vue';

import { RegexDiGraph } from './classes/RegexDiGraph';
import { RegexBase, RegexPlainString } from './classes/RegexNode';

const graph = new RegexDiGraph();

const reg0 = new RegexPlainString("abcd");
const reg1 = new RegexPlainString("efgh");
const reg2 = new RegexPlainString("ijkl");
const reg3 = new RegexPlainString("mnop");
const reg4 = new RegexPlainString("qrst");
const reg5 = new RegexPlainString("uvxy");
const reg6 = new RegexPlainString("zabc");
const reg7 = new RegexPlainString("defg");

graph.addVertex(reg0);
graph.addVertex(reg1);
graph.addVertex(reg2);
graph.addVertex(reg3);
graph.addVertex(reg4);
graph.addVertex(reg5);
graph.addVertex(reg6);
graph.addVertex(reg7);
graph.addEdge(reg0, reg1);
graph.addEdge(reg1, reg2);
graph.addEdge(reg2, reg3);
graph.addEdge(reg3, reg4);
graph.addEdge(reg4, reg5);
graph.addEdge(reg5, reg6);
graph.addEdge(reg6, reg7);

graph.addEdge(reg3, reg3);
graph.addEdge(reg2, reg4); // skip reg3

console.log(graph.dumpString());

console.log(graph.compile().dumpString());
</script>
