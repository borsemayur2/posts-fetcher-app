import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Post from "./src/components/Post";
import PostList from "./src/components/PostList";

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="postlist"
            component={PostList}
            options={{ title: "Post List" }}
          />
          <Stack.Screen
            name="post"
            component={Post}
            options={{ title: "Post Data" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
