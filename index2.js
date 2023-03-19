const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss_promised.js');
const {PrintPass} = require('./index')
nextISSTimesForMyLocation()
    .then((passTimes) => {
        PrintPass(passTimes);
    })
    .catch((error) => {
        console.log('It didnn\'t work: ', error.message);
    })