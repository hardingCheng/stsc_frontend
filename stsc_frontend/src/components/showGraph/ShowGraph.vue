<template>
  <div class="showGraph" id="showGraph"></div>
</template>

<script>
import ShowGraph from './index'
export default {
  props:['arrangeList'],
  name: 'Index',
  data(){
    return{
      id:''
    }
  },
  mounted () {

  },
  watch:{
    arrangeList(newValue,oldValue){
      this.showDrawer()
      this.$nextTick(()=>{
        this.boundEvent()
      })
    }
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
        this.$emit('getNodeInfo',this.id)
        cell.attr('body/stroke','orange')
      })
    },
    showDrawer () {
      this.$nextTick(() => {
        this.initGraph(this.arrangeList.cells)
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

