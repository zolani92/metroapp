import React, { Component } from 'react';
import { Dropdown, Grid, Form, Button } from 'semantic-ui-react';
import PageComponent from './PageComponent';
import { findStations,
			itineraryUpdateDeparture, 
			itineraryUpdateArrival, 
			itineraryFindItinerary 
		} from './actions/SearchActions';
import { connect } from 'react-redux';

class SearchComponent extends Component {	
	componentWillMount() {
    	this.props.findStations();
  	}

	render() {
		var stationOptions = [];
		this.props.stations.forEach((station) => {
			stationOptions.push({value: station, text: station});
		});
		return (
			<PageComponent>
				<Form>
					<Grid divided='vertically'>
    					<Grid.Row columns={2}>
      						<Grid.Column>
        						<Form.Field>
									<label>From</label>
									<Dropdown 
										placeholder='Departure' 
										fluid search selection 
										options={stationOptions} 
										onChange={ 
											(event, dropdown) => this.props.itineraryUpdateDeparture(dropdown.value) 
										} />
								</Form.Field>
      						</Grid.Column>
      						<Grid.Column>
        						<Form.Field>
									<label>To</label>
									<Dropdown 
										placeholder='Arrival' 
										fluid search selection 
										options={stationOptions} 
										onChange={ 
											(event, dropdown) => this.props.itineraryUpdateArrival(dropdown.value) 
										} />
								</Form.Field>	
      						</Grid.Column>
    					</Grid.Row>
  					</Grid>
					<Button fluid onClick={() => {
	  					this.props.itineraryFindItinerary({ 
	  						departureStationName: this.props.departureStationName, 
	  						arrivalStationName: this.props.arrivalStationName
	  					});
					}}>
    					Find itinerary
					</Button>
				</Form>
			</PageComponent>
		);
	}
}

const mapStateToProps = ({ search }) => {
	return {
		stations: search.stations,
		departureStationName: search.searchCriteria.departureStationName,
		arrivalStationName: search.searchCriteria.arrivalStationName
	};
};

export default connect(mapStateToProps, {itineraryUpdateDeparture, 
										itineraryUpdateArrival,
										itineraryFindItinerary,
										findStations})(SearchComponent);