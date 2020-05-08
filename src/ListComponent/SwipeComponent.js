import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { connect } from "react-redux";
import TrackingListComponent from "./TrackingListComponent";
import StackNavComponent from "../StackNavComponent";
class SwipeComponent extends Component {
  render() {
    return (
      <Swiper
        loop={false}
        showsButtons={false}
        dotColor="transparent"
        activeDotColor="transparent"
      >
        <StackNavComponent />
        <View style={styles.containerStyle}>
          <TrackingListComponent navigation={this.props.navigation} />
        </View>
      </Swiper>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginDetails: state.storeValue.loginDetails,
  };
}

export default connect(mapStateToProps)(SwipeComponent);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
