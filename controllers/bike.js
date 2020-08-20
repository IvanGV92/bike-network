var Bike = require('../models/bike');

exports.bike_list = (req, res)=>{
    res.render('bikes/index', {bikies: Bike.allBikes});
};


exports.bike_create_get = (req, res)=>{
    res.render('bikes/create');
};

exports.bike_create_post = (req, res)=>{
    let biki = new Bike(req.body.id, req.body.color, req.body.model);
    biki.location = [req.body.lat, req.body.lon];
    Bike.add(biki);

    res.redirect('/bikes');
};

exports.bike_update_get = (req, res)=>{
    let biki = Bike.findById(req.params.id);
    res.render('bikes/update',{biki});
};

exports.bike_update_post = (req, res)=>{
    let biki = Bike.findById(req.params.id);
    biki.id = req.body.id;
    biki.color = req.body.color;
    biki.model = req.body.model;
    biki.location = [req.body.lat, req.body.lon];

    res.redirect('/bikes');
};

exports.bike_delete_post = (req,res)=>{
    Bike.removeById(req.body.id);

    res.redirect('/bikes');
}