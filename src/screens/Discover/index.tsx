import React, {Component} from "react";
import {ScrollView, RefreshControl} from 'react-native';
import Banner from "./components/Banner";
import Menus from "./components/Menus";
import RecommendSongList from "./components/RecommendSongList";
import NewSongAndAlbum from "./components/NewSongAndAlbum";
import {ThemeColor} from "../../constants/theme";

class Discover extends Component{
  private newSongAndAlbum: React.RefObject<any>;
  private recommendSongList: React.RefObject<any>;

  constructor(props: Readonly<{}>) {
    super(props);
    this.newSongAndAlbum = React.createRef();
    this.recommendSongList = React.createRef();
  }

  state = {
    refreshing: false
  };

  _onRefresh = async () => {
    this.setState({refreshing: true});
    await this.newSongAndAlbum.current.refresh();
    await this.recommendSongList.current.refresh();
    this.setState({refreshing: false});
  }

  refreshControl() {
    return (
      <RefreshControl
        colors={[ThemeColor]}
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
      />
    );
  }

  render() {
    return (
      <ScrollView
        style={{backgroundColor: '#ffffff'}}
        showsVerticalScrollIndicator={false}
        refreshControl={this.refreshControl()}
      >
        <Banner />
        <Menus />
        <RecommendSongList ref={this.recommendSongList}/>
        <NewSongAndAlbum ref={this.newSongAndAlbum}/>
      </ScrollView>
    );
  }
}

export default Discover;
