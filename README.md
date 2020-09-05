# bike-network
Node Js Project

This is a simple Node Js back-end server to provide functionality to a bike-network company. Please install the dependencies using npm install. 

If you want to create users please go to http://localhost:3000/users and create a new user to login. After you can login to the app, you can see a list of all created bikes in the following url http://localhost:3000/bikes/, and you can create, edit or delete bikes as you require.

If you want to login or logout you can use the following URLs: http://localhost:3000/login, http://localhost:3000/logout 

In order to access the API , please run the dev server " npm run devstart " in a terminal and use a localhost URL. f.e: http://localhost:3000/api/bikes/
Please remember that this new version includes JWT authentication. Therefore, in order to access API's available methods, please authenticate via http://localhost:3000/api/auth/authenticate by sending a POST request with your email and password previously created in the body's request.

Available API methods: 
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
