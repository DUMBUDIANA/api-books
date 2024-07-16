
// const mongoose = require('mongoose');
// const bookSchema = new mongoose.Schema({
//     author:{
//         type:String,
//         required:true
//     },
//     bookToChannel: {
//         type:String,
//         required: true
//     },
//     bookDate: {
//         type: Date,
//         required: true,
//         default:Date.now


//     }
// })

// module.exports = mongoose.model('Book', bookSchema )



const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  description: { 
    type: String,
    required: true
  },
  bookToChannel: {
    type: String,
    required: true
  },
  bookDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('Book', bookSchema);
