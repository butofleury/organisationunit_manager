import React from 'react'
import Orgunitsgroups from './orgunitsgroups.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
export default class Orgunits_list extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
          <table className="table table-striped">
              <thead>
                <tr>
                  <th>District</th>
                  <th>Chiefdom</th>
                  <th>Healh Facility</th>
                  <th>Organisation GroupSets ---> <span>Organisation Groups</span></th>
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
        <th><OrgGroupSet orgGroupSet={this.props.orgUnitGroupSets} OrgGroups={this.props.orgUnit_item.organisationUnitGroups.toArray()}/></th>
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

class OrgGroupSet extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    //console.log(this.props.orgGroupSet);
    const groupSet_groups = []
    let that = this
    this.props.orgGroupSet.forEach(function(groupSet) {
      groupSet.organisationUnitGroups.toArray().forEach(function(groups){
        that.props.OrgGroups.forEach(function(group){
          if(groups.id == group.id) {
            groupSet_groups.push({"groupSet" : groupSet.displayName, "groups" : group.displayName})
          }
        })
      })
    })
    return(
      groupSet_groups.map(groupSet=> <p>{groupSet.groupSet}   --->  <span className="groups">{groupSet.groups}</span></p>)
    )
  }
}
