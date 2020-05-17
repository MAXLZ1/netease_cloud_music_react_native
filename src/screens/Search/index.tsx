import React, {Component} from "react";
import {FlatList, ScrollView, Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import Icon from "../../assets/fonts/Iconfont";
import IconType from "../../assets/fonts/icon";
import {Padding, ThemeColor} from "../../constants/theme";
import Storage from "../../util/storage";
import API from "../../services";
import Dialog from "../../components/Dialog";

interface SearchState {
  hotSearch: Object[],
  history: Object[],
  dialogShow: boolean
}

class Search extends Component<{}, SearchState> {
  state = {
    history: [],
    hotSearch: [],
    dialogShow: false
  };

  async componentDidMount() {
    const historyStr = await Storage.getItem('search_history');
    const result: any = await API.requestHotSearchDetail();
    this.setState({
      history: historyStr ? JSON.parse(historyStr) : [],
      hotSearch: result.data
    });
  }

  renderHistory = ({item, index}: any) => {
    return (
      <View style={[styles.historyItem, index === 0 && {marginLeft: 0}]}>
        <Text style={{fontSize: 13}}>{item}</Text>
      </View>
    );
  };

  renderHotSearch = () => {
    return this.state.hotSearch.map((item, index) => {
      const {searchWord, score, content, iconUrl, iconType} = item;

      return (
        <View style={styles.searchItem} key={index}>
          <View style={styles.searchContent}>
            <Text style={[{width: 24, color: '#acacac', fontSize: 17, textAlign: 'center'}, index < 3 && {color: '#EC4D45'}]}>{index + 1}</Text>
            <View  style={styles.content}>
              <View style={styles.searchTitle}>
                <Text style={{fontSize: 16}}>{searchWord}</Text>
                {iconUrl && <Image source={{uri: iconUrl}} style={[styles.icon, iconType === 5 && {width: 12}]} resizeMode="contain"/>}
              </View>
              <Text style={{color: '#acacac', fontSize: 12}}>{content}</Text>
            </View>
          </View>
          <Text style={{color: '#acacac', fontSize: 12}}>{score}</Text>
        </View>
      );
    })
  };

  keyExtractor = (item: object, index: number) => index + ''

  alert = () => {
    this.setState({
      dialogShow: true
    })
  };

  // 清除历史记录
  clearHistory = async () => {
    await Storage.removeItem('search_history');
    this.setState({
      dialogShow: false,
      history: []
    })
  };

  // 对话框底部渲染
  dialogFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => this.setState({dialogShow: false})}>
          <Text style={styles.btn}>取消</Text>
        </TouchableOpacity>
        <TouchableOpacity  activeOpacity={0.5} onPress={this.clearHistory}>
          <Text style={styles.btn}>确定</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {history, hotSearch, dialogShow} = this.state;

    return (
      <View style={{backgroundColor: '#ffffff', flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          { history.length !== 0 &&
            <View style={styles.history}>
              <View style={styles.title}>
                <Text style={styles.titleText}>历史记录</Text>
                <TouchableOpacity onPress={this.alert} activeOpacity={0.5}>
                  <Icon
                    name={IconType.shanchu}
                    size={17}
                    color="#A1A1A1"
                  />
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal={true}
                data={history}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderHistory}
              />
            </View>
          }
          <View style={styles.hotSearch}>
            <View style={styles.title}>
              <Text style={styles.titleText}>热搜榜</Text>
            </View>
            {this.renderHotSearch()}
          </View>
        </ScrollView>
        <Dialog
          visible={dialogShow}
          footer={this.dialogFooter}
        >
          <Text style={{fontSize: 14, color: '#999999'}}>确定清除全部历史记录？</Text>
        </Dialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  history:{
    paddingHorizontal: Padding,
    marginTop: 10,
    marginBottom: 15
  },
  historyItem: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#eeeeee',
    marginLeft: 10
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000000'
  },
  hotSearch: {
    paddingHorizontal: Padding,
    marginTop: 10
  },
  searchItem: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  searchContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginLeft: 16,
    marginRight: 20
  },
  searchTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 26,
    height: 18,
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  btn: {
    fontSize: 14,
    marginLeft: 20,
    color: ThemeColor
  }
});

export default Search;
