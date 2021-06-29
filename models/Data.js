const mongoose = require('mongoose');

const bdASchema = mongoose.Schema({
  id: Number,
  prevNum: Number,
  die: Number,
  changeNum: Number,
  medicine: String,
  etc: String
});
const bdBSchema = mongoose.Schema({
  id: Number,
  prevNum: Number,
  die: Number,
  changeNum: Number,
  medicine: String,
  etc: String
});
const bdCSchema = mongoose.Schema({
  id: Number,
  prevNum: Number,
  die: Number,
  changeNum: Number,
  medicine: String,
  etc: String
});
const bdDSchema = mongoose.Schema({
  id: Number,
  prevNum: Number,
  die: Number,
  changeNum: Number,
  medicine: String,
  etc: String
});

const dataSchema = mongoose.Schema({
  infoId: {
    type: String
  },
  bdA: [bdASchema],
  bdB: [bdBSchema],
  bdC: [bdCSchema],
  bdD: [bdDSchema]
});

const Data = mongoose.model('Datas', dataSchema);

module.exports = { Data };


// const data = {
//   _id: 'a1',
//   infoId: 'a', //infos에 있는 _id값을 가져옴
//   bdA: [
//     {
//       id: 1,
//       prevNum: 1000,
//       die: 10,
//       changeNum: 990,
//       medicine: 'dsas',
//       etc: 'asdff'
//     },
//   ],
//   bdB: [
//     {
//       id: 1,
//       prevNum: 1000,
//       die: 10,
//       changeNum: 990,
//       medicine: 'dsas',
//       etc: 'asdff'
//     },
//   ],
//   bdC: [
//     {
//       id: 1,
//       prevNum: 1000,
//       die: 10,
//       changeNum: 990,
//       medicine: 'dsas',
//       etc: 'asdff'
//     },
//   ],
//   bdD: [
//     {
//       id: 1,
//       prevNum: 1000,
//       die: 10,
//       changeNum: 990,
//       medicine: 'dsas',
//       etc: 'asdff'
//     },
//   ],
// }