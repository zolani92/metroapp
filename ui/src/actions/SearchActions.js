import { GO_BACK,
			STATIONS_FOUND, 
			ITINERARY_UPDATE_DEPARTURE, 
			ITINERARY_UPDATE_ARRIVAL, 
			ITINERARY_FOUND_ITINERARY } from './types';
import axios from 'axios';

export const goBack = () => {
	return {
		type: GO_BACK
	};
};

export const findStations = () => {
	return (dispatch) => {
		axios.get('http://localhost:2998/metro/stations')
      	.then((response) => {
 			dispatch({ 
 				type: STATIONS_FOUND,
 				payload: response.data
 			});
 		});
	};
};

export const itineraryUpdateDeparture = (departureStationName) => {
	return {
		type: ITINERARY_UPDATE_DEPARTURE,
		payload: departureStationName
	}
};

export const itineraryUpdateArrival = (arrivalStationName) => {
	return {
		type: ITINERARY_UPDATE_ARRIVAL,
		payload: arrivalStationName
	}
};

export const itineraryFindItinerary = ({ departureStationName, arrivalStationName }) => {
	return (dispatch) => {
		axios.post('http://localhost:2998/metro/shortestPath', {
	    	departureStationName,
	    	arrivalStationName
 		}).then((response) => {
 			dispatch({ 
 				type: ITINERARY_FOUND_ITINERARY,
 				payload: response.data
 			});
 		});
	};
};