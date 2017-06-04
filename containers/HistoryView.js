import React, { Component } from 'react';

import {
  View,
  Text,
  ListView,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import NavigationBar from 'react-native-navbar';
import DBHelper from './helpers/DBHelper.js';
import { Actions } from 'react-native-router-flux';


const rightButtonConfig = {
  title: 'Next',
  handler: () => alert('hello!'),
};



export default class HistoryView extends Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        dataSource: ds.cloneWithRows([])
    };

    DBHelper.openDatabase();

      DBHelper.db.transaction((tx) => {
          DBHelper.getAllForms(tx, (tx, results) => {
              let formList = [];
              for(var i=0; i<results.rows.length;i++){
                  formList.push({
                      id:results.rows.item(i).id,
                      instances:  results.rows.item(i).numberIntances,
                      name: results.rows.item(i).name
                  });
              }
              this.setState({dataSource:ds.cloneWithRows(formList)});
          });
      });

  }

    /*onSelectHistoryForm = (rowData) => {
        console.log("onSelectTemplate",rowData);
        //Get form before change the view.

        DBHelper.db.transaction((tx) => {
            DBHelper.getFormEntryById(tx, rowData.id, (tx, results) => {
                let formInfo = {
                    formId:rowData.id,
                    form:results.rows.item(0).formContent
                };

                Actions.formEntryListView(formInfo);

            });
        });


    }*/

    onSelectHistoryForm = (rowData) => {
        Actions.formEntryListView(rowData);
    }


    render(){

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={ {
                  title: 'History',
                }}
                />




                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => {
                     return (
                         <TouchableHighlight onPress={() => {
                             this.onSelectHistoryForm(rowData);
                         }}>
                             <View style={styles.row}>
                                 <Text style={styles.text}>
                                    {rowData.name} and {rowData.instances}
                                 </Text>
                             </View>
                         </TouchableHighlight>
                     );

                     }}
                />





            </View>
        );
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 5,textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    text: {
        flex: 1,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});