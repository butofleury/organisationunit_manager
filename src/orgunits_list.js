import React from 'react'
import Orgunitsgroups from './orgunitsgroups.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
export default class Orgunits_list extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    //console.log(this.props.states.orgUnits_list);
    return (<div>
          <table className="table table-striped">
              <thead>
                <tr>
                  <th>District</th>
                  <th>Chiefdom</th>
                  <th>Healh Facility</th>
                  <th>Groups</th>
                </tr>
              </thead>
              <tbody>
              {this.props.states.orgUnits_list.map(orgUnit => <OrgUnitsRow orgUnit_item={orgUnit} orgUnitGroupSets={this.props.states.orgUnitsGroupSets_list} serverConnection={this.props.states.configServer}/>)}
              </tbody>
          </table>
        </div>)
  }
}

class OrgUnitsRow extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    //console.log(this.props.orgUnit_item.organisationUnitGroups.toArray());
    return(
      <tr>
        {this.props.orgUnit_item.ancestors.toArray().splice(1,3).map(ancestor => <OrgUnitsAncestors ancestor={ancestor}/>)}

        <td>{this.props.orgUnit_item.displayName}</td>
        <td><Orgunitsgroups Orggroups={this.props.orgUnit_item.organisationUnitGroups.toArray()} orgUnit_id={this.props.orgUnit_item.id} groupSets={this.props.orgUnitGroupSets} serverConnection={this.props.serverConnection}/></td>
      </tr>
    )
  }
}

class OrgUnitsAncestors extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <td>{this.props.ancestor.displayName}</td>
    )
  }
}
