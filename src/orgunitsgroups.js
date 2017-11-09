import React from 'react'
import {init} from 'd2/lib/d2'
export default class Orgunitsgroups extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      selected:""
    }
    this.handleChangeGroupSet = this.handleChangeGroupSet.bind(this);
    this.handleUpdateGroups = this.handleUpdateGroups.bind(this);
  }
  handleChangeGroupSet(event) {

    var groupSet_return;
    if(event.target.value == "") {
      this.setState({
        groups: []
      })
    }else{
      this.props.groupSets.forEach(function(groupSet){
        if(event.target.value == groupSet.id){
          groupSet_return = groupSet;
        }
      });
      let linked_groups = groupSet_return.organisationUnitGroups.toArray();
      this.setState({
        groups: linked_groups
      })
      //console.log(linked_groups);
      let that = this
      linked_groups.forEach(function(existant_groups) {
        that.props.Orggroups.forEach(function(linked_group){
          //console.log("test",linked_group.id, existant_groups.id )
          if(existant_groups.id == linked_group.id) {

            that.setState({
              selected:existant_groups.id
            });
          }
        });
      });


    }

  }

  handleUpdateGroups(event) {
    let new_group = event.target.value;
    init(this.props.serverConnection)
    .then(d2 => {
        d2.models.organisationUnits.get(this.props.orgUnit_id)
        .then(orgUnit => {
          let orgUnitGroup = d2.models.organisationUnitGroup.create()
          orgUnit.organisationUnitGroups.add(new_group)
          console.log("log",orgUnit.organisationUnitGroups.list())
          orgUnitGroup.id = new_group

        })
    })
  }
  render() {
    //console.log(this.props.groupSets);
    return (<div>
      <select onChange={this.handleChangeGroupSet}>
      <option value="">Select ...</option>
      {this.props.groupSets.map(groupSet => <GroupSet groupSet={groupSet}/>)}
      </select>
      <br/>
      <select onChange={this.handleUpdateGroups}>
      <option value="">Select ...</option>
      {this.state.groups.map(groupSet => <Groups groupSet={groupSet} selected={this.state.selected}/>)}
      </select>
      </div>)
  }
}

class GroupSet extends React.Component{
  render() {
    //console.log(this.props.orgUniGroup_ids)
    return (
        <option value={this.props.groupSet.id} >
              {this.props.groupSet.displayName}
          </option>)
  }
}

class Groups extends React.Component{
  render() {
    console.log(this.props.selected)
    return (
        <option value={this.props.groupSet.id} selected={this.props.groupSet.id == this.props.selected}>
              {this.props.groupSet.displayName}
          </option>)
  }
}
