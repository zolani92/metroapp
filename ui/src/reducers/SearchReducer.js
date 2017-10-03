import { GO_BACK,
			STATIONS_FOUND, 
			ITINERARY_UPDATE_DEPARTURE, 
			ITINERARY_UPDATE_ARRIVAL, 
			ITINERARY_FOUND_ITINERARY } from './../actions/types';

const INITIAL_STATE = {
	stations: [],
	searchCriteria: {
		departureStationName: '',
		arrivalStationName: ''
	}, 
	itineraryObj: null
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case GO_BACK:
			return INITIAL_STATE;
		case STATIONS_FOUND:
			return {...state, stations: action.payload };
		case ITINERARY_UPDATE_DEPARTURE:
			return {...state, searchCriteria: { ...state.searchCriteria,
						departureStationName: action.payload }};
		case ITINERARY_UPDATE_ARRIVAL:
			return {...state, searchCriteria: { ...state.searchCriteria,
						arrivalStationName: action.payload }};
		case ITINERARY_FOUND_ITINERARY:
			return {...state, itineraryObj: action.payload };
		default:
			return state;
	}
}

