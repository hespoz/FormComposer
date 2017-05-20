/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker
} from 'react-native';

export default class FormComposerApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form : {
        form:"123123",
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
          },
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
        ]
      }
    };
  }



  render() {
    console.log(this.state);
    let that = this;
    return (
      <View style={styles.container}>

        {this.state.form.fields.map(function(field,index){

          switch(field.type){
            case 'text':
              return (<TextInput
                key={index}
                style={{height: 40, marginTop:10, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => {
                  let form = that.state.form;
                  form.fields[index].value = text;
                  that.setState({form:form});

                  var f = new Function('param','index', form.fields[index].onChange);
                  f(form.fields,index);

                }}
                onBlur={(text) => {
                  console.log("blur",text)
                }}
                value={that.state.form.fields[index].value}
              />);
              break;
            case 'select':

              let items = that.state.form.fields[index].items.map(function(item,index){
                return (<Picker.Item
                  key={item.id}
                  value={item.id}
                  label={item.value}
                />);
              });

              return (
                <Picker
                  key={index}
                  itemStyle={{fontSize: 25, color: 'red', textAlign: 'left', fontWeight: 'bold',height:150,width: 300}}
                  selectedValue={that.state.form.fields[index].value}
                  onValueChange={(text) => {
                    let form = that.state.form;
                    form.fields[index].value = text;
                    that.setState({form:form});
                  }}>
                  {items}
                </Picker>
              );
              break;
            default:
             return null;
          }


        })}



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});

AppRegistry.registerComponent('FormComposerApp', () => FormComposerApp);
