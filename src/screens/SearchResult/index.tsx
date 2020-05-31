import React,{Component} from "react";
import {View} from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {ThemeColor} from "../../constants/theme";

const Tab = createMaterialTopTabNavigator();

class SearchResult extends Component{
  setting() {
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>

      </View>
    );
  }

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          scrollEnabled: true,
          tabStyle: {
            paddingVertical: 0,
            paddingHorizontal: 20,
            width: 'auto',
          },
          activeTintColor: ThemeColor,
          inactiveTintColor: '#000000',
          indicatorStyle: {
            backgroundColor: ThemeColor,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={this.setting}
          options={{
            tabBarLabel: '综合'
          }}
        />
        <Tab.Screen
          name="Home1"
          component={this.setting}
          options={{
            tabBarLabel: '单曲'
          }}
        />
        <Tab.Screen
          name="Home2"
          component={this.setting}
          options={{
            tabBarLabel: '云村'
          }}
        />
        <Tab.Screen
          name="Home3"
          component={this.setting}
          options={{
            tabBarLabel: '视频'
          }}
        />
        <Tab.Screen
          name="Home4"
          component={this.setting}
          options={{
            tabBarLabel: '歌手'
          }}
        />
        <Tab.Screen
          name="Home5"
          component={this.setting}
          options={{
            tabBarLabel: '专辑'
          }}
        />
        <Tab.Screen
          name="Home6"
          component={this.setting}
          options={{
            tabBarLabel: '歌单'
          }}
        />
        <Tab.Screen
          name="Home7"
          component={this.setting}
          options={{
            tabBarLabel: '主播电台'
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default SearchResult;
