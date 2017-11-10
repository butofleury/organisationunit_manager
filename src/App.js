import React, { Component } from 'react';
import './App.css';
import {init} from 'd2/lib/d2'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Orgunits_list from './orgunits_list.js'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configServer : {
        baseUrl: "http://localhost:8080/api",
        headers : {
          Authorization: "Basic " + btoa("admin:district")
        }
      },
      orgUnits_list : [],
      orgUnitsGroupSets_list : []
    }

    init(this.state.configServer)
    .then(d2 => {
      d2.models.organisationUnit
      .filter()
      .on('level')
      .equals(4)
      .list({paging : true, pageSize : 10, includeAncestors: true, fields: '[*],ancestors[id,displayName],organisationUnitGroups[id,displayName]'})
      .then(organisationunits => {
        this.setState({
          orgUnits_list : organisationunits.toArray()
        });
      })
      .catch(error_fetching_orgUnits => {
          console.warn("Didn't find orgUnits in the query", error_fetching_orgUnits);
      });

      d2.models.organisationUnitGroupSets.list({paging:false,fields: '[*],organisationUnitGroups[id,displayName]'})
      .then(organisationUnitGroupsets => {
        this.setState({
          orgUnitsGroupSets_list : organisationUnitGroupsets.toArray()
        });
      });
    })
    .catch(connection_error => {
        console.warn("Error Server connection", connection_error);
    });

  }

  render() {

    return (
      <div className="App container-fluid">
        <header className="App-header">

        </header>
        <div className="thebody">
          <Orgunits_list states={this.state}/>
        </div>
      </div>
    );
  }
}

export default App;
