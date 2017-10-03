import React, { Component } from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';

class PageComponent extends Component {
	
	render() {
		return (
			<Container style={{marginTop: '2em'}}>
				<Header size='large' textAlign='center' icon>
					<Icon name='subway' />
				</Header>	
				<Container style={{marginTop: '3em'}}>
					{ this.props.children }
				</Container>
			</Container>
		);
	}

}

export default PageComponent;