/**
 * Created by hespoz on 5/20/17.
 */

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TextInput
} from 'react-native';
import SignaturePad from 'react-native-signature-pad';

export default class SignatureControl extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        //Get field.
        let field = this.props.form.fields[this.props.index];
        return (
            <View style={{height: 100, borderColor:'black'}}>
                <SignaturePad
                    onError={(error) => {
                   console.error(error);
                }}
                    onChange={({base64DataUrl}) => {
                   console.log("Got new signature: " + base64DataUrl);
                }}
                    style={styles.control}/>
            </View>
        );

    }
}


const styles = StyleSheet.create({
    control: {
        width:'97%',
        height: 40,
        backgroundColor: 'grey',
        padding:5,
        borderWidth:3,
        marginLeft:5,
        marginTop:10
    },

});
