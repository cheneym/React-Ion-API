import {
 capitalizeFirstLetter,
 makeComponentName,
 formTreeData,
} from '../../../src/lib/helpers';

test('Will capitalize the fist letter', () => {
  expect(capitalizeFirstLetter('block')).toBe('Block');
});

test('Will make the component name that user inputs', () => {
  expect(makeComponentName('block ds')).toBe('BlockDs');
});

// test('Will format the tree that will be sent to the server', () => {
//   const route = [
//     {
//       past: [],
//       present: {
//         name: 'Block1',
//         parent: null,
//         componentType: 'Block',
//         props: [],
//         children: [
//           {
//             name: 'Block2',
//             parent: null,
//             componentType: 'Block',
//             props: [],
//             children: [],
//           },
//         ],
//       },
//       future: [],
//     },
//   ];

//   const result = {
//     total: 2,
//     router: 1,
//     routes: {
//       name: 'Block1',
//       parent: null,
//       componentType: 'Block',
//       props: [],
//       children: [
//         {
//           name: 'Block2',
//           parent: null,
//           componentType: 'Block',
//           props: [],
//           children: [],
//         },
//       ],
//     },
//   };

//   expect(formTreeData(route)).toBe(result);

// })