import {Dom, Graph} from '@antv/x6'

export const FlowChartRect = Graph.registerNode('flow-chart-rect', {
  inherit: 'rect',
  width: 80,
  height: 42,
  attrs: {
    body: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      fill: 'rgba(95,149,255,0.05)'
    },
    fo: {
      refWidth: '100%',
      refHeight: '100%'
    },
    foBody: {
      xmlns: Dom.ns.xhtml,
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    },
    'edit-text': {
      contenteditable: 'false',
      class: 'x6-edit-text',
      style: {
        width: '100%',
        textAlign: 'center',
        fontSize: 12,
        color: 'rgba(0,0,0,0.85)'
      }
    },
    text: {
      fontSize: 12,
      fill: 'rgba(0,0,0,0.85)',
      text: ''
    }
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'text',
      selector: 'text'
    },
    {
      tagName: 'foreignObject',
      selector: 'fo',
      children: [
        {
          ns: Dom.ns.xhtml,
          tagName: 'body',
          selector: 'foBody',
          children: [
            {
              tagName: 'div',
              selector: 'edit-text'
            }
          ]
        }
      ]
    }
  ],
  ports: {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      }
    },
    items: [
      {
        group: 'top'
      },
      {
        group: 'right'
      },
      {
        group: 'bottom'
      },
      {
        group: 'left'
      }
    ]
  }
})

export const FlowChartImageRect = Graph.registerNode('flow-chart-image-rect', {
  inherit: 'rect',
  width: 200,
  height: 60,
  attrs: {
    body: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      fill: 'rgba(95,149,255,0.05)'
    },
    image: {
      xlinkHref: require('../../components/showGraph/static/development.svg'),
      width: 40,
      height: 40,
      x: 12,
      y: 12
    },
    text: {
      text: '',
      refX: 65,
      refY: 30,
      fontSize: 12,
      fill: 'rgba(0,0,0,0.6)',
      'text-anchor': 'start'
    }
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'image',
      selector: 'image'
    },
    {
      tagName: 'text',
      selector: 'text'
    }
  ],
  ports: {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      }
    },
    items: [
      {
        group: 'top'
      },
      {
        group: 'right'
      },
      {
        group: 'bottom'
      },
      {
        group: 'left'
      }
    ]
  }
})


// export class NodeGroup extends Node {

// }

// NodeGroup.config({
//   shape: 'rect',
//   markup: [
//     {
//       tagName: 'rect',
//       selector: 'body'
//     },
//     {
//       tagName: 'text',
//       selector: 'text'
//     },
//     {
//       tagName: 'g',
//       selector: 'buttonGroup',
//     }
//   ],
//   attrs: {
//     body: {
//       refWidth: '100%',
//       refHeight: '100%',
//       strokeWidth: 1,
//       fill: 'rgba(95,149,255,0.05)',
//       stroke: '#5F95FF'
//     },
//   },
//   ports: {
//     groups: {
//       top: {
//         position: 'top',
//         attrs: {
//           circle: {
//             r: 3,
//             magnet: true,
//             stroke: '#5F95FF',
//             strokeWidth: 1,
//             fill: '#fff',
//             style: {
//               visibility: 'hidden'
//             }
//           }
//         }
//       },
//       right: {
//         position: 'right',
//         attrs: {
//           circle: {
//             r: 3,
//             magnet: true,
//             stroke: '#5F95FF',
//             strokeWidth: 1,
//             fill: '#fff',
//             style: {
//               visibility: 'hidden'
//             }
//           }
//         }
//       },
//       bottom: {
//         position: 'bottom',
//         attrs: {
//           circle: {
//             r: 3,
//             magnet: true,
//             stroke: '#5F95FF',
//             strokeWidth: 1,
//             fill: '#fff',
//             style: {
//               visibility: 'hidden'
//             }
//           }
//         }
//       },
//       left: {
//         position: 'left',
//         attrs: {
//           circle: {
//             r: 3,
//             magnet: true,
//             stroke: '#5F95FF',
//             strokeWidth: 1,
//             fill: '#fff',
//             style: {
//               visibility: 'hidden'
//             }
//           }
//         }
//       }
//     },
//     items: [
//       {
//         group: 'top'
//       },
//       {
//         group: 'right'
//       },
//       {
//         group: 'bottom'
//       },
//       {
//         group: 'left'
//       }
//     ]
//   }

// })

export const NodeGroup = Graph.registerNode('flowGroupNode', {
  inherit: 'rect',
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'text',
      selector: 'text'
    },
    {
      tagName: 'g',
      selector: 'buttonGroup',
    }
  ],
  attrs: {
    body: {
      refWidth: '100%',
      refHeight: '100%',
      strokeWidth: 1,
      fill: 'rgba(95,149,255,0.05)',
      stroke: '#5F95FF'
    },
  },
  ports: {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      }
    },
    items: [
      {
        group: 'top'
      },
      {
        group: 'right'
      },
      {
        group: 'bottom'
      },
      {
        group: 'left'
      }
    ]
  }

})
