import React, { Component }  from 'react';
import { View, Text, StyleSheet,TextInput,Picker,Switch, Button, Alert } from 'react-native';

import { Actions } from 'react-native-router-flux';
import NavigationBar from 'react-native-navbar';
import InputControl from './controls/InputControl.js';
import CheckBoxControl from './controls/CheckBoxControl.js';
import DatePickerControl from './controls/DatePickerControl.js';
import DropDownControl from './controls/DropDownControl.js';
import SignatureControl from './controls/SignatureControl.js';
import SQLite from 'react-native-sqlite-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

const leftButtonConfig = {
  title: 'Back',
  handler: () => Actions.pop()
};



class FormView extends Component {

  constructor(props){
    super(props);
    this.state = {
      db : SQLite.openDatabase("FormComposerData6.db", "1.0", "Test Database", 200000, this.openCB, this.errorCB),
      form:props.form
    };
  }

  updateFormState = (newForm) => {
    this.setState({form:newForm});
  }

  saveForm = () => {
      let formToSave = this.state.form;
    this.state.db.transaction((tx) => {

        //Check if the form exists, and if so get the number of parameters.
        tx.executeSql('SELECT * FROM Forms WHERE name = ?', [this.props.form.form], (tx, results) => {

            var len = results.rows.length;
            if (results.rows.length >= 1) {
                //Get number of instances.
                var id = results.rows.item(0).id;
                var instances = results.rows.item(0).numberIntances;
                instances++;

                console.log("id", id);
                console.log("instances", instances);

                tx.executeSql('UPDATE Forms SET numberIntances = ? WHERE id = ?', [instances, id], function(tx,res){

                    console.log("Update forms");



                    tx.executeSql('SELECT * FROM FormEntry WHERE form_id = ?', [id], (tx, results) => {

                        if (results.rows.length == 0) {

                            tx.executeSql('INSERT INTO FormEntry (formContent, form_id) VALUES (?, ?)', [formToSave, id], function(tx,res){
                                console.log("INSERT FORMENTRY")
                            });

                        } else {



                            tx.executeSql('UPDATE FormEntry SET formContent = ? WHERE id = ?', [Math.random(), results.rows.item(0).id], function(tx,res) {
                                console.log("Update formentry");
                            });

                        }

                    });





                });


            } else {
                tx.executeSql('INSERT INTO Forms(name, numberIntances) VALUES (?, ?)', [this.props.form.form, 1], function (tx,res) {
                    console.log(res);
                    console.log('resultSet.insertId: ' + res.insertId);
                    console.log('resultSet.rowsAffected: ' + res.rowsAffected);

                    //formContent, score, form_id

                    tx.executeSql('INSERT INTO FormEntry(formContent, form_id) VALUES (?, ?)', [formToSave, res.insertId] ,function(resultSet){
                        console.log('resultSet.insertId: ' + resultSet.insertId);
                    });


                }, function(error) {
                    console.log('SELECT error: ' + error.message);
                });
            }


        });


    });
  }

  saveFormAndSend = () => {
    Alert.alert('saveForm');
  }

  errorCB = () => {
      console.log("SQL executed fine");
  }

  openCB = () => {
      console.log("Database OPENED");
  }

  render(){
    return (
      <View style={styles.container}>
          <NavigationBar
                  title={ {
                    title: this.props.form.form
                  }}
                  leftButton={leftButtonConfig}
          />


          {this.state.form.fields.map((field,index) => {

            switch(field.type){
              case 'text': case 'password':
                  return (<InputControl index={index} form={this.state.form} updateFormState={this.updateFormState}/>);
                break;
              case 'checkbox':
                  return (<CheckBoxControl index={index} form={this.state.form} updateFormState={this.updateFormState}/>)
                  break;
              case 'date':
                return(<DatePickerControl index={index} form={this.state.form} updateFormState={this.updateFormState}/>);
                  break;
              case 'select':
                return (<DropDownControl index={index} form={this.state.form} updateFormState={this.updateFormState}/>);
                  break;
                case 'signature':
                  return (<SignatureControl index={index} form={this.state.form} updateFormState={this.updateFormState}/>);
                  break;
              default:
               return null;
            }


          })}

        <Button
            onPress={this.saveForm}
            title="Save form locally"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />

        <Button
            onPress={this.saveFormAndSend}
            title="Save form locally"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />

      </View>
    )
  }

}

module.exports = FormView;
