
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bikeSchema = new Schema({
    code: Number,
    color: String,
    model: String,
    location: {
        type: [Number],
        index: { 
                type: '2dsphere', 
                sparse: true}
    }
});

bikeSchema.statics.createInstance = function(code,color,model,location){
    return new this({
        code: code,
        color: color,
        model: model,
        location: location
    });
};

bikeSchema.methods.toString = ()=>{
    return `code: ${this.code} | color: ${this.color}`;
};

bikeSchema.statics.allBikes = function(callback){
    return this.find({},callback);
};

bikeSchema.statics.add = function(aBike, callback){
    this.create(aBike,callback);
};

bikeSchema.statics.findByCode = function(aCode, callback){
    return this.findOne({ code: aCode },callback);
};

bikeSchema.statics.removeByCode = function(aCode, callback){
    console.log(aCode);
    return this.deleteOne({ code: aCode },callback);
};

module.exports = mongoose.model('Bike',bikeSchema);