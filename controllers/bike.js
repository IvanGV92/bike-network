const Bike = require('../models/bike');

module.exports ={

    bike_list: function(req, res, next){
    Bike.find({},(err,bikies)=>{
        res.render('bikes/index', {bikies: bikies});
    });
    },


    bike_create_get: (req, res, next)=>{
    res.render('bikes/create',{ errors:{}, bike: new Bike()});
    },


    bike_create_post: (req, res, next)=>{
        Bike.create({
            code: req.body.code,
            color: req.body.color,
            model: req.body.model,
            location: [req.body.lat, req.body.lon]
        }, function(err){
            if(err){
                res.render('bikes/create',{
                    errors: err.errors,
                    bike: new Bike({
                        code: req.body.code,
                        color: req.body.color,
                        model: req.body.model,
                        location: [req.body.lat, req.body.lon]
                    })
                });
            } else{
                res.redirect('/bikes');
                }
            });
    },

    bike_update_get: (req, res,next)=>{
        Bike.findById(req.params.id, function(err, biki){
            res.render('bikes/update', { errors: {}, biki: biki });
        });
    },

    bike_update_post: (req, res,next)=>{
        let update_values = {
            code: req.body.code,
            color: req.body.color,
            model: req.body.model,
            location: [req.body.lat, req.body.lon],
        };

        Bike.findByIdAndUpdate(req.params.id, update_values, function(err, bike) {
            if (err) {
                console.log(err);
                res.render('bikes/update', {
                    errors: err.errors,
                    bikie: new Bike({
                        code: req.body.code,
                        color: req.body.color,
                        model: req.body.model,
                        location: [req.body.lat, req.body.lon],
                    }),
                });
            } else {
                res.redirect('/bikes');
                return;
            }
        });
    },

    bike_delete_post: (req,res,next)=>{
    Bike.findByIdAndDelete(req.body.id, function(err){
        if(err) next(err);
        else res.redirect('/bikes');
    });
    },

};