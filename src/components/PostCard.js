import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, CardItem, Body } from "native-base";

export default class PostCard extends Component {
  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity onPress={() => this.props.handlePressCard(item)}>
        <Card style={styles.card}>
          <CardItem cardBody>
            <Body>
              <Text>
                Title: &nbsp;
                <Text style={styles.itemText}>{item.title}</Text>
              </Text>
            </Body>
          </CardItem>
          <CardItem cardBody>
            <Body>
              <Text>
                URL: &nbsp;
                <Text style={styles.itemText}>{item.url}</Text>
              </Text>
            </Body>
          </CardItem>
          <CardItem cardBody>
            <Body>
              <Text>
                Created At: &nbsp;
                <Text style={styles.itemText}>{item.created_at}</Text>
              </Text>
            </Body>
          </CardItem>
          <CardItem cardBody>
            <Body>
              <Text>
                Author: &nbsp;
                <Text style={styles.itemText}>{item.author}</Text>
              </Text>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
  itemText: {
    fontWeight: "bold",
  },
});
