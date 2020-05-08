import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
const { width } = Dimensions.get("window");
import { Icon } from "react-native-elements";

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: props.listType,
      title: props.title,
    };
  }

  changeMode() {
    const {navVar} = this.props
    if (this.state.showList) {
      navVar.goBack();
      navVar.navigate("EventGridScreen");
    } else {
      navVar.goBack();
      navVar.navigate("EventListScreen");
    }
  }

  render() {
    return (
      <SafeAreaView style={Styles.outerContainer}>
        <StatusBar backgroundColor="#0966aa" barStyle="light-content" />
        <View style={Styles.titleViewStyle}>
          <Text style={Styles.titleStyle}>
            {this.state.title ? this.state.title : "Info"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => this.changeMode()}
          style={Styles.iconViewStyle}
        >
          {this.state.showList == undefined ? null : this.state.showList ? (
            <Icon
              name="grid"
              type="entypo"
              color="#fff"
              size={35}
              underlayColor="transparent"
            />
          ) : (
            <Icon
              name="list"
              type="entypo"
              color="#fff"
              size={35}
              underlayColor="transparent"
            />
          )}
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const Styles = StyleSheet.create({
  outerContainer: {
    height: 50,
    width: width,
    backgroundColor: "#0966aa",
    flexDirection: "row",
    padding: 10,
    elevation: 10,
  },
  titleViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: 22,
    color: "#fff",
  },
});
