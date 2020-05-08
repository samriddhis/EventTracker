import React from "react";
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
} from "react-native";

const { height, width } = Dimensions.get("window");
import { connect } from "react-redux";
import HeaderComponent from "./HeaderComponent.js";
import AsyncStorage from "@react-native-community/async-storage";
import data from "../../Data.json";

class EventListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: data,
      listScrollHeight: 0,
      showLoadMask: false,
      userName: props.loginDetails.emailId,
    };
    navVar = this.props.navigation;
  }
  _detailsPage = (item) => {
    this.props.navigation.navigate("DetailsScreen", {
      scope: this,
      item: item,
    });
  };
  retrieveFromAsyncStorage = async (key) => {
    var that = this;
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const retrievedArr = JSON.parse(retrievedItem);
      const storedDtlIndex = retrievedArr.findIndex(function(item) {
        return item.userName.emailId === that.state.userName;
      });
      if (storedDtlIndex >= 0) {
        storedValue = retrievedArr[storedDtlIndex].trackingData;
        that.props.dispatch({
          type: "UPDATE_TRACKING_DETAILS",
          payload: {
            eventDetails: storedValue,
          },
        });
      }
    } catch (error) {
      // Error while retrieving data
    }
  };
  componentDidMount() {
    this.retrieveFromAsyncStorage("TRACKING_LIST_FOR_USER");
  }
  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this._detailsPage(item)}>
        <View style={styles.listViewStyle}>
          <View style={styles.idOuterViewStyle}>
            <View style={styles.idInnerViewStyle}>
              <Image
                style={styles.ImageStyle}
                source={{
                  uri:"https://www.visionmakers.in/wp-content/uploads/2019/10/Best-Online-Video-Platform-to-Broadcast-A-Live-Music-Show-concert.jpg"
                    //"https://tubularinsights.com/wp-content/uploads/2017/03/best-facebook-live-video-content-1440x0-c-default.jpg",
                }}
              />
            </View>
          </View>
          <View style={styles.detailsStyle}>
            <Text style={styles.itemTitleStyle}>
              Event Name :{" "}
              <Text style={styles.itemTextStyle}>{item.EventName}</Text>
            </Text>
            <Text style={styles.itemTitleStyle}>
              Place : <Text style={styles.itemTextStyle}>{item.Location}</Text>
            </Text>
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
      <View style={styles.containerStyle}>
        <HeaderComponent listType={true} navVar={this.props.navigation} />
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
            ItemSeparatorComponent={() => (
              <View style={styles.separatorStyle} />
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
  separatorStyle: {
    width: width,
    height: 12,
    backgroundColor: "#ececec",
  },
  listViewStyle: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 10,
  },
  itemTextStyle: {
    fontSize: 14,
    color: "black",
  },
  itemTitleStyle: {
    fontSize: 12,
    color: "gray",
  },
  topButtonStyle: {
    width: width / 3,
    height: height / 20,
    borderRadius: width / 30,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  listStyle: {
    height: height,
    marginBottom: 15,
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  loadingTxtStyle: {
    color: "gray",
  },
  detailsStyle: {
    flex: 0.8,
    flexDirection: "column",
    padding: 10,
  },
  idOuterViewStyle: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  idInnerViewStyle: {
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  ImageStyle: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  idTxtStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
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
});

function mapStateToProps(state) {
  return {
    loginDetails: state.storeValue.loginDetails,
  };
}

export default connect(mapStateToProps)(EventListComponent);
