import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight
} from 'react-native'

import axios from 'react-native-axios';

import NavigationBar from 'react-native-navbar';

/*let templates = [
  {
    form : {
      form:"Mobil Form",
      fields:[
        {
          id:"nombre",
            label:"Nombre",
          type:"text",
          value:"",
          onChange:"console.log('Inline function 1',param,index)"
        },
        {
          id:"password",
            label:"Password",
          type:"password",
          value:"",
          onChange:"console.log('Inline function 2',param,index)"
        },
        {
            id:"birthday",
            type:"date",
            value:"2016-05-15",
            onChange:"console.log('Accept terms',param,index)"
        } ,
        {
            id:"terms",
            type:"checkbox",
            label:"Eres mayor de edad?",
            value:false,
            onChange:"console.log('Accept terms',param,index)"
        } ,
        {
            id:"city",
            type:"select",
            data:['Medellin', 'Berlin'],
            onChange:"console.log('City selected',param,index)"
        } ,
        {
          id:"signature",
          type:"signature",
          label:"Please put your signature"
        }
      ]
    }
  },
  {
    form : {
      form:"Simple Form",
      fields:[
        {
          id:"nombre",
          type:"text",
          value:"",
          onChange:"console.log('Inline function 1',param,index)"
        },
        {
          id:"password",
          type:"text",
          value:"",
          onChange:"console.log('Inline function 2',param,index)"
        }
      ]
    }
  }
];*/


/*

 ,
 {
 id:"languages",
 type:"select",
 value:1,
 items:[
 {
 id:1,
 value:"Java"
 },
 {
 id:2,
 value:"C#"
 },
 {
 id:3,
 value:"JavaScript"
 },
 {
 id:4,
 value:"Scala"
 }
 ],
 onChange:"console.log('Inline function 2',param,index)"
 }
 */

export default class TemplatesView extends Component {

  constructor() {
    super();
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    };


      this.fetchData();

  }

    fetchData = () => {
        fetch('http://localhost:3000/templates')
            .then((response) => {
            return    response.json()
        })
            .then((responseData) => {
                console.log("responseData", responseData);
                let templates = [];
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                for(var i=0; i<responseData.length;i++){
                    templates.push(JSON.parse(responseData[i].templateJson));
                }
                this.setState({dataSource: ds.cloneWithRows(templates)});
            })
            .done();
    }

  render(){
    return (
      <View style={styles.container}>
        <NavigationBar
                style={{color:'#09a9d3'}}
                tintColor='#09a9d3'
                statusBar={{tintColor:'#09a9d3'}}
                title={{
                  title: 'Templates',
                  tintColor:'white'
                }}
        />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            return (<TouchableHighlight onPress={() => {
              this.props.onSelectTemplate(rowData);
            }}>
            <View>
              <View style={styles.row}>
                <Text style={styles.text}>
                  {rowData.form.form}
                </Text>
              </View>
            </View>
          </TouchableHighlight>);
          }}
        />

      </View>
    )
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
