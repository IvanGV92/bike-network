const map = L.map('main_map', {
    center: [48.858615, 2.294565],
    zoom: 13
});
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
}).addTo(map);

// let marker = L.marker([48.847242, 2.311524]).addTo(map);
// let marker2 = L.marker([48.874454, 2.295524]).addTo(map);

$.ajax({
    dataType: "json",
    url:"api/bikes",
    success: (result)=>{
        console.log(result);
        result.bikes.forEach(biki => {
            L.marker(biki.location,{title: biki.id}).addTo(map);
        });
    }
})