import React, { Component }from "react";
import { Button, View, Text, StyleSheet } from "react-native";

export default class DetailsScreen extends Component {
  // static navigationOptions = {
    // title: '详情页',
    
  // };
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', '详情页'),
      headerRight: (
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#fff"
        />
      ),
    }
  }
    render() {
        const  { navigation }  = this.props;
        // console.log('this.props',this.props)
        // console.log('navigation', navigation)
        const  itemId = navigation.getParam('itemId', 'NO-ID');
        const otherParam = navigation.getParam('otherParam', 'some default value')
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Details Screen</Text>
          <Text>itemId:{JSON.stringify(itemId)}</Text>
          <Text>otherParam:{JSON.stringify(otherParam)}</Text>
          <Button
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      );
    }
  }