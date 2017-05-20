import React, { Component } from 'react';
import Tabs from './Tabs'
import FormView from './FormView'
import {Scene, Router} from 'react-native-router-flux';
import SQLite from 'react-native-sqlite-storage';

const getSceneStyle = (props, computedProps) => {
  const style = {
    flex: 1
  };
  return style;
};


export default class RoutesConfig extends Component {

  constructor(props){
    super(props);
    var db = SQLite.openDatabase("FormComposerData6.db", "1.0", "Test Database", 200000, this.openCB, this.errorCB);
    db.transaction((tx) => {


        tx.executeSql('CREATE TABLE IF NOT EXISTS Forms (id INTEGER PRIMARY KEY AUTOINCREMENT, name, numberIntances)');
        //formContent saves the form object.
        tx.executeSql('CREATE TABLE IF NOT EXISTS FormEntry (id INTEGER PRIMARY KEY AUTOINCREMENT, formContent, form_id INTEGER, FOREIGN KEY(form_id) REFERENCES Forms(id))');







    });
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
          <Scene key="menu" component={Tabs} initial={true} hideNavBar hideTabBar/>
          <Scene key="form" component={FormView} hideNavBar hideTabBar/>
        </Scene>
      </Router>
    )
  }
}
