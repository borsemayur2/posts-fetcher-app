import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Button, Icon } from "native-base";

import SearchBar from "./SearchBar";
import PostCard from "./PostCard";
import FAB from "./FAB";

const baseURL = "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=";

const initialState = {
  posts: [],
  loader: true,
  searchText: "",
  filterIndex: 1,
  nextPage: 0,
};

export default class PostList extends Component {
  state = {
    ...initialState,
  };
  componentDidMount() {
    this.flatList = React.createRef();
    this.fetchPosts();
    this.interval = setInterval(this.fetchPosts, 10 * 1000);
  }

  fetchPosts = (page = 0) => {
    let url = baseURL + page;
    this.setState({ loader: true });
    console.log("fetching posts of page ", page);

    fetch(url)
      .then((res) => res.json())
      .then((json) =>
        this.setState(
          {
            posts: page ? [...this.state.posts, ...json.hits] : json.hits,
            nextPage: page ? page + 1 : 1,
          },
          () => {
            if (!page) {
              this.flatList.scrollToIndex({ animated: false, index: 0 });
            }
            this.getSearchPosts();
          }
        )
      )
      .catch((error) => console.log(error))
      .finally(() => this.setState({ loader: false }));
  };

  handlePress = () => this.fetchPosts();

  handlePressCard = (item) => {
    this.props.navigation.navigate("post", { item: item });
  };

  getSearchText = (searchText) => {
    this.setState({ searchText: searchText }, () => {
      this.getSearchPosts();
    });
  };

  getSearchPosts = () => {
    if (!this.state.searchText) {
      return;
    }
    const searchedPosts = this.state.posts.filter((post) => {
      let values = Object.values(post);
      for (let value of values) {
        if (
          typeof value === "string" &&
          value.toLowerCase().includes(this.state.searchText.toLowerCase())
        ) {
          return true;
        }
      }
    });

    this.setState({ posts: searchedPosts });
  };

  setFilter = (index) => {
    this.setState({ filterIndex: index }, () => this.filterPosts());
  };

  filterPosts = () => {
    if (this.state.filterIndex === 2) {
      return;
    }

    let filteredPosts = [];
    if (this.state.filterIndex === 1) {
      filteredPosts = this.state.posts.sort((a, b) => a.title > b.title);
    } else {
      filteredPosts = this.state.posts.sort((a, b) => a.date > b.date);
    }
    this.setState({
      posts: filteredPosts,
    });
  };

  addNextPageData = () => {
    this.fetchPosts(this.state.nextPage);
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          getSearchText={this.getSearchText}
          fetchPosts={this.fetchPosts}
        />
        <Button style={styles.button} onPress={this.handlePress}>
          {this.state.loader ? (
            <ActivityIndicator
              style={styles.buttonLoader}
              animating={this.state.loader}
              size="large"
            />
          ) : (
            <Icon style={styles.text} name="refresh" />
          )}
        </Button>
        <FAB setFilter={this.setFilter} />
        <SafeAreaView style={styles.safeAreaView}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 300 }}
            style={styles.flatList}
            refreshing={this.state.loader}
            onRefresh={this.fetchPosts}
            data={this.state.posts}
            keyExtractor={(item) => item.title}
            onEndReached={this.addNextPageData}
            onEndReachedThreshold={1}
            ref={(ref) => (this.flatList = ref)}
            renderItem={({ item }) => (
              <PostCard item={item} handlePressCard={this.handlePressCard} />
            )}
          ></FlatList>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  safeAreaView: {},
  flatList: {},
  button: {
    width: 100,
    alignContent: "center",
    margin: 10,
    alignSelf: "center",
    backgroundColor: "#5067FF",
    borderRadius: 20,
  },
  text: {
    color: "white",
    padding: 20,
  },
  buttonLoader: {
    marginLeft: 30,
  },
});
