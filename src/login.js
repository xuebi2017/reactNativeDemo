import React, { Component }from "react";
import { Button, View, Text, StyleSheet } from "react-native";

export default class LoginScreen extends Component {
    static navigationOptions = {
      title: '登录页',
    };
    
    render() {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Home Screen</Text>
          <Button
          title="Go to Details"
          onPress={() => {this.props.navigation.navigate('Details', {
              // itemId: 86,
              otherParam: '详情页',
          })}}
          />
        </View>
      );
    }
  }