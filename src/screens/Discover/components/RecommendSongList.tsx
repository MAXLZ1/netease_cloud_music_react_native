import React, {Component} from "react";
import {View, Text, StyleSheet, FlatList, Dimensions} from "react-native";
import {MarginTop, Padding, FontSize} from "../../../constants/theme";
import API from "../../../services";
import SongListCard from "../../../components/SongListCard";
import CustomButton from "../../../components/CustomButton";
const MARGIN_RIGHT = 10;
const CARD_WIDTH = (Dimensions.get('window').width - Padding * 2 - MARGIN_RIGHT * 3) / 3;

interface RecommendItem {
  picUrl: string,
  playcount: number,
  name: string,
  id: number
}

interface RecommendState {
  recommends: RecommendItem[]
}

class RecommendSongList extends Component<{}, RecommendState> {
  state = {
    recommends: []
  };

  async setData() {
    const res: any = await API.requestRecommendSongList();
    this.setState({
      recommends: res.recommend
    });
  }

  async componentDidMount() {
    await this.setData();
  }

  public async refresh() {
    await this.setData();
  }

  // @ts-ignore
  renderItem = ({item, index}) => {
    const {recommends} = this.state;
    const {picUrl, playcount, name} = item;
    let marginRight = MARGIN_RIGHT;
    let marginLeft = 0;
    index === 0 && (marginLeft = Padding);
    if (index === recommends.length - 1) {
      marginRight = Padding;
    }
    return (
      <SongListCard
        style={{marginRight, marginLeft, width: CARD_WIDTH}}
        img={picUrl}
        title={name}
        playNum={playcount}
      />
    );
  }

  keyExtractor = (item: { id: any; }) => item.id + '';

  render() {
    const {recommends} = this.state;
    if (recommends.length > 0) {
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>为你精挑细选</Text>
            <CustomButton label="查看更多" onPress={() =>{}}/>
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.list}
            data={recommends}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </View>
      );
    } else {
      return (
        <View />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: MarginTop,
  },
  titleContainer: {
    paddingHorizontal: Padding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: FontSize,
  },
  list: {
    marginTop: 10
  }
});

export default RecommendSongList;
