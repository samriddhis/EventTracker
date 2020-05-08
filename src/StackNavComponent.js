import { createStackNavigator } from "react-navigation";
import React from "react"
import DetailsComponent from "./ListComponent/DetailsComponent";
import EventListComponent from "./ListComponent/EventListComponent";
import EventGridComponent from "./ListComponent/EventGridComponent";

let screenProps = null;
const StackNav = createStackNavigator(
  {
    EventListScreen:EventListComponent,
    EventGridScreen: EventGridComponent,
    DetailsScreen: DetailsComponent
  },
  {
    initialRouteName: "EventListScreen",
    headerMode: "none",
  }
);

export default StackNav;

// export default class StackNavComponent extends React.Component{
//     constructor(props){
//         super(props)
//         screenProps = this.props.screenProps
//     }
//     render(){
//         return <StackNav />
//     }
// }
