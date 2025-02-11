<script setup>
import { Graph } from '@antv/g6'

defineOptions({ name: 'G6' })

const g6Ref = ref()

onMounted(() => {
  initGraph()
})

function initGraph() {
  const graph = new Graph({
    container: document.getElementById('g6-20250210'),
    width: 500,
    height: 500,
    data: {
      nodes: [
        {
          id: 'node-1',
          style: { x: 50, y: 100 },
        },
        {
          id: 'node-2',
          style: { x: 150, y: 100 },
        },
      ],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
  })

  graph.render()
}
</script>

<template>
  <div class="g-container">
    <el-card>
      <div ref="g6Ref" id="g6-20250210"></div>
    </el-card>
  </div>
</template>

<style lang="less" scoped></style>
