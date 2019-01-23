import React, { Component }from "react";
import {View, Button, Text, StyleSheet, TextInput } from "react-native";
import { Toast, Card, WingBlank, WhiteSpace, List, InputItem, Modal } from 'antd-mobile-rn';

export default class LoginScreen extends Component {
    static navigationOptions = {
      title: '登录页',
    };

    constructor(props) {
      super(props);
      this.state = {
        userName: 'admin',
        passWord: '123'
      }
    }

    login = () => {
      Toast.loading("登录中", 0, null, true);
      console.log(222)
      setTimeout(()=> {
        Toast.hide();
        this.props.navigation.navigate('detail', {
          otherParam: '详情页',
        })
      }, 2000) 
    }
    
    render() {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View style={styles.loginInfo}>
            <Text>用户名</Text>
            <TextInput 
              placeholder="请输入用户名"
              value={this.state.userName}
              onChangeText={text => this.setState({userName: text})}
            ></TextInput>
          </View>
          <View style={styles.loginInfo}>
            <Text>密码</Text>
            <TextInput 
            placeholder="请输入密码"
            value={this.state.passWord}
            onChangeText={text => this.setState({passWord: text})}
            ></TextInput>
          </View>
          <Button title="登录" onPress={this.login}/>
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