# GeoAPI

## About Me
Hello, I'm Kritik Verma, final year undergrad at IIT Ropar and a software Developer with a strong track record of successful internships and a passion for innovative web solutions. I bring a wealth of experience in fullstack development. From crafting robust React.js frontends and lambda api's at 'I’mbesideyou'(summer internship) to optimizing features and creating interactive dashboards at 'Mobishaala' (winter internship). 

### My GitHub Profile [link](https://github.com/vermakritik222)
### My Resume [link](https://drive.google.com/file/d/1DslqFDd9_shn3MQKMlq0C6mH_uvlSLOf/view?usp=sharing)


## Note: Postman Documentation of all the apis are there in [Postman Collections](./GeoAPI.postman_collection.json) 

# APIS 
```js 
API BASE "{{IP}}/api/v1"
```

## Health Check 
```js 
GET "/health-check"
```
## Auth
```js 
POST "/signup"

POST "/login"

POST "/sendotp"

GET "/refresh"

POST "/forgotpassword"

PATCH "/resetpassword/:token"

GET "/logout"

PATCH "/update-email"

GET "/email-verify/:token"

PATCH "/update-password"
```

## User 
```js
GET "/me"

PATCH "/me"
```

## Location 
```js
GET "/locations"

POST "/locations"

// to get the closest points to a given point
GET "/locations/close?targetLatitude=37.7749&targetLongitude=-122.4194&limit=1"

POST "/locations/distance"

```

## API Feature 
```js
// this query parameter can ued to get paginated response
GET "/locations?page=1&limit=10"

// this query parameter can ued to get query fields in response
GET "/locations?fields=title,assigned_user"

// this query parameter can ued to sort data according to any parameter in response
GET "/locations?sort=title"
```
## How To run 
1. ### With NodeJS
   1. run `npm i`

   2. rename `.env.example` a `.env` and add database credential 

   3. run `npm start`

2. ### With Docker
   1. run `docker-compose up`

---