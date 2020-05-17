import React, {Component} from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Padding, ThemeColor} from "../../../constants/theme";
import Icon from "../../../assets/fonts/Iconfont";
import {LinearGradient} from "expo-linear-gradient";
import IconType from "../../../assets/fonts/icon";

class Menus extends Component {
  state = {
    day: new Date().getDate(),
    menus: [
      {
        icon: IconType.riqi,
        label: '每日推荐'
      },
      {
        icon: IconType.gedan,
        label: '歌单'
      },
      {
        icon: IconType.paihang,
        label: '排行榜'
      },
      {
        icon: IconType.yule_yinlediantai,
        label: '电台'
      },
      {
        icon: IconType.zhibo,
        label: '直播'
      },
    ]
  };

  render() {
    const {menus, day} = this.state;

    return (
      <View style={styles.container}>
        {
          menus.map(({icon, label}, index) => {
            return (
              <TouchableOpacity activeOpacity={0.7} key={index}>
                <View style={styles.item}>
                  <LinearGradient
                    colors={['#EB6655', '#E93C2A']}
                    start={[0, 0.5]}
                    end={[1, 0.5]}
                    style={styles.linearGradient}
                  >
                    <View style={styles.circle}>
                      <Icon name={icon} color="#ffffff" size={25} />
                      {
                        index === 0 && <Text style={styles.day}>{day}</Text>
                      }
                    </View>
                  </LinearGradient>
                  <Text style={styles.label}>{label}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    paddingHorizontal: Padding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  linearGradient: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  circle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 12,
    marginTop: 10,
  },
  day: {
    position: 'absolute',
    color: ThemeColor,
    fontWeight: 'bold',
    fontSize: 12,
    transform: [
      {
        translateY: 3
      }
    ]
  }
});

export default Menus;
