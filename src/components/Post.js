import React, { Component } from "react";
import { Text, View } from "react-native";

export default class Post extends Component {
  render() {
    const item = this.props.route.params.item;
    const itemJson = JSON.stringify(item);

    return (
      <View>
        <Text>{itemJson}</Text>
      </View>
    );
  }
}
