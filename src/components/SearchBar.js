import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button } from "native-base";

const initialState = {
  searchText: "",
  searchButtonText: "SEARCH",
};

export default class SearchBar extends Component {
  state = { ...initialState };
  handleChangeText = (text) => {
    this.setState({ searchText: text });
  };

  handlePress = () => {
    if (!this.state.searchText) {
      return;
    }
    if (this.state.searchButtonText === "CLEAR") {
      this.clearSearch();
      this.props.fetchPosts();
    } else {
      this.props.getSearchText(this.state.searchText);
      this.setButtonText("CLEAR");
    }
  };

  setButtonText = (buttonText) => {
    this.setState({
      searchButtonText: buttonText,
    });
  };

  clearSearch = () => {
    this.setState({ ...initialState }, () =>
      this.props.getSearchText(this.state.searchText)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          value={this.state.searchText}
          onChangeText={this.handleChangeText}
        />
        <Button
          large
          full
          style={styles.button}
          onPress={this.handlePress}
          primary
        >
          <Text style={styles.text}>{this.state.searchButtonText}</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    flexGrow: 1,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#5067FF",
    borderRadius: 20
  },
  text: {
    color: "white",
    padding: 10,
  },
});
