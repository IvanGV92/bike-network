const mongoose = require('mongoose');
const Reservation = require('./reservation');
const Schema = mongoose.Schema;

let userSchema = new Schema ({
    name: String
});

userSchema.methods.reserve = function(bikeId, from, to, callback){
    let reservation = new Reservation({ user: this._id, bike: bikeId, from: from, to: to });
    console.log(reservation);
    reservation.save(callback);
}

module.exports = mongoose.model("User",userSchema);