function Bike (id, color, model, location)  {
    this.id = id;
    this.color = color;
    this.model = model;
    this.location = location;
};

Bike.prototype.toString = function() {
    return `id: ${this.id}  | color:   ${this.color}`;
};

Bike.allBikes = [];
Bike.add = (bike)=>{
    Bike.allBikes.push(bike);
};

Bike.findById = (bikeId)=>{
    let aBike = Bike.allBikes.find(x => x.id == bikeId);
    if (aBike)
        return aBike;
    else    
        throw new Error(`We didn't find a bike with the id ${bikeId}`);    
};



 Bike.removeById = (bikeId)=>{
     for (let i=0; i< Bike.allBikes.length;i++){
         if (Bike.allBikes[i].id == bikeId){
            Bike.allBikes.splice(i, 1);
            break;
         }
     }
 };

let bike1 = new Bike(1, 'red', 'urban', [-34.60012424, -583861497]);

let bike2 = new Bike(2, 'white', 'urban', [-34.596932, -58.3808287]);

Bike.add(bike1);
Bike.add(bike2);


module.exports = Bike;