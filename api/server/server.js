const express = require('express');
const { mongoose } = require('./db/mongoose');
const { Station } = require('./models/station');
const Graph = require('node-dijkstra')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const getLongStationName = (stationName, line) => {
  return stationName + " [" + line + "]";
}

const buildRoute = (stations) => {
  const route = new Graph();
  stations.forEach((station) => {
    station.lines.forEach((line) => {
      var newStationName = getLongStationName(station.name, line);
      var linkedTo = {};
      station.linkedTo.forEach((linkedStation) => {
        if(linkedStation.line === line) {
          var linkedStationName = getLongStationName(linkedStation.name, linkedStation.line);
          linkedTo[linkedStationName] = 1;
        }
      });
      station.lines.forEach((otherLine) => {
        if(line !== otherLine) {
          var otherLineStationName = getLongStationName(station.name, otherLine);
          linkedTo[otherLineStationName] = 3;
        }
      });
      route.addNode(newStationName, linkedTo);
    });
  });
  return route;
};

app.get('/metro/stations', (req, res) => {
  Station.find({}, 'name', {sort: {name: 1}}).then((stations) => {
    const stationsNames = stations.map((station) => station.name).sort(function (a, b) {
      return a.localeCompare(b);
    });
    return res.send(stationsNames);
  }).catch((e) => { res.status(400).send(e); });
});

app.post('/metro/shortestpath', (req, res) => {
  Station.find().then((stations) => {
    return buildRoute(stations);
  }).then((route) => {
    var shortestPath = null;
    Station.findOne({ name: req.body.departureStationName }).then((departureStation) => {
      if(!departureStation) {
        return res.status(404).send('No departure station could be found');
      }
      Station.findOne({ name: req.body.arrivalStationName }).then((arrivalStation) => {
        if(!arrivalStation) {
          return res.status(404).send('No arrival station could be found');
        }
        departureStation.lines.forEach((departureStationLine) => {
          var newDepartureStationName = req.body.departureStationName + ' [' + departureStationLine + ']';
          arrivalStation.lines.forEach((arrivalStationLine) => {
            var newArrivalStationName = req.body.arrivalStationName + ' [' + arrivalStationLine + ']';
            var routes = route.path(newDepartureStationName, newArrivalStationName);
            if(!shortestPath || shortestPath.length > routes.length-1) {
              shortestPath = routes;
            }
          });
        });

        var transfersCount = 0;
        var itinerary = [];
        var currentLine = null;
        var first = true;
        var stationsNames = [];
        
        shortestPath.forEach((longStationName) => {
          var line = longStationName.match(/\[(.*?)\]/)[1];
          var stationName = longStationName.substring(0, longStationName.indexOf('[')-1);
          if(first) {
            currentLine = line;
            first = false;
          }
          if(line === currentLine) {
            stationsNames.push(stationName);
          }
          else {
            itinerary.push({
              line: currentLine,
              stationsNames
            });
            currentLine = line;
            stationsNames = [stationName];
            transfersCount++;
          }
        });
        itinerary.push({
          line: currentLine,
          stationsNames
        });

        res.send({
          departureStationName: req.body.departureStationName,
          arrivalStationName: req.body.arrivalStationName,
          itinerary: itinerary, 
          stationsCount: shortestPath.length-1,
          transfersCount: transfersCount
        });
      });
    });
  }).catch((e) => { res.status(400).send(e) });
});

app.listen(2998, () => {
  console.log('App started on port 2998');
});