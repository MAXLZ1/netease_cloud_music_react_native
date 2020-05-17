import React, {Component} from "react";
import Swiper from 'react-native-swiper';
import {View, StyleSheet, Dimensions, ImageBackground, Text} from "react-native";
import API from "../../../services";
import {ThemeColor, Padding} from "../../../constants/theme";

const {width} = Dimensions.get('window');

class Banner extends Component {
  state = {
    banners: [],
    showSwiper: false
  };

  async componentDidMount() {

    const res: any = await API.requestSwiper();
    this.setState({
      banners: res.banners,
      showSwiper: true
    });
  }

  render() {
    const {banners, showSwiper} = this.state;
    if (showSwiper) {
      return (
        <Swiper
          style={styles.wrapper}
          loop={true}
          autoplay={true}
          autoplayTimeout={4}
          paginationStyle={styles.pagination}
          dot={
            <View style={styles.dot} />
          }
          activeDot={
            <View style={[styles.dot, styles.activeDot]} />
          }
        >
          {
            banners.map((banner) => {
              const {bannerId, pic, typeTitle, titleColor} = banner;
              return (
                <View
                  key={bannerId}
                  style={styles.slider}
                >
                  <ImageBackground
                    source={{uri: `${pic}`}}
                    style={styles.img}
                    resizeMode="stretch"
                  >
                    <View style={[styles.tagView, {backgroundColor: titleColor}]}>
                      <Text style={styles.tag}>
                        {typeTitle}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              );
            })
          }
        </Swiper>
      );
    } else {
      return (
        <View />
      );

    }
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 130,
    marginVertical: 10,
  },
  pagination: {
    bottom: 15,
  },
  dot: {
    backgroundColor:'rgba(255, 255, 255,.4)',
    width: 6,
    height: 6,
    borderRadius: 4,
    margin: 3
  },
  activeDot: {
    backgroundColor: ThemeColor
  },
  slider: {
    height: 130,
    width: width - Padding * 2,
    marginHorizontal: Padding,
    borderRadius: 6,
    overflow: 'hidden'
  },
  img: {
    width: '100%',
    height: '100%',
  },
  tagView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 6,
  },
  tag: {
    color: '#ffffff',
    paddingVertical: 2,
    paddingHorizontal: 3,
    fontSize: 11
  }
});

export default Banner;
