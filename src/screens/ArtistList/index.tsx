import React, {Component} from "react";
import {Text, View, StyleSheet, TouchableHighlight, FlatList, Image} from "react-native";
import Icon from "../../assets/fonts/Iconfont";
import IconType from "../../assets/fonts/icon";
import API from "../../services";
import {ThemeColor} from "../../constants/theme";
import Loading from "../../components/loading";

interface ArtistListState {
  types: object[],
  areas: object[],
  limit: number,
  offset: number,
  type: number,
  area: number
}

class ArtistList extends Component<ArtistListState>{
  state = {
    types: [
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
    areas: [
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
    limit: 20,
    offset: 0,
    type: -1,
    area: -1
  };

  headerComponent = (
    <View style={styles.header}>
      <Text style={{fontSize: 12}}>热门歌手</Text>
    </View>
  );

  private loading = <></>;

  async componentDidMount() {
    await this.setArtistList();
  }

  setArtistList = async () => {
    const {limit, offset, type, area, artistList} = this.state;
    const result: any = await API.requestArtist(limit, offset, type, area);
    this.setState({
      artistList: [...artistList, ...result.artists]
    });
  };

  updateData = () => {
    this.loading =  <Loading />;
    const {offset, limit} = this.state;
    this.setState({
      offset: offset + limit
    }, async () => {
      await this.setArtistList();
      this.loading =  <></>;
    });
  };

  renderCondition = () => {
    const {types, areas} = this.state;

    return (
      <View style={styles.condition}>
        <View style={styles.row}>
          {
            types.map((type, index) => {
              const {name, value} = type;

              return (
                <TouchableHighlight key={index} underlayColor="#DDDDDD" onPress={this.setArtistList}>
                  <Text style={styles.conditionItem}>{name}</Text>
                </TouchableHighlight>
              );
            })
          }
        </View>
        <View style={styles.row}>
          {
            areas.map((area, index) => {
              const {name, value} = area;

              return (
                <TouchableHighlight key={index} underlayColor="#DDDDDD" onPress={this.setArtistList}>
                  <Text style={styles.conditionItem}>{name}</Text>
                </TouchableHighlight>
              );
            })
          }
        </View>
      </View>
    );
  };

  renderArtist({item}: any) {
    const {img1v1Url, name, followed, accountId} = item;
    return (
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
  }

  render() {
    const {artistList} = this.state;
    return (
      <View style={styles.container}>
        {this.renderCondition()}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={artistList}
          keyExtractor={(item: any) => item.id + ''}
          renderItem={this.renderArtist}
          ListHeaderComponent={this.headerComponent}
          ListFooterComponent={this.loading}
          onEndReached={this.updateData}
          onEndReachedThreshold={0.1}
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
    marginVertical: 8
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
  }
});

export default ArtistList;
