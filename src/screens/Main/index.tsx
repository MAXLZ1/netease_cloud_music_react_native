import React, {Component} from "react";
import {Text, TouchableHighlight, View, StyleSheet, Dimensions} from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";
import Me from "../Me/index";
import Discover from "../Discover/index";
import CloudVillage from "../CloudVillage/index";
import Video from "../Video/index";
import Drawer from "../Drawer/index";
import Iconfont from "../../assets/fonts/Iconfont";
import Search from "../Search";
import {StackNavigationHelpers} from "@react-navigation/stack/lib/typescript/src/types";

const Tab = createMaterialTopTabNavigator();
const DRAW_WIDTH = Dimensions.get('window').width - 70;

interface MainProps {
  navigation: StackNavigationHelpers
}

class Main extends Component<MainProps>{
  private drawer: any;

  constructor(props: Readonly<MainProps>) {
    super(props);
    this.drawer = React.createRef();
  }

  renderDrawer() {
    return (
      <Drawer />
    );
  }

  openDrawer = () => {
    this.drawer.current.openDrawer();
  };

  toSearchScreen = () => {
    this.props.navigation.navigate('Search')
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        <DrawerLayout
          drawerWidth={DRAW_WIDTH}
          drawerType='front'
          drawerBackgroundColor="#ddd"
          renderNavigationView={this.renderDrawer}
          ref={this.drawer}
        >
          <Tab.Navigator
            initialRouteName="Discover"
            tabBar={
              ({ state, descriptors, navigation }) => {
                return (
                  <View style={styles.container}>
                    <TouchableHighlight
                      underlayColor="#ffffff"
                      style={styles.iconStyle}
                      onPress={this.openDrawer}
                    >
                      <Iconfont name="gengduo" size={18} color='#000000' />
                    </TouchableHighlight>
                    <View style={styles.tabContainer}>
                      {
                        state.routes.map((route, index) => {
                          const { options } = descriptors[route.key];
                          // 获取tab标题
                          const label =
                            options.tabBarLabel !== undefined
                              ? options.tabBarLabel
                              : options.title !== undefined
                              ? options.title
                              : route.name;
                          const isFocused = state.index === index;

                          const onPress = () => {
                            const event = navigation.emit({
                              type: 'tabPress',
                              target: route.key,
                              canPreventDefault: true,
                            });
                            if (!isFocused && !event.defaultPrevented) {
                              navigation.navigate(route.name);
                            }
                          };

                          return (
                            <TouchableHighlight
                              onPress={onPress}
                              underlayColor="#ffffff"
                              activeOpacity={1}
                              style={[styles.tabItem]}
                              key={index}
                            >
                              <Text style={[styles.tabItemText, isFocused ? styles.active : {}]}>{label}</Text>
                            </TouchableHighlight>
                          );
                        })
                      }
                    </View>
                    <TouchableHighlight
                      style={styles.iconStyle}
                      underlayColor="#ffffff"
                      onPress={this.toSearchScreen}
                    >
                      <Iconfont name="sousuo" size={18} color='#000000' />
                    </TouchableHighlight>
                  </View>
                );
              }
            }
          >
            <Tab.Screen
              name="Me"
              component={Me}
              options={{tabBarLabel: '我的'}}
            ></Tab.Screen>
            <Tab.Screen
              name="Discover"
              component={Discover}
              options={{tabBarLabel: '发现'}}
            ></Tab.Screen>
            <Tab.Screen
              name="CloudVillage"
              component={CloudVillage}
              options={{tabBarLabel: '云村'}}
            ></Tab.Screen>
            <Tab.Screen
              name="Video"
              component={Video}
              options={{tabBarLabel: '视频'}}
            ></Tab.Screen>
          </Tab.Navigator>
        </DrawerLayout>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5
  },
  tabContainer: {
    width: 240,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  tabItem: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: 5
  },
  tabItemText: {
    fontSize: 15,
    color: '#7c7c7c',
  },
  active: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000'
  },
  iconStyle: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Main;
