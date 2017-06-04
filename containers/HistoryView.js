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
                      numberInstances:  results.rows.item(i).numberInstances,
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
                    style={{color:'#09a9d3'}}
                    tintColor='#09a9d3'
                    statusBar={{tintColor:'#09a9d3'}}
                    title={{
                  title: 'History',
                  tintColor:'white'
                }}
                />




                <ListView
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    renderRow={(rowData) => {
                     return (
                         <TouchableHighlight onPress={() => {
                             this.onSelectHistoryForm(rowData);
                         }}>
                             <View style={styles.row}>
                                 <Text>
                                    {rowData.name}
                                 </Text>
                                 <Text>
                                    # {rowData.numberInstances}
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
        marginBottom: 5,
        zIndex:-1000
    },
    row: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#F6F6F6',
        justifyContent: 'space-between'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});