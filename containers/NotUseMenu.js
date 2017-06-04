/**
 * Created by hespoz on 5/8/17.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import TemplatesView from './TemplatesView';
import HistoryView from './HistoryView';

import { Actions } from 'react-native-router-flux';
import Tabs from 'react-native-tabs';

class Menu extends Component {

    constructor(props){
        super(props);
        this.state = {page:'templates'};
    }

    onSelectTemplate = (rowData) => {
        Actions.form(rowData);
    }

    onTabChange = (el) => {
        this.setState({page:el.props.name})
    }

    renderPage = () => {
        switch(this.state.page){
            case 'templates':
                return (<TemplatesView onSelectTemplate={this.onSelectTemplate}/>);
            case 'history':
                return (<HistoryView onSelectTemplate={this.onSelectTemplate}/>);
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
                      selectedStyle={{color:'#09a9d3'}} onSelect={this.onTabChange}>
                    <Text name="templates" selectedIconStyle={{borderTopWidth:2,borderTopColor:'#09a9d3'}}>Templates</Text>
                    <Text name="history" selectedStyle={{borderTopWidth:2,borderTopColor:'#09a9d3'}}>History</Text>
                </Tabs>


                    {this.renderPage()}


            </View>
        );
    }
}

/*const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        height:20
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
});*/


const styles = StyleSheet.create({
    container: {
        flex: 1,
        /*justifyContent: 'center',
        alignItems: 'center',*/
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }
});






module.exports = Menu;
