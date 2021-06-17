<template>
  <div class="showGraph" id="showGraph"></div>
</template>

<script>
import data from '../assets/data.json'
import ShowGraph from '../tools/flow'
export default {
  name: 'Index',
  data(){
    return{
      id:''
    }
  },
  mounted () {
    this.showDrawer()
    setTimeout(() => {
      this.boundEvent()
    }, 200)
  },
  methods: {
    boundEvent() {
      const { graph } = ShowGraph
      graph.on('cell:click', ({ cell }) => {
        let nodes = graph.getNodes()
        nodes.forEach((node) => {
        node.attr('body/stroke', '#5F95FF')
      })
        this.id = cell.id
        cell.attr('body/stroke','orange')
      })
    },
    showDrawer () {
      var data = JSON.parse()
      this.$nextTick(() => {
        this.initGraph(data)
      })
    },
    getContainerSize () {
      return {
        width: '100%',
        height: document.body.offsetHeight - 400
      }
    },
    initGraph (data) {
      const graph = ShowGraph.init(data)
      const resizeFn = () => {
        const { width, height } = this.getContainerSize()
        graph.resize(width, height)
      }
      resizeFn()
      window.addEventListener('resize', resizeFn)
      return () => {
        window.removeEventListener('resize', resizeFn)
      }
    }
  }
}
</script>
<style scoped>

</style>

