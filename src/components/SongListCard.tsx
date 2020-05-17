import React, {Component} from "react";
import {View, ImageBackground, StyleSheet, Text} from 'react-native';
import Icon from "../assets/fonts/Iconfont";

interface Style{
  width: number,
  marginLeft: number,
  readonly marginRight:number
}

interface SongListCardProps {
  playNum: number,
  img: string,
  title: string,
  style: Style
}

class SongListCard extends Component<SongListCardProps>{
  static defaultProps = {
    playNum: 0
  };

  computePlayNum() {
    const {playNum} = this.props
    if (playNum >= Math.pow(10, 8)) {
      return (playNum / Math.pow(10, 8)).toFixed(1) + '亿'
    } else if (playNum >= Math.pow(10, 4)) {
      return (playNum / Math.pow(10, 4)).toFixed(1) + '万'
    }
    return playNum
  }

  render() {
    const {img, title, style} = this.props;
    return (
      <View style={[style]}>
        <ImageBackground
          style={{width: style.width, height: style.width}}
          source={{uri: img}}
          imageStyle={{ borderRadius: 5}}
        >
          <View style={styles.playNum}>
            <Icon name="play_arrow" size={10} color="#ffffff" />
            <Text style={styles.number}>{this.computePlayNum()}</Text>
          </View>
        </ImageBackground>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgImg: {
    width: '100%',
    height: '100%'
  },
  playNum: {
    position: 'absolute',
    right: 5,
    top: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  number: {
    fontSize: 11,
    color: '#ffffff',
    marginLeft: 3
  },
  title: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 3
  }
});

export default SongListCard;
