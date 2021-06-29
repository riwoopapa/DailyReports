const { response } = require('express');
const mongoose = require('mongoose');

const infoSchema = mongoose.Schema({
  userId: {
    type: String,
    unique: 1
  },
  mainData: [
    {
      initialDate: {
        type: Date
      },
      initialNum: {
        bdA: Number,
        bdB: Number,
        bdC: Number,
        bdD: Number
      },
      bdA: [
        {
          id: Number,
          date: Date,
          prevNum: Number,
          die: {
            type: Number,
            default: 0
          },
          changeNum: Number,
          medicine: String,
          etc: String
        }
      ],
      bdB: [
        {
          id: Number,
          date: Date,
          prevNum: Number,
          die: {
            type: Number,
            default: 0
          },
          changeNum: Number,
          medicine: String,
          etc: String
        }
      ],
      bdC: [
        {
          id: Number,
          date: Date,
          prevNum: Number,
          die: {
            type: Number,
            default: 0
          },
          changeNum: Number,
          medicine: String,
          etc: String
        }
      ],
      bdD: [
        {
          id: Number,
          date: Date,
          prevNum: Number,
          die: {
            type: Number,
            default: 0
          },
          changeNum: Number,
          medicine: String,
          etc: String
        }
      ],
      feed: [
        {
          enterDate: Date,
          enterAmount: Number,
          feedName: String,
          feedComp: String
        }
      ],
      endReport: {
        totalWgt: Number ,        //총 출하중량
        getDay: Number ,          //사육일수
        sumDie: Number ,          //총 폐사수수
        sumInitNum: Number ,      //총 입추수수
        sumComeOut: Number ,      //총 출하수수
        sumFeedAmount: Number ,   //총 사료량
        upbringingRate: Number ,  //육성율
        averageBodyWgt: Number ,  //평균체중
        feedDemandRate: Number ,  //사료효율
        productionIndex: Number   //생산지수
      }
    }
  ],
  hidden: {
    btnHidden: {
      type: Boolean,
      default: false
    },
    jumboHidden: {
      type: Boolean,
      default: false
    },
    inputsHidden: {
      type: Boolean,
      default: true
    },
    selected: {
      type: String,
      default: ''
    },
    getDataId: {
      type: String,
      default: ''
    }
  }
});


const Info = mongoose.model('Info', infoSchema);
module.exports = { Info };



// 유저에 있는 _id값을 userId에 넣어주고,
// date와 num을 받아와서
// 사용시, User의 _id와 Info의 userId가 같은지 확인
// 같은 데이터를 찾아서 사용
// User의 initialDate


// const info = {
//   _id: 'a',
//   userId: '1', //users에 있는 _id값을 가져옴
//   date: '3/14',
//   dateY: 21,
//   dateM: 3,
//   initialData: {
//     bdA: 1000,
//     bdB: 500,
//     bdC: 800,
//     bdD: 1000
//   }
// } //infos 에 저장


// const prac = [ 
//   {
//     userId: 123, 
//     initialDate: 3/14, 
//     initialNum: {
//       bdA: 10, 
//       bdB: 20, 
//       bdC: 0, 
//       bdD: 40
//     },
//     data: [
//       {
//         id: 1,
//         date: 3/14,
//         bdA: {
//           prevNum: 10,
//           die: 1,
//           changeNum: 9,
//           medicine: 'bla',
//           etc: 'sola'
//         },
//         bdB: {
//           prevNum: 20,
//           die: 2,
//           changeNum: 18,
//           medicine: 'blabla',
//           etc: 'solasola'
//         },
//       }
//     ]
//   }, 
// ]