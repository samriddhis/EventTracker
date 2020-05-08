/*This is an Example of Grid View in React Native*/
import React, { Component } from "react";
//import rect in our project
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  SafeAreaView,
} from "react-native";

const { height, width } = Dimensions.get("window");
import { connect } from "react-redux";
import HeaderComponent from "./HeaderComponent.js";
import data from "../../Data.json";

export default class EventGridComponent extends Component {
  constructor() {
    super();
    this.state = {
      listData: data,
      listScrollHeight: 0,
      showLoadMask: false,
    };
  }

  _detailsPage = (item) => {
    this.props.navigation.navigate("DetailsScreen", {
      scope: this,
      item: item,
    });
  };

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this._detailsPage(item)}>
        <View style={styles.listViewStyle}>
          <View style={styles.imageViewStyle}>
            <Image
              style={styles.imageStyle}
              source={{
                uri:
                  "https://www.visionmakers.in/wp-content/uploads/2019/10/Best-Online-Video-Platform-to-Broadcast-A-Live-Music-Show-concert.jpg",
                //"https://tubularinsights.com/wp-content/uploads/2017/03/best-facebook-live-video-content-1440x0-c-default.jpg",
              }}
            />
          </View>
          <View style={styles.detailsViewStyle}>
            <Text style={styles.itemLabelStyle}>Event Name:</Text>
            <Text style={styles.itemTextStyle}>{item.EventName}</Text>
            <View
              style={[
                item.EventType === "Free entry"
                  ? { backgroundColor: "#1abc9c" }
                  : { backgroundColor: "#e74c3c" },
                styles.eventTypeViewStyle,
              ]}
            >
              <Text style={styles.eventTypeStyle}>{item.EventType}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent listType={false} navVar={this.props.navigation} />
        {this.state.showLoadMask ? (
          <Modal
            transparent={true}
            animationType={"none"}
            visible={this.state.showLoadMask}
          >
            <View style={styles.modalBackground}>
              <View style={styles.activityIndicatorWrapper}>
                <Text style={styles.loadingTxtStyle}>Loading.....</Text>
                <ActivityIndicator
                  animating={this.state.showLoadMask}
                  color="#00b5ec"
                />
              </View>
            </View>
          </Modal>
        ) : (
          <View />
        )}
        {this.state.listData == null || this.state.listData.length <= 0 ? (
          <Image
            style={{ width: width, height: height }}
            source={require("../../images/empty_cart1.jpg")}
          />
        ) : (
          <FlatList
            style={styles.listStyle}
            ref={(ref) => (this.listRef = ref)}
            data={this.state.listData}
            renderItem={this._renderItem}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            enableEmptySections={true}
            onScroll={(event) =>
              this.setState({
                listScrollHeight: event.nativeEvent.contentOffset.y,
              })
            }
            stickyHeaderIndices={[0]}
            ListHeaderComponent={() => {
              if (this.state.listScrollHeight > height) {
                return (
                  <View
                    style={{
                      width: width,
                      height: height / 15,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.listRef.scrollToIndex({
                          animated: true,
                          index: 0,
                        })
                      }
                      style={styles.topButtonStyle}
                    >
                      <Text
                        style={{
                          fontSize: height / 55,
                          color: "#008eec",
                        }}
                      >
                        {`Scroll to top`}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              } else return null;
            }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
  listViewStyle: {
    backgroundColor: "#FFFFFF",
    margin: 5,
    borderRadius: 5,
    width: width / 2,
    flex: 1,
    flexDirection: "row",
  },
  imageViewStyle: {
    width: 35,
    height: 35,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: 35,
    height: 35,
    borderRadius: 35,
  },
  detailsViewStyle: {
    width: "auto",
  },
  itemLabelStyle: {
    fontSize: 12,
    color: "gray",
    padding: 2,
    marginLeft: 5,
  },
  itemTextStyle: {
    padding: 2,
    marginLeft: 5,
  },
  eventTypeViewStyle: {
    width: 70,
    height: 20,
    borderRadius: 5,
    margin: 5,
    textAlign: "center",
    justifyContent: "center",
  },
  eventTypeStyle: {
    color: "white",
    padding: 2,
  },
  listStyle: {
    height: height,
    marginBottom: 10,
  },
});
