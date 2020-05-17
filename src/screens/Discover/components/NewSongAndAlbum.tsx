import React, {Component} from "react";
import {View, StyleSheet, Text, TouchableWithoutFeedback, Dimensions, ScrollView, FlatList, Image} from 'react-native';
import CustomButton from "../../../components/CustomButton";
import {Padding, MarginTop, FontSize, ThemeColor} from "../../../constants/theme";
import {AntDesign} from "@expo/vector-icons";
import API from "../../../services";

enum Type{
  song= 'song',
  album= 'album'
}

interface NewSongAndAlbumStates {
  songs: Object[],
  album: Object[],
  type: Type
}

class NewSongAndAlbum extends Component<{}, NewSongAndAlbumStates>{
  state = {
    songs: [],
    album: [],
    type: Type.song
  };

  async setData() {
    const mewSongs: any = await API.requestNewSong();
    const albums: any = await API.requestNewAlbum(0, 6);
    this.setState({
      songs: mewSongs.result.splice(0, 6),
      album: albums.albums
    });
  }

  async componentDidMount(): Promise<void> {
    await this.setData();
  }

  press = (type: Type) => {
    this.setState({
      type: type
    });
  }

  public async refresh() {
    await this.setData();
  }

  render() {
    const {songs, album, type} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <View style={styles.tabs}>
            <TouchableWithoutFeedback onPress={() => this.press(Type.song)}>
              <Text style={[styles.text, type === Type.song && styles.active]}>新歌</Text>
            </TouchableWithoutFeedback>
            <View style={styles.split}/>
            <TouchableWithoutFeedback onPress={() => this.press(Type.album)}>
              <Text style={[styles.text, type === Type.album && styles.active]}>新碟</Text>
            </TouchableWithoutFeedback>
          </View>
          <CustomButton label="更多新歌" />
        </View>
        <View style={styles.content}>
          <ScrollView
            style={type === Type.album && styles.hide}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.slider}>
              <FlatList
                data={songs}
                keyExtractor={(item: any) => item.id + ''}
                renderItem={({item, index}) => {
                  const {picUrl, name, song: {artists, album: {alias}}} = item
                  if (index < 3) {
                    return (
                      <View style={styles.song}>
                        <Image source={{uri: picUrl}} style={styles.image} resizeMode="cover" />
                        <View style={styles.info}>
                          <View style={styles.first}>
                            <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>{name}</Text>
                            <Text style={styles.line}>-</Text>
                            <Text style={styles.artists} ellipsizeMode="tail" numberOfLines={1}>
                              {artists.map((artist: any) => artist.name).join('/')}
                            </Text>
                          </View>
                          <View style={styles.second}>
                            <Text style={styles.alias}>{alias}</Text>
                          </View>
                        </View>
                        <View style={styles.play}>
                          <AntDesign name="caretright" size={13} color={ThemeColor} />
                        </View>
                      </View>
                    );
                  }
                  return null
                }}
              />
            </View>
            <View style={[styles.slider, {marginRight: Padding * 2}]}>
              <FlatList
                data={songs}
                keyExtractor={(item: any) => item.id + ''}
                renderItem={({item, index}) => {
                  const {picUrl, name, song: {artists, album: {alias}}} = item
                  if (index > 2) {
                    return (
                      <View style={styles.song}>
                        <Image source={{uri: picUrl}} style={styles.image} resizeMode="cover" />
                        <View style={styles.info}>
                          <View style={styles.first}>
                            <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>{name}</Text>
                            <Text style={styles.line}>-</Text>
                            <Text style={styles.artists} ellipsizeMode="tail" numberOfLines={1}>
                              {artists.map((artist: any) => artist.name).join('/')}
                            </Text>
                          </View>
                          <View style={styles.second}>
                            <Text style={styles.alias}>{alias}</Text>
                          </View>
                        </View>
                        <View style={styles.play}>
                          <AntDesign name="caretright" size={13} color={ThemeColor} />
                        </View>
                      </View>
                    );
                  }
                  return null
                }}
              />
            </View>
          </ScrollView>
          <ScrollView
            style={type === Type.song && styles.hide}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.slider}>
              <FlatList
                data={album}
                keyExtractor={(item: any) => item.id + ''}
                renderItem={({item, index}) => {
                  const {picUrl, name, artists, company} = item;
                  if (index < 3) {
                    return (
                      <View style={styles.song}>
                        <Image source={{uri: picUrl}} style={styles.image} resizeMode="cover" />
                        <View style={styles.info}>
                          <View style={styles.first}>
                            <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>{name}</Text>
                            <Text style={styles.line}>-</Text>
                            <Text style={styles.artists} ellipsizeMode="tail" numberOfLines={1}>
                              {artists.map((artist: any) => artist.name).join('/')}
                            </Text>
                          </View>
                          <View style={styles.second}>
                            <Text style={styles.alias}>{company}</Text>
                          </View>
                        </View>
                      </View>
                    );
                  }
                  return null;
                }}
              />
            </View>
            <View style={[styles.slider, {marginRight: Padding * 2}]}>
              <FlatList
                data={album}
                keyExtractor={(item: any) => item.id + ''}
                renderItem={({item, index}) => {
                  const {picUrl, name, artists, company} = item;
                  if (index > 2) {
                    return (
                      <View style={[styles.song, {justifyContent: 'flex-start'}]}>
                        <Image source={{uri: picUrl}} style={styles.image} resizeMode="cover" />
                        <View style={styles.info}>
                          <View style={styles.first}>
                            <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>{name}</Text>
                            <Text style={styles.line}>-</Text>
                            <Text style={styles.artists} ellipsizeMode="tail" numberOfLines={1}>
                              {artists.map((artist: any) => artist.name).join('/')}
                            </Text>
                          </View>
                          <View style={styles.second}>
                            <Text style={styles.alias}>{company}</Text>
                          </View>
                        </View>
                      </View>
                    );
                  }
                  return null;
                }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: MarginTop
  },
  title: {
    paddingHorizontal: Padding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: '#aeaeae',
    fontSize: FontSize,
  },
  split: {
    height: 14,
    marginHorizontal: 8,
    width: 1,
    backgroundColor: '#c9cacb'
  },
  content: {
    marginTop: 10,
  },
  slider: {
    width: Dimensions.get('window').width - Padding * 3,
    marginLeft: Padding,
    paddingRight: 10
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5
  },
  song: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  info: {
    overflow: 'hidden',
    flex: 1,
    marginLeft: 10,
    marginRight: 20
  },
  play: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#c9cacb',
    alignItems: 'center',
    justifyContent: 'center'
  },
  first: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  name: {
    fontSize: 15
  },
  line: {
    marginHorizontal: 3,
    color: '#a1a2a3'
  },
  artists: {
    fontSize: 12,
    color: '#a1a2a3'
  },
  second: {
    marginTop: 4,
  },
  alias: {
    fontSize: 12,
    color: '#a1a2a3'
  },
  hide: {
    display: 'none'
  },
  active: {
    color: '#000000'
  }
});

export default NewSongAndAlbum;
