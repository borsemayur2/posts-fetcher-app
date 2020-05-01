import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import ActionSheet from "react-native-actionsheet";
import { Fab, Icon } from "native-base";

export default class Demo extends Component {
  showActionSheet = () => {
    this.ActionSheet.show();
  };
  render() {
    return (
      <View style={{position: "relative", top:15}}>
        <Fab
          containerStyle={{}}
          style={{ backgroundColor: "#5067FF", marginTop: 10 }}
          position="bottomRight"
          onPress={this.showActionSheet}
        >
          <Icon name="ios-albums" />
        </Fab>
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={"Filter Posts by"}
          options={["Date", "Title", "Cancel"]}
          cancelButtonIndex={2}
          onPress={(index) => this.props.setFilter(index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    padding: 25,
  },
  button: {
    width: 100,
    alignSelf: "center",
    textAlign: "center",
  },
});
