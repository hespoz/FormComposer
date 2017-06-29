'use strict'

import React, { Component } from 'react';

import {
  TabBarIOS
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import TemplatesView from './TemplatesView';
import HistoryView from './HistoryView';


class Tabs extends Component{

  constructor(props){
    super(props)

    this.state = {
      selectedTab: 'templates'
    }
  }

  onSelectTemplate = (rowData) => {
    console.log("onSelectTemplate",rowData);
    Actions.form(rowData);
  }

  render(){
    return(
        <TabBarIOS style={{backgroundColor: '#FFFFFF'}}>

          <TabBarIOS.Item
            title="Templates"
            selected={this.state.selectedTab === 'templates'}
            onPress={() => {
              this.setState({
                selectedTab: 'templates'
              })
            }}>
            <TemplatesView onSelectTemplate={this.onSelectTemplate}/>
          </TabBarIOS.Item>

          <TabBarIOS.Item
            title="History"
            selected={this.state.selectedTab === 'history'}
            onPress={() => {
              this.setState({
                selectedTab: 'history'
              })
            }}>

            <HistoryView/>
          </TabBarIOS.Item>


        </TabBarIOS>

    )
  }
}


module.exports = Tabs;
