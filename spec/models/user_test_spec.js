const mongoose = require('mongoose');
const Reservation = require('../../models/reservation');
const User = require('../../models/user');
const Bike = require('../../models/bike');


describe('Testing Users',()=>{
    beforeEach((done)=>{
        let mongoDB = 'mongodb://localhost/testdb';
        mongoose.disconnect();
        mongoose.connect(mongoDB,{ useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true });

        const db = mongoose.connection;
        db.on('error',console.error.bind(console,'connection error'));
        db.once('open',()=>{
            console.log('We are connected to the database');
            done();
        });
    });
    
    afterEach((done)=>{
        Reservation.deleteMany({},(err,success)=>{
            if(err) console.log(err);
            User.deleteMany({},(err, success)=>{
                if(err) console.log(err);
                Bike.deleteMany({},(err,success)=>{
                    if(err) console.log(err);
                    done();
                });
            });
        });
    });

    describe('When an user reserves a bike',()=>{
        it('should exist the reservation',(done)=>{
            const user = new User({ name: 'Ezequiel'});
            user.save();
            const bike = new Bike({ code: 1, color: "green", model: "urban"});
            bike.save();

            let today = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate()+1);
            user.reserve(bike.id, today, tomorrow, function(err,reserve){
                Reservation.find({}).populate('bike').populate('user').exec(function(err, reservations){
                    console.log(reservations[0]);
                    expect(reservations.length).toBe(1);
                    expect(reservations[0].reserveDays()).toBe(2);
                    expect(reservations[0].bike.code).toBe(1);
                    expect(reservations[0].user.name).toBe(user.name);
                    done();
                    
                    
                });
            });
        });
    });



});