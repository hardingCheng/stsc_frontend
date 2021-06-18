<template>
  <div class="showGraph" id="showGraph"></div>
</template>

<script>
import data from '../../assets/data.json'
import ShowGraph from './index'
export default {
  name: 'Index',
  data(){
    return{
      id:''
    }
  },
  mounted () {
    this.showDrawer()
    this.$nextTick(()=>{
      this.boundEvent()
    })
  },
  methods: {
    boundEvent() {
      const { graph } = ShowGraph
      graph.centerContent()
      graph.zoom(0)
      graph.on('cell:click', ({ cell }) => {
        let nodes = graph.getNodes()
        nodes.forEach((node) => {
        node.attr('body/stroke', '#5F95FF')
      })
        this.id = cell.id
        console.log(this.id)
        cell.attr('body/stroke','orange')
      })
    },
    showDrawer () {
      this.$nextTick(() => {
        this.initGraph(data)
      })
    },
    getContainerSize () {
      return {
        width:  '780px',
        height: '85%'
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
<style lang="scss" scoped>

</style>

