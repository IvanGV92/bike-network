# bike-network
Node Js Project

This is a simple Node Js back-end server to provide functionality to a bike-network company. Please install the dependencies using npm install. 

In order to access the API , please run the dev server " npm run devstart " in a terminal and use a localhost URL. f.e: http://localhost:3000/api/bikes/
Available methods: 
  - get all bikes: http://localhost:3000/api/bikes/
  - create: http://localhost:3000/api/bikes/create/ 
    body: {
    "code": 50,
    "color": "white",
    "model": "urban",
    "lat": "48.874454",
    "lon":   "2.295524"
}
  - update: http://localhost:3000/api/bikes/update/
   body: {
    "code": 30,
    "color": "black",
    "model": "sport",
    "lat": "47.874454",
    "lon":   "3.295524"
}

  - delete: http://localhost:3000/api/bikes/delete/
   body: {
    "code": 30,
    
}
