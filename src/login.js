import React, { Component }from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default class LoginScreen extends Component {
    static navigationOptions = {
      title: '登录页',
    };
    
    render() {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View style={styles.loginInfo}>
            <Text>用户名</Text>
            <TextInput placeholder="请输入用户名"></TextInput>
          </View>
          <Button
          title="登录"
          onPress={() => {this.props.navigation.navigate('Details', {
              // itemId: 86,
              otherParam: '详情页',
          })}}
          />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
      loginInfo: {
        width: 200,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      }

  });