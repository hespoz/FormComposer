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
        console.log("onSelectTemplate",rowData);
        Actions.form(rowData);
    }

    onTabChange = (el) => {
        console.log(el)
        this.setState({page:el.props.name})
    }

    renderPage = () => {
        console.log("this.state.page",this.state.page)
        switch(this.state.page){
            case 'templates':
                return (<TemplatesView onSelectTemplate={this.onSelectTemplate}/>);
            case 'history':
                return (<HistoryView/>);
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
                      selectedStyle={{color:'red'}} onSelect={this.onTabChange}>
                    <Text name="templates" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Templates</Text>
                    <Text name="history" selectedStyle={{color:'green'}}>History</Text>
                </Tabs>

                    {this.renderPage()}


            </View>
        );
    }
}

const styles = StyleSheet.create({
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
});

module.exports = Menu;
