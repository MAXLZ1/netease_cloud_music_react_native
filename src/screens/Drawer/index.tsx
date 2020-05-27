import React, {Component} from "react";
import {Text, View, StyleSheet, Dimensions, ScrollView, Image} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {connect} from "react-redux";
import {RootState} from "../../redux/reducers";
import {Profile} from "../../redux/actions/userInfo-action-types";
import {ThemeColor} from "../../constants/theme";
import IconType from "../../assets/fonts/icon";
import Icon from "../../assets/fonts/Iconfont";

interface DrawerProps {
  profile: Profile
}

interface Menu{
  icon: IconType,
  title: string
}

interface DrawerState {
  navMenus: Menu[],
  menus: Array<Array<Menu>>
}

class Drawer extends Component<DrawerProps, DrawerState>{
  state = {
    navMenus: [
      {
        icon: IconType.xiaoxi,
        title: '我的消息'
      },
      {
        icon: IconType.n31haoyou,
        title: '我的好友'
      },
      {
        icon: IconType.zhuye,
        title: '个人主页'
      },
      {
        icon: IconType.pifugexinghuazhuti_xianxing,
        title: '个性装扮'
      },
    ],
    menus: [
      [
        {
          icon: IconType.chuangzuohe,
          title: '创作者中心'
        }
      ],
      [
        {
          icon: IconType.tinggeshiqu,
          title: '听歌识曲'
        },
        {
          icon: IconType.yanchu,
          title: '演出'
        },
        {
          icon: IconType.gouwuche,
          title: '商城'
        },
        {
          icon: IconType.location,
          title: '附近的人'
        },
        {
          icon: IconType.youxituijian,
          title: '游戏推荐'
        },
        {
          icon: IconType.danchuang_sheweishoujicailing_,
          title: '口袋彩铃'
        }
      ],
      [
        {
          icon: IconType.dingdan_,
          title: '我的订单'
        },
        {
          icon: IconType.dingshi,
          title: '定时停止播放'
        },
        {
          icon: IconType.richscan_icon,
          title: '扫一扫'
        },
        {
          icon: IconType.dingshi1,
          title: '音乐闹钟'
        },
        {
          icon: IconType.yun,
          title: '音乐云盘'
        },
        {
          icon: IconType.zaixiantinggemianliuliang,
          title: '在线听歌免流量'
        },
        {
          icon: IconType.youhuiquan,
          title: '优惠券'
        },
        {
          icon: IconType.gongjifangyu,
          title: '青少年模式'
        },
      ]
    ],
    footerMenu: [
      {
        icon: IconType.yueduye_yejianmoshi,
        title: '夜间模式'
      },
      {
        icon: IconType.shezhi,
        title: '设置'
      },
      {
        icon: IconType.shouye,
        title: '退出'
      },
    ]
  };

  splitLine() {
    return (
      <View style={{
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#dddddd',
        marginVertical: 10
      }}/>
    );
  }

  renderNavMenu() {
    const {navMenus} = this.state;
    return navMenus.map((item: Menu, index: number) => {
      return (
        <View key={index} style={styles.navMenuItem}>
          <Icon name={item.icon} size={25} color={ThemeColor} />
          <Text style={{fontSize: 12, marginTop: 5}}>{item.title}</Text>
        </View>
      );
    });
  }

  renderMenus() {
    const {menus} = this.state;
    return menus.map((menu: Menu[], index) => {
      return (
        <View key={index}>
          {menu.map((item: Menu, index: number) => {
            return (
              <View style={styles.menu} key={index}>
                <Icon name={item.icon} size={22} color="#000000"/>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            );
          })}
          {index !== menus.length - 1 && this.splitLine()}
        </View>
      );
    })
  }

  renderFooterMenu() {
    const {footerMenu} = this.state;
    return footerMenu.map((item: Menu, index: number) => {
      return (
        <View key={index} style={styles.footerMenu}>
          <Icon name={item.icon} size={20} color="#000000" />
          <Text style={{marginLeft: 8}}>{item.title}</Text>
        </View>
      );
    });
  }

  render() {
    const {profile} = this.props;
    return (
      <View style={styles.container}>
          <LinearGradient
            colors={['#868686', '#585858']}
            style={styles.linear}
            start={[0, 0]}
            end={[1, 0]}
          >
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <View style={[styles.card]}>
                <View style={styles.cardTop}>
                  <View>
                    <Text style={styles.cardTitle}>开通黑胶VIP</Text>
                    <Text style={styles.subTitle}>加入黑胶VIP，立享超17项专属特权</Text>
                  </View>
                  <LinearGradient
                    colors={['#F9E5E0', '#D0BBB3']}
                    style={styles.cardBtn}
                    start={[0, 0]}
                    end={[1, 0]}
                  >
                    <Text style={styles.cardBtnText}>会员中心</Text>
                  </LinearGradient>
                </View>
                <View style={styles.cardBottom}>
                  <Text style={{fontSize: 13, color: '#F9E5E0'}}>新用户首月仅5元</Text>
                  <Text style={styles.subTitle}>尊享HiFi音效，体验最high音乐氛围</Text>
                </View>
              </View>
              <View style={styles.setting}>
                {profile &&
                  <View style={styles.info}>
                    <View style={styles.infoLeft}>
                      <Image source={{uri: profile.avatarUrl}} style={styles.avatar}/>
                      <Text style={{fontSize: 13, fontWeight: 'bold'}}>{profile.nickname}</Text>
                    </View>
                    <View style={styles.btn}>
                      <Text style={styles.signIn}>签到</Text>
                    </View>
                  </View>
                }
                <View style={styles.navMenu}>
                  {this.renderNavMenu()}
                </View>
                {this.splitLine()}
                {this.renderMenus()}
              </View>
            </ScrollView>

          </LinearGradient>
        <View style={styles.footer}>
          {this.renderFooterMenu()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linear: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  card: {
    marginTop: 30,
    marginHorizontal: 25,
    width: Dimensions.get('window').width - 50 - 70,
    height: 140,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12
  },
  cardTop: {
    height: 70,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#EEDFDB'
  },
  subTitle: {
    color: '#ffffff',
    fontSize: 11,
    marginTop: 3
  },
  cardBtn: {
    height: 22,
    paddingHorizontal: 8,
    borderRadius: 11,
    justifyContent: 'center'
  },
  cardBtnText: {
    fontSize: 11
  },
  cardBottom: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  setting: {
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#ffffff',
    marginTop: -10,
    padding: 15,
    paddingBottom: 50
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderTopColor: '#eaeaea',
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
    marginRight: 15
  },
  btn: {
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: ThemeColor,
  },
  signIn: {
    fontSize: 11,
    color: '#ffffff',
  },
  navMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10
  },
  navMenuItem: {
    alignItems: 'center',
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40
  },
  title: {
    marginLeft: 10
  },
  footerMenu: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

const mapStateToProps = (state: RootState) => ({
  profile: state.userInfo.profile
});

export default connect(mapStateToProps)(Drawer);
