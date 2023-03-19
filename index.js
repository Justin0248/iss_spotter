const { nextISSTimesForMyLocation } = require('./iss');

const PrintPass = function(passTimes) {
    for (const pass of passTimes) {
        const day = new Date(0);
        day.setUTCSeconds(pass.risetime);
        const duration = pass.duration
        console.log(`The next time it will pass is ${day}, and will last for ${duration}`);
    }
}

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  PrintPass(passTimes);
});