/**
 * Created by hespoz on 5/20/17.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput
} from 'react-native';
import CheckBox from 'react-native-check-box';

export default class CheckBoxControl extends Component {

    constructor(props){
        super(props);
    }

    render() {
        //Get field.
        let field = this.props.form.fields[this.props.index];
        return (
            <CheckBox
                key={this.props.index}
                style={styles.control}
                onClick={(val)=>{

                        field.value = !val;

                        let form = this.props.form;
                        //Update value.
                        form.fields[this.props.index] = field;

                        var f = new Function('param','index', field.onChange);
                        f(form.fields,this.props.index);


                        this.props.updateFormState(form);


                }}
                isChecked={field.value}
                rightText={field.label}
            />
        );
    }
}

const styles = StyleSheet.create({
    control: {
        padding: 10,
        marginBottom:5
    }
});
