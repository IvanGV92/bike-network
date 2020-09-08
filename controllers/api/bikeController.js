let Bike = require('../../models/bike');

exports.bike_list = (req,res)=>{
    Bike.find({}, (err, bikes) => {
        if (err) console.log(err);

        res.status(200).json({
            bikes: bikes
        });
    });
};

exports.bike_create = (req,res)=>{

    let biki = new Bike({ code: req.body.code, color: req.body.color, model: req.body.model });
  
    biki.location = [req.body.lat, req.body.lon];

    biki.save(function(err) {
        if (err) console.log(err);

        res.status(200).json(biki);
    });
}

exports.bike_delete = (req,res)=>{
    Bike.removeByCode(req.body.code, (err, result) => {
        if (err) console.log(err);

        res.status(204).send(result);
    });
};

exports.bike_update = (req,res)=>{

    Bike.findByCode(req.body.code, (err, targetBike) => {
        if (err) console.log(err);

    
        targetBike.code = req.body.code;
        targetBike.color = req.body.color;
        targetBike.model = req.body.model;
        targetBike.location = [req.body.lat, req.body.lon];
        targetBike.save();

    res.status(203).json({
        targetBike: targetBike
    });
});
    
};