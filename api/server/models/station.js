const mongoose = require('mongoose');

var StationSchema = new mongoose.Schema({
  name:{
    type: String
  },
  lines:[{
    type: String
  }],
  linkedTo:[{
    name:{
    	type:String
    },
    line:{
    	type:String
    }
  }]
});

var Station = mongoose.model('Station', StationSchema);

module.exports = { Station };
