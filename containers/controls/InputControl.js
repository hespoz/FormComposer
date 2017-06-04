/**
 * Created by hespoz on 5/20/17.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput
} from 'react-native';

export default class InputControl extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        //Get field.

        let field = this.props.form.fields[this.props.index];
        return (
            <TextInput
                key={this.props.index}
                style={styles.control}
                placeholder={field.label}
                onChangeText={(text) => {
                    //Get a copy of the complete form.

                    field.value = text;

                    let form = this.props.form;
                    //Update value.
                    form.fields[this.props.index] = field;

                    var f = new Function('param','index', field.onChange);
                    f(form.fields,this.props.index);


                    this.props.updateFormState(form);


                }}
                secureTextEntry={field.type === 'password'}
                value={field.value}
                defaultValue=''
            />
        );
    }
}


const styles = StyleSheet.create({
    control: {
        height: 40,
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        borderColor: 'gray',
        borderWidth: 1,
        padding:5
    }
});
