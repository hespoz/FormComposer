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
  NavigatorIOS,
  View,
  TextInput,
  Picker
} from 'react-native';

import RoutesConfig from './containers/RoutesConfig'

AppRegistry.registerComponent('FormComposerApp', () => RoutesConfig);
