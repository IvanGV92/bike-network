const mongoose = require('mongoose');
let Bike = require('../../models/bike');

describe('Testing Bikes',()=>{
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
        Bike.deleteMany({},(err,success)=>{
            if(err) console.log(err);
            done();
        });
    });




    describe('Bike.createInstance',()=>{

        it('should create a Bike instance',()=>{
            let biki = Bike.createInstance(1,"green","urban",[48.5,3.4]);

            expect(biki.code).toBe(1);
            expect(biki.color).toBe("green");
            expect(biki.model).toBe("urban");
            expect(biki.location[0]).toEqual(48.5);
            expect(biki.location[1]).toEqual(3.4);
            
            
        });
    });

    describe('Bike.allBikes',()=>{

        it('should start empty',(done)=>{
            Bike.allBikes(function(err,bikes){
                expect(bikes.length).toBe(0);
                done();
            });
            
         
            
            
        });
    });

    describe('Bike.add',()=>{

        it('should add a new bike',(done)=>{
            let aBike = new Bike({code: 1,color:"green",model:"urban"});
            Bike.add(aBike,function(err,newBike){
                if (err) console.log(err);
                Bike.allBikes(function(err,bikes){
                    expect(bikes.length).toEqual(1);
                    expect(bikes[0].code).toEqual(aBike.code);

                    done();
                });
            });
         
            
            
        });
    });

    describe('Bike.findByCode',()=>{

        it('should find a bike with code 1',(done)=>{
            Bike.allBikes((err,bikes)=>{
                expect(bikes.length).toBe(0);
            });

            let aBike1 = new Bike({code: 1,color:"green",model:"urban"});
            Bike.add(aBike1,function(err,newBike){
                if (err) console.log(err);
            
                let aBike2 = new Bike({code: 2,color:"red",model:"urban"});
                Bike.add(aBike2,function(err,newBike){
                    if (err) console.log(err);
                    Bike.findByCode(1,(error,targetBike)=>{
                        expect(targetBike.code).toBe(aBike1.code);
                        expect(targetBike.color).toBe(aBike1.color);
                        expect(targetBike.model).toBe(aBike1.model);
                       
                        done();
                    });
                });
            });
            
        });
         
            
            
        
    });
   
    

});

