import React, { Component } from 'react';
import NotUseMenu from './NotUseMenu';
import Tabs from './Tabs';
import FormView from './FormView';
import FormEntryListView from './FormEntryListView';
import {Scene, Router} from 'react-native-router-flux';
import DBHelper from './helpers/DBHelper.js';


const getSceneStyle = (props, computedProps) => {
  const style = {
    flex: 1
  };
  return style;
};


export default class RoutesConfig extends Component {

  constructor(props){
    super(props);
    DBHelper.openDatabase();
    DBHelper.initTables();
  }

  errorCB = () => {
      console.log("SQL executed fine");
  }

  openCB = () => {
      console.log("Database OPENED");
  }

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="menu" component={NotUseMenu} initial={true} hideNavBar hideTabBar/>
          <Scene key="form" component={FormView} hideNavBar hideTabBar/>
          <Scene key="formEntryListView" component={FormEntryListView} hideNavBar hideTabBar/>
        </Scene>
      </Router>
    )
  }
}
