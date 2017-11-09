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
      console.log(linked_groups);
      let that = this
      this.props.Orggroups.forEach(function(existant_groups) {
        //console.log("test",existant_groups.id)
        linked_groups.forEach(function(linked_groups){
          if(existant_groups.id == linked_groups.id) {
            that.setState({
              selected:existant_groups.id
            });
            //return
          }
        });
      });


    }

  }
  render() {
    //console.log(this.props.groupSets);
    return (<div>
      <select onChange={this.handleChangeGroupSet}>
      <option value="">Select ...</option>
      {this.props.groupSets.map(groupSet => <GroupSet groupSet={groupSet}/>)}
      </select>
      <br/>
      <select>
      <option value="">Select ...</option>
      {this.state.groups.map(groupSet => <Groups groupSet={groupSet} selected={this.props.selected}/>)}
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
    //console.log(this.props.selected)
    return (
        <option value={this.props.groupSet.id} >
              {this.props.groupSet.displayName}
          </option>)
  }
}
