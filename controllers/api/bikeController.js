let Bike = require('../../models/bike');

exports.bike_list = (req,res)=>{
    res.status(200).json({
        bikes: Bike.allBikes
    });
}

exports.bike_create = (req,res)=>{
    let biki = new Bike(req.body.id,req.body.color,req.body.model);
    biki.location = [req.body.lat, req.body.lon];

    Bike.add(biki);

    res.status(200).json({
        bike: biki
    })
}

exports.bike_delete = (req,res)=>{
    Bike.removeById(req.body.id);
    res.status(204).send();
}

exports.bike_update = (req,res)=>{


    let biki = Bike.findById(req.body.id);
    biki.id = req.body.id;
    biki.color = req.body.color;
    biki.model = req.body.model;
    biki.location = [req.body.lat, req.body.lon];

    res.status(200).json({
        bike: biki
    })
}