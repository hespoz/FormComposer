/**
 * Created by hespoz on 5/20/17.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

export default class DropDownControl extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        //Get field.

        let field = this.props.form.fields[this.props.index];
        return (

            <ModalDropdown
                style ={styles.control}
                dropdownStyle={styles.dropdownStyle}
                options={field.data}
                onSelect={(idx, value) => {
                    field.value = value;
                    let form = this.props.form;
                    //Update value.
                    form.fields[this.props.index] = field;
                    this.props.updateFormState(form);
                }}/>


        );

    }
}


const styles = StyleSheet.create({
    control: {
        width:'97%',
        marginRight:10,
        marginTop:10,
        backgroundColor: '#F5FCFF',
        borderColor: 'gray',
        borderWidth: 1,
        padding:5,
        marginLeft:5
    },
    dropdownStyle: {
        width:'99%',
        height:'auto'
    }
});
