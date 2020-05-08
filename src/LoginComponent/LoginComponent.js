import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from "react-native";

import { Avatar } from "react-native-elements";
import { NavigationActions, StackActions } from "react-navigation";
import { connect } from "react-redux";
const { height, width } = Dimensions.get("window");

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
    };
  }

  _emptyCheck() {
    if (this.state.userName === "") {
      alert("Please enter a name....");
      return false;
    }
    return true;
  }

  _loginPress() {
    if (this._emptyCheck()) {
      this.props.dispatch({
        type: "LOGIN_STATUS",
        payload: {
          loginStatus: true,
          emailId: this.state.userName,
        },
      });
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "SwipeScreen" })],
        })
      );
    }
  }

  _toggleSwitch() {
    this.setState({
      switchValue: !this.state.switchValue,
      userName: "",
      passWord: "",
    });
  }
  render() {
    return (
      <View style={styles.imageOuterContainer}>
        <StatusBar backgroundColor="#1ADF90" barStyle="light-content" />
        <ImageBackground
          style={styles.imageStyle}
          source={require("../../images/background.jpg")}
        >
          <View style={styles.accViewStyle}>
            <Text style={styles.accTextStyle}>{"My Account"}</Text>
          </View>

          <View style={styles.outerContainer}>
            <TextInput
              style={styles.loginStyle}
              underlineColorAndroid="#D3D3D3"
              placeholder="User name"
              keyboardType="email-address"
              onChangeText={(userName) => this.setState({ userName })}
              value={this.state.userName}
            />
            <TouchableOpacity
              style={styles.buttonStyle}
              color="#0966aa"
              onPress={() => this._loginPress()}
            >
              <Text style={{ color: "#fff" }}>{"Log in"}</Text>
            </TouchableOpacity>

            <View style={styles.iconStyle}>
              <View style={styles.iconRoundStyle}>
                <Avatar
                  rounded
                  size="medium"
                  icon={{ name: "user", type: "entypo", size: 50 }}
                  overlayContainerStyle={{ backgroundColor: "#00cc66" }}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  accViewStyle: {
    width: width / 2,
    height: height / 10,
    alignItems: "center",
  },
  accTextStyle: {
    color: "#fff",
    fontSize: 25,
  },
  iconStyle: {
    width: width / 5,
    height: height / 10,
    borderRadius: 40,
    backgroundColor: "#00cc66",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -40,
  },
  iconRoundStyle: {
    width: width / 7,
    height: height / 14,
    borderRadius: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  outerContainer: {
    width: width / 1.3,
    height: height / 2.3,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 2.0,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loginStyle: { width: width / 1.8 },
  buttonStyle: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    width: width / 1.5,
    height: height / 16,
    borderRadius: 3,
    backgroundColor: "#0966aa",
  },
});

function mapStateToProps(state) {
  return {
    loginStatus: state.storeValue.isLoggedIn,
  };
}

export default connect(mapStateToProps)(LoginComponent);
