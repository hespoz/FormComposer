/**
 * Created by hespoz on 5/27/17.
 */

import React, { Component } from 'react';

import {
    View,
    Text,
    ListView,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import DBHelper from './helpers/DBHelper.js';
import { Actions } from 'react-native-router-flux';

const leftButtonConfig = {
    title: 'Back',
    handler: () => Actions.pop()
};


export default class FormEntryListView extends Component {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([])
        };


        DBHelper.openDatabase();

        DBHelper.db.transaction((tx) => {
            DBHelper.getFormEntryListByFormId(tx, this.props.id, (tx, results) => {
                let formList = [];
                for(var i=0; i<results.rows.length;i++){
                    formList.push({
                        id:results.rows.item(i).id
                    });
                }
                this.setState({dataSource:ds.cloneWithRows(formList)});
            });
        });



    }

    onSelectHistoryForm = (rowData) => {
     console.log("onSelectTemplate",rowData);
     //Get form before change the view.

     DBHelper.db.transaction((tx) => {
         DBHelper.getFormEntryById(tx, rowData.id, (tx, results) => {
             let formInfo = {
                 formId:rowData.id,
                 form:JSON.parse(results.rows.item(0).formContent)
             };

             console.log("formInfo", formInfo);
             Actions.form(formInfo);

         });
     });


     }

    render(){

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={ {
                    title: this.props.name
                  }}
                    leftButton={leftButtonConfig}
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
                                    {rowData.id}
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
        marginBottom: 5
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