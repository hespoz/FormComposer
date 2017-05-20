/**
 * Created by hespoz on 5/20/17.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput
} from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class DatePickerControlControl extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        //Get field.

        let field = this.props.form.fields[this.props.index];

        return(
            <DatePicker
                key={this.props.index}
                style={styles.control}
                date={field.value}
                mode="date"
                placeholder="selecciona una fecha"
                format="YYYY-MM-DD"
                minDate="1900-01-01"
                maxDate="2226-12-12"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 36

                      }
                    }}
                onDateChange={(text) => {

                    //Get a copy of the complete form.

                    field.value = text;

                    let form = this.props.form;
                    //Update value.
                    form.fields[this.props.index] = field;

                    this.props.updateFormState(form);

                }}
            />);
    }
}


const styles = StyleSheet.create({
    control: {
        width:'99%',
        marginRight:10,
        marginTop:10
    }
});
