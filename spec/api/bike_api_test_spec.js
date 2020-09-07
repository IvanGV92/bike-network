const mongoose = require('mongoose');
const Bike = require('../../models/bike');
const request = require('request');
const server = require('../../bin/www');


const base_url = "http://localhost:3000/api/bikes";

describe('Testing Bikes', function() {
    afterEach(function(done) {
        Bike.deleteMany({}, function(err, success) {
            if (err) console.log(err);
            done();
        });
    });
    
    describe('Testing Bike API', () => {
        describe('GET Bikes /', () => {
            it('STATUS 200', (done) => {
                Bike.allBikes(function(err, bikis) {
                    expect(bikis.length).toBe(0);
                });
                
                request.get(base_url, function(error, response, body) {
                    expect(response.statusCode).toBe(200);
                });
    
                done();
            });
        });
    });

    describe('POST Bikes /create', () => {
        it('STATUS 200', (done) => {
            let headers = {'content-type' : 'application/json'};
            let aBike = '{ "code": 10, "color": "red", "model": "urban", "lat": 48.3, "lon": 2.8 }';
    
            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bikes/create',
                body: aBike
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                Bike.findByCode(10, function(error, targetBike) {
                    expect(targetBike.code).toBe(10);
                    expect(targetBike.color).toBe("red");
                    expect(targetBike.model).toBe("urban");
                    done();
                });
            });
        });
    });

    describe('POST Bikes /update', () => {
        it('STATUS 203', (done) => {
            let aBike1 = Bike.createInstance(10, "red", "urban", [48.3, 2.8]);
            Bike.add(aBike1);
    
            let headers = {'content-type' : 'application/json'};
            let aBike = '{ "code": 10, "color": "blue", "model": "sport", "lat": 47.2, "lon": 2.5 }';
    
            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bikes/update',
                body: aBike
            }, function(error, response, body) {
                expect(response.statusCode).toBe(203);
                
                Bike.findByCode(10, function(error, targetBike) {
                    expect(targetBike.code).toBe(10);
                    expect(targetBike.color).toBe("blue");
                    expect(targetBike.model).toBe("sport");
                    done();
                });
            });
        });
    });

    describe('POST Bikes /delete', () => {
        it('STATUS 204', (done) => {
            let aBike1 = Bike.createInstance(1, "red", "sport", [47.8 ,3.25]);
            let aBike2 = Bike.createInstance(2, "white", "urban", [48.1, 3.21]);
            
            Bike.add(aBike1);
            Bike.add(aBike2);
    
            let headers = {'content-type' : 'application/json'};
            let aBike = '{"code": 1}';
    
            request.delete({
                headers: headers,
                url: 'http://localhost:3000/api/bikes/delete',
                body: aBike
            }, function(error, response, body) {
                expect(response.statusCode).toBe(204);
                Bike.allBikes(function(err, bikis) {
                    expect(bikis.length).toBe(1);
                });
                done();
            });
        });
    });
});