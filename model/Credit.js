const { Schema , model, Types } = require("mongoose")
const schema =  new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    //code: {type: String, required: true, unique: true},
   //  id:{type: String, required: true, unique: true} , 
    name: {type: String, required: true}, 
    secondName: {type: String, required: true},
    departament: {type: String, required: true},
    value: {type: Number, required: true}
   // owner: { type: Types.ObjectId},
    //dateStart: {type: Date, default: Date.now()},
    //dateFinish: {type: Date, default: Date.now()},
    //marked :{type: Boolean, required: false}
    })
module.exports = model("Credit", schema)