import React, { Component } from 'react';
import SearchComponent from './SearchComponent';
import ResultComponent from './ResultComponent';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    if(this.props.itineraryObj !== null) {
      return (
        <ResultComponent/>
      );
    }
    return (
      <SearchComponent/>
    );
  }
}

const mapStateToProps = ({ search }) => {
  return { itineraryObj: search.itineraryObj };
};

export default connect(mapStateToProps, null)(App);