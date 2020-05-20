import React, {Component} from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  FlatList
} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import Drawer from "../screens/Drawer/index";
import Search from "../screens/Search";
import Main from "../screens/Main";
import ArtistList from "../screens/ArtistList";
import CustomWebView from "../screens/CustomWebView";
import {Padding, ThemeColor} from "../constants/theme";
import Icon from "../assets/fonts/Iconfont";
import IconType from "../assets/fonts/icon";
import API from "../services";
import Storage from "../util/storage";

const Stack = createStackNavigator();

interface NavigationStates{
  value: string,
  searchSuggests: Object[]
}

class Navigation extends Component<{}, NavigationStates>{
  private drawer: any;
  private input: any;

  state = {
    value: '',
    searchSuggests: []
  };

  constructor(props: Readonly<{}>) {
    super(props);
    this.drawer = React.createRef();
    this.input = React.createRef();
  }

  renderDrawer() {
    return (
      <Drawer />
    );
  }

  openDrawer = () => {
    this.drawer.current.openDrawer();
  };

  handleChange = async (text: string) => {
    this.setState({
      value: text,
    });
    if (text) {
      const res: any = await API.requestSearchSuggest(text);

      this.setState({
        searchSuggests: res.result.allMatch || []
      });
    } else {
      this.setState({
        searchSuggests: []
      });
    }

  };

  clearInput = () => {
    this.setState({
      value: '',
      searchSuggests: []
    });
  };

  search = async () => {
    const {value} = this.state;
    if (value !== '') {
      await API.requestSearch(value);
      const searchHistory = await Storage.getItem('search_history');
      const historyArr = searchHistory ? JSON.parse(searchHistory) : [];
      historyArr.unshift(value);
      await Storage.setItem('search_history', JSON.stringify(historyArr));
      this.setState({
        value: ''
      })
    }
  };

  renderSearchInput = () => {
    const {value} = this.state;
    return (
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={this.handleChange}
          selectionColor={ThemeColor}
          returnKeyType="search"
          autoFocus={true}
          onSubmitEditing={this.search}
        />
        {
          value ?
            <TouchableWithoutFeedback onPress={this.clearInput}>
              <Icon name={IconType.guanbi} size={22} color="#000000" style={styles.close} />
            </TouchableWithoutFeedback>
            :
            <Text style={styles.placeholder} numberOfLines={1} ellipsizeMode="tail">
              请输入要搜索的关键字
            </Text>
        }
      </View>
    );
  };

  searchHeader = ({navigation}: any) => {
    const {searchSuggests, value} = this.state;

    return (
      <View style={styles.header}>
        <TouchableHighlight
          style={styles.circle}
          underlayColor="#dddddd"
          onPress={() => navigation.goBack()}
        >
          <Icon name={IconType.arrow_left} size={24} color="#000000"/>
        </TouchableHighlight>
        {this.renderSearchInput()}
        <TouchableHighlight
          style={styles.circle}
          underlayColor="#dddddd"
          onPress={() => navigation.navigate('ArtistList')}
        >
          <Icon name={IconType.iconfontgerenzhongxin16} size={24} color="#000000"/>
        </TouchableHighlight>
        {
          searchSuggests.length > 0 && value !== '' && <View style={styles.result}>
            <TouchableWithoutFeedback onPress={this.search}>
              <View style={[styles.listItem, styles.search]}>
                <Text  numberOfLines={1} ellipsizeMode="tail" style={[styles.text, {color: '#50b2ff'}]}>搜索 '{value}'</Text>
              </View>
            </TouchableWithoutFeedback>
            <FlatList
              data={searchSuggests}
              keyExtractor={(item, index) => index + ''}
              renderItem={({item}: any) => {
                return (
                  <View style={styles.listItem}>
                    <Icon name={IconType.iconfonticonfontsousuo1} size={19} color="#868686" />
                    <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{item.keyword}</Text>
                  </View>
                );
              }}
            />
          </View>
        }
      </View>
    );
  };

  artistListHeader = ({navigation}: any) => {
    return (
      <View style={styles.header}>
        <TouchableHighlight
          style={styles.circle}
          underlayColor="#dddddd"
          onPress={() => navigation.goBack()}
        >
          <Icon name={IconType.arrow_left} size={24} color="#000000"/>
        </TouchableHighlight>
        <Text style={styles.headerTitle}>歌手分类</Text>
      </View>
    );
  };

  webViewHeader = ({navigation}: any) => {
    return (
      <View style={styles.header}>
        <TouchableHighlight
          style={styles.circle}
          underlayColor="#dddddd"
          onPress={() => navigation.goBack()}
        >
          <Icon name={IconType.arrow_left} size={24} color="#000000"/>
        </TouchableHighlight>
        <Text style={styles.headerTitle}>网易云音乐</Text>
      </View>
    );
  };

  render() {
    return (
      <>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              header: this.searchHeader,
            }}
          />
          <Stack.Screen
            name="ArtistList"
            component={ArtistList}
            options={{
              header: this.artistListHeader,
            }}
          />
          <Stack.Screen
            name="CustomWebView"
            component={CustomWebView}
            options={{
              header: this.webViewHeader
            }}
          />
        </Stack.Navigator>
      </>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    height: 50,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10
  },
  inputBox: {
    flex: 1,
    justifyContent: 'center',
    height: 45,
    marginHorizontal: 20,
  },
  input: {
    fontSize: 16,
    height: 40,
    borderBottomColor: '#878787',
    borderBottomWidth: 1,
    paddingRight: 20
  },
  close: {
    position: 'absolute',
    right: 0
  },
  placeholder: {
    position: 'absolute',
    left: 0,
    right: 40,
    zIndex: -1,
    color: '#939393',
    fontSize: 16
  },
  result: {
    position: 'absolute',
    left: Padding,
    top: 50,
    elevation: 10,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'rgba(49,49,49,0.7)',
    shadowOpacity: 0.7,
    shadowRadius: 10,
    width: Dimensions.get('window').width - Padding * 2 - 15 - 40,
    backgroundColor: '#ffffff'
  },
  listItem: {
    paddingHorizontal: 15,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#bfbfbf'
  },
  search: {
    borderTopWidth: 0
  },
  text: {
    marginLeft: 10,
    fontSize: 14,
    color: '#868686'
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 17
  }
});

export default Navigation;
