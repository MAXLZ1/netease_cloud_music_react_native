import React, {Component} from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  Image,
  TouchableNativeFeedback,
  Platform, GestureResponderEvent
} from "react-native";
import Icon from "../../assets/fonts/Iconfont";
import IconType from "../../assets/fonts/icon";
import API from "../../services";
import {ThemeColor} from "../../constants/theme";
import Loading from "../../components/Loading";

interface ArtistListState {
  types: object[],
  areas: object[],
  limit: number,
  offset: number,
  type: number,
  area: number,
  hideCondition: boolean
}

class ArtistList extends Component<ArtistListState>{
  constructor(props: Readonly<ArtistListState>) {
    super(props);
  }

  state = {
    areas: [
      {
        name: '华语',
        value: 7
      },
      {
        name: '欧美',
        value: 96
      },
      {
        name: '日本',
        value: 8
      },
      {
        name: '韩国',
        value: 16
      },
      {
        name: '其他',
        value: 0
      },
    ],
    types: [
      {
        name: '男',
        value: 1
      },
      {
        name: '女',
        value: 2
      },
      {
        name: '乐队/组合',
        value: 3
      },
    ],
    artistList: [],
    limit: 12,
    offset: 0,
    type: -1,
    area: -1,
    hideCondition: false
  };

  headerComponent = (
    <View style={styles.header}>
      <Text style={{fontSize: 12}}>热门歌手</Text>
    </View>
  );

  private loading = <></>;

  async requestArtist(){
    const {limit, offset, type, area} = this.state;
    const result: any = await API.requestArtist(limit, offset, type, area);
    return result.artists;
  }

  async componentDidMount() {
    await this.resetArtistList();
  }

  async resetArtistList() {
    const artistList= await this.requestArtist();
    this.setState({
      artistList
    });
  }

  changeArea = async (value: number) => {
    let {type} = this.state;
    if (type === -1) {
      type = 1;
    }
    this.setState({
      area: value,
      type,
      artistList: []
    }, async () => await this.resetArtistList());
  };

  changeType= async (value: number) => {
    let {area} = this.state;
    if (area === -1) {
      area = 7;
    }
    this.setState({
      area,
      type: value,
      artistList: []
    }, async () => await this.resetArtistList());
  };

  updateData = () => {
    this.loading =  (
      <View style={{marginBottom: 10}}>
        <Loading />
      </View>
    );
    const {offset, limit, artistList} = this.state;
    this.setState({
      offset: offset + limit
    }, async () => {
      const result = await this.requestArtist();
      this.setState({
        artistList: [...artistList, ...result]
      });
      this.loading =  <></>;
    });
  };

  onScroll = () => {
    this.setState({
      hideCondition: true
    })
  };

  renderCondition = () => {
    const {types, areas, type, area} = this.state;

    return (
      <View style={styles.condition}>
        <View style={styles.row}>
          {
            areas.map((item, index) => {
              const {name, value} = item;

              return (
                <TouchableHighlight key={index} underlayColor="#DDDDDD" onPress={() => this.changeArea(value)}>
                  <Text style={[styles.conditionItem, value === area && {color: ThemeColor}]}>{name}</Text>
                </TouchableHighlight>
              );
            })
          }
        </View>
        <View style={styles.row}>
          {
            types.map((item, index) => {
              const {name, value} = item;

              return (
                <TouchableHighlight key={index} underlayColor="#DDDDDD" onPress={() => this.changeType(value)}>
                  <Text style={[styles.conditionItem, value === type && {color: ThemeColor}]}>{name}</Text>
                </TouchableHighlight>
              );
            })
          }
        </View>
      </View>
    );
  };

  renderTitle() {
    const {areas, types, area, type} = this.state;
    const areaObj = areas.filter(({value}) => value === area);
    const typeObj = types.filter(({value}) => value === type);
    let text = '全部歌手'
    if (areaObj.length > 0 && typeObj.length > 0) {
      text = `${areaObj[0].name}·${typeObj[0].name}`
    }

    const title = (
      <View style={styles.title}>
        <Text>{text}</Text>
        <View style={styles.filter}>
          <Icon name={IconType.shaixuan} size={16} color="#000000" />
          <Text style={{fontSize: 12, marginLeft: 6}}>筛选</Text>
        </View>
      </View>
    );

    const hideTitle = () => {this.setState({hideCondition: false})}
    if (Platform.OS === 'ios') {
      return (
        <TouchableHighlight underlayColor="#DFDFDF" onPress={hideTitle}>
          {title}
        </TouchableHighlight>
      );
    } else if(Platform.OS === 'android'){
      return (
        <TouchableNativeFeedback onPress={hideTitle}>
          {title}
        </TouchableNativeFeedback>
      );
    }
  }

  renderArtist({item}: any) {
    const {img1v1Url, name, followed, accountId} = item;
    const node = (
      <View style={styles.artist}>
        <View style={styles.info}>
          <Image source={{uri: `${img1v1Url}?param=100y100`}} style={styles.image} resizeMode="contain"/>
          <Text style={styles.name}>{name}</Text>
          {accountId && <Icon name={IconType.geren5} size={17} color={ThemeColor} style={{marginLeft: 5}}/>}
        </View>
        {
          followed ?
            <View style={[styles.noFollowed, styles.followed]}>
              <Icon name={IconType.duihao} size={12} color={ThemeColor} />
              <Text style={{color: ThemeColor, fontSize: 11, marginLeft: 2}}>关注</Text>
            </View>
            :
            <TouchableHighlight>
              <View style={styles.noFollowed}>
                <Icon name={IconType.jia} size={12} color={ThemeColor} />
                <Text style={{color: ThemeColor, fontSize: 11, marginLeft: 2}}>关注</Text>
              </View>
            </TouchableHighlight>
        }
      </View>
    );
    if (Platform.OS === 'ios') {
      return (
        <TouchableHighlight>
          {node}
        </TouchableHighlight>
      );
    } else if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback onPress={() => {}}>
          {node}
        </TouchableNativeFeedback>
      );
    }
    return null;
  }

  render() {
    const {artistList, hideCondition} = this.state;
    return (
      <View style={styles.container}>
        {hideCondition ? this.renderTitle() : this.renderCondition()}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={artistList}
          keyExtractor={(item: any) => item.id + ''}
          renderItem={this.renderArtist}
          ListHeaderComponent={this.headerComponent}
          ListFooterComponent={this.loading}
          ListEmptyComponent={
            <View style={{marginTop: 30}}>
              <Loading />
            </View>
          }
          onEndReached={this.updateData}
          onEndReachedThreshold={0.1}
          onScroll={this.onScroll}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
     flex: 1
  },
  condition: {
    marginTop: 12
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6
  },
  conditionItem: {
    fontSize: 13,
    width: 60,
    height: 20,
    lineHeight: 20,
    textAlign: 'center',
    color: '#6e6e6e'
  },
  header: {
    height: 24,
    justifyContent: 'center',
    backgroundColor: '#d4d4d4',
    paddingHorizontal: 10,
  },
  artist: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: 10,
    fontSize: 16
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 30
  },
  noFollowed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeColor,
    borderRadius: 20,
    width: 54,
    height: 20
  },
  followed: {
    borderColor: '#a4a4a4',
  },
  title: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default ArtistList;
