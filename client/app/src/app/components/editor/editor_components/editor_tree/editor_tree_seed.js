// as an array
export const treeData = [
    {
      key: 'first-level-node-1',
      label: 'Node 1 at the first level',    
      nodes: [
        {
          key: 'second-level-node-1',
          label: 'Node 1 at the second level',
          nodes: [
            {
              key: 'third-level-node-1',
              label: 'Last node of the branch',
              nodes: [] // you can remove the nodes property or leave it as an empty array
            },
          ],
        },
      ],
    },
    {
      key: 'first-level-node-2',
      label: 'Node 2 at the first level',
    },
  ];
  // or as an object
//   const treeData = {
//     'first-level-node-1': {               // key
//       label: 'Node 1 at the first level',
//       index: 0, // decide the rendering order on the same level
//       ...,      // any other props you need, e.g. url
//       nodes: {
//         'second-level-node-1': {
//           label: 'Node 1 at the second level',
//           index: 0,
//           nodes: {
//             'third-level-node-1': {
//               label: 'Node 1 at the third level',
//               index: 0,
//               nodes: {} // you can remove the nodes property or leave it as an empty array
//             },
//           },
//         },
//       },
//     },
//     'first-level-node-2': {
//       label: 'Node 2 at the first level',
//       index: 1,
//     },
//   };