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
import Swipeout from "react-native-swipeout";
import { Icon } from "react-native-elements";
import data from "../../Data.json";

class TrackingListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      listScrollHeight: 0,
      showLoadMask: false,
    };
  }

  retrieveFromAsyncStorage = async (key) => {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const cartVal = JSON.parse(retrievedItem);
      this.setState({ listData: cartVal });
    } catch (error) {
      // Error while retrieving data
    }
  };
  componentDidMount() {
    // this.retrieveFromAsyncStorage("TRACKING_LIST_FOR_USER");
    this.setState({ listData: this.props.trackingDetails });
  }

  _updateListValue = (updatedVal) => {
    this.setState({ listData: updatedVal, showLoadMask: false });
  };

  shouldComponentUpdate(props, state) {
    if (props.trackingDetails !== this.props.trackingDetails) {
      this._updateListValue(props.trackingDetails);
    }
    return true;
  }

  _detailsPage = (item) => {
    this.props.navigation.navigate("DetailsScreen", {
      scope: this,
      item: item,
    });
  };

  _deleteItem = (item) => {
    this.setState({ showLoadMask: true });
    this.props.dispatch({
      type: "DELETE_ITEM_FROM_TRACKING",
      payload: { eventDetails: item },
    });
  };

  _renderItem = ({ item, index }) => {
    const TrashIcon = () => (
      <View style={styles.deleteIcon}>
        <Icon
          name={"delete"}
          type={"material-community"}
          size={24}
          color="#fff"
        />
      </View>
    );
    const deleteBtn = [
      {
        component: <TrashIcon />,
        backgroundColor: "red",
        onPress: () => this._deleteItem(item),
      },
    ];
    return (
      <Swipeout right={deleteBtn} autoClose backgroundColor="transparent">
        <TouchableOpacity onPress={() => this._detailsPage(item)}>
          <View style={styles.listViewStyle}>
            <View style={styles.idOuterViewStyle}>
              <View style={styles.idInnerViewStyle}>
                <Text style={styles.idTxtStyle}>{index + 1}</Text>
              </View>
            </View>
            <View style={styles.detailsStyle}>
              <Text style={styles.itemTitleStyle}>
                Event Name :{" "}
                <Text style={styles.itemTextStyle}>{item.EventName}</Text>
              </Text>
              <Text style={styles.itemTitleStyle}>
                Place :{" "}
                <Text style={styles.itemTextStyle}>{item.Location}</Text>
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
      </Swipeout>
    );
  };

  render() {
    console.log("props are", this.props);
    return (
      <View style={styles.container}>
        <HeaderComponent title={"Tacking List"} />
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
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
  separator: {
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
    marginBottom: 8,
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
    backgroundColor: "#008eed",
    justifyContent: "center",
    alignItems: "center",
  },
  idTxtStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  deleteIcon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    trackingDetails: state.storeValue.trackingDetails,
  };
}

export default connect(mapStateToProps)(TrackingListComponent);
