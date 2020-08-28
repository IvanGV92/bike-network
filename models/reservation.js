const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

let reservationSchema = new Schema ({
    from: Date,
    to: Date,
    bike: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

reservationSchema.methods.reserveDays = function(){
    return moment(this.to).diff(moment(this.from),'days') + 1;
};

module.exports = mongoose.model('Reservation',reservationSchema);