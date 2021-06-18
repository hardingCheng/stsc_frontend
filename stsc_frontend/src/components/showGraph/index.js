import { Graph, Shape } from '@antv/x6'
import "./shape"
export default class ShowGraph {
  static init (data) {
    this.graph = new Graph({
      container: document.getElementById('showGraph'),
      height:800,
      // 画布调整
      scroller: {
        enabled: true,
        pageVisible: false,
        pageBreak: false,
        pannable: false
      },
      //滚动滑轮缩放画布大小
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
        minScale: 0.5,
        maxScale: 2
      },
      interacting:function(){ //使得节点和边固定
        return {nodeMovable:false,edgeMovable:false,edgeLabelMovable:false}
      },
      connecting: {
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        highlight: true,
        snap: true,
        createEdge () {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#5F95FF',
                strokeWidth: 1,
                targetMarker: {
                  name: 'classic',
                  size: 8
                }
              }
            },
            router: {
              name: 'manhattan'
            },
            zIndex: 0
          })
        },
        validateConnection ({
          sourceView,
          targetView,
          sourceMagnet,
          targetMagnet
        }) {
          if (sourceView === targetView) {//设置自循环 节点可以自己连接自己
            return true
          }
          if (!sourceMagnet) {
            return false
          }
          if (!targetMagnet) {
            return false
          }
          return true
        }
      },
      embedding: {
        enabled: true,
        findParent ({ node }) {
          const bbox = node.getBBox()
          return this.getNodes().filter((node) => {
            // 只有 data.parent 为 true 的节点才是父节点
            const data = node.getData()
            if (data && data.parent) {
              const targetBBox = node.getBBox()
              return bbox.isIntersectWithRect(targetBBox)
            }
            return false
          })
        }
      }
    })

    this.initGraphShape(data)
    return this.graph
  }
  static initGraphShape (data) {//初始化流程图数据
    this.graph.fromJSON(data)
  }
}
