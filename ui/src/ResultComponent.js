import { List, Container, Header, Label, Icon } from 'semantic-ui-react';
import React, { Component } from 'react';
import PageComponent from './PageComponent';
import { connect } from 'react-redux';
import { goBack } from './actions/SearchActions';

class ResultComponent extends Component {

	render() {

		const { departureStationName, 
			arrivalStationName,
			stationsCount,
			transfersCount,
			itinerary } = this.props.itineraryObj;
			
		const linesList = itinerary.map((itineraryPart) => {
			const stationsList = itineraryPart.stationsNames.map((stationName) =>
				<List.Item><Icon name='angle down' />{ stationName }</List.Item>);
			return (
				<Container>
					<Header size='small' dividing textAlign='center'>
	  					<Icon name='subway' />{itineraryPart.line}
					</Header>
					<List>
						{ stationsList }
					</List>
				</Container>
			);
		});

		return (
			<PageComponent>
				<Container>
					<Container textAlign="center">
			  			<Label size='medium'>
				  			<Icon name='marker' />
				  			{ stationsCount }
						</Label>
						<Label size='medium'>
				  			<Icon name='exchange' />
				  			{ transfersCount }
						</Label>
						<Label size='medium' as='a' onClick={
							() => { this.props.goBack() }
						}>
		    				<Icon name='repeat' />
		  				</Label>
					</Container>	
					<Header size='medium'><Icon name='home' />
						{ departureStationName }
					</Header>
					{ linesList }
					<Header size='medium'><Icon name='flag' />
						{ arrivalStationName }
					</Header>
				</Container>
			</PageComponent>
		);

	}
}

const mapStateToProps = ({ search }) => {
	return { itineraryObj: search.itineraryObj };
};

export default connect(mapStateToProps, { goBack })(ResultComponent);