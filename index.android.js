/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 var SQLite = require('react-native-sqlite-storage')

 import {
   AppRegistry,
 } from 'react-native';

 import RoutesConfig from './containers/RoutesConfig'

 AppRegistry.registerComponent('FormComposerApp', () => RoutesConfig);
