import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import NavigationBar from 'react-native-navbar';

const rightButtonConfig = {
  title: 'Next',
  handler: () => alert('hello!'),
};


export default class HistoryView extends Component {
  render(){
    return (
      <View style={styles.container}>
        <NavigationBar style={{
          flex: 1,
          marginTop:50
        }}
        statusBar={{hidden:false}}
                title={ {
                  title: 'History'
                }}
                rightButton={rightButtonConfig}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
