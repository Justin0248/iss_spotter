const { get } = require('request');
let request = require('request');


const nextISSTimesForMyLocation = function(callback) {
fetchMyIP((error, ip) => {
    if (error) {
        callback(error, null);
        return;
    }

fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
        callback(error, null);
    }

fetchISSFlyOverTimes(coords, (error, passing) => {
    if (error) {
        callback(error, null);
        return;
    }

callback (null, passing);
});
});
});
}








const fetchMyIP = function(callback) {
    request.get(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) {
        callback(error, null) 
        return;
    }
    const ip = JSON.parse(body);
    callback(null, ip);
    
    })
    };



const fetchCoordsByIP = function(ip, callback) {
request.get('http://ipwho.is/',(error,response,body) => {
    if (error) {
        callback(error,null)
        return;
    }
    const data = JSON.parse(body);
    if (!data.success) {
        const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
        callback(Error(message), null);
        return;
      } 
const {latitude, longitude} = data;
callback(null, {latitude, longitude});
});
};


  
const fetchISSFlyOverTimes = function (coords, callback) {
    request.get("https://iss-flyover.herokuapp.com/json/?lat=49.0743308&lon=-122.5593218",(error, response, body) => {
       if (error) {
        callback(error, null);
        return;
       }
       if(response.statusCode !== 200) {
        callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
        return;
       }
       
        const data = JSON.parse(body).response;
       callback(null, data);

    })  
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };