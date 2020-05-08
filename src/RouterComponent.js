import { createStackNavigator } from "react-navigation";
import LoginComponent from "./LoginComponent/LoginComponent";
import TrackingListComponent from "./ListComponent/TrackingListComponent";
import SwipeComponent from "./ListComponent/SwipeComponent";

const stackNav = createStackNavigator(
  {
    LoginScreen: LoginComponent,
    TrackingScreen: TrackingListComponent,
    SwipeScreen: SwipeComponent,
  },
  {
    initialRouteName: "LoginScreen",
    headerMode: "none",
  }
);

export default stackNav;
