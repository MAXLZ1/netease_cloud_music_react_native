import React, {Component} from "react";
import {View} from "react-native";
import API from "../../../services";

interface RecommendSongState {
  recommends: Object[]
}

class RecommendSong extends Component<{}, RecommendSongState>{
  state = {
    recommends: []
  };

  async componentDidMount() {
    const res: any = await API.requestRecommendSongs();
    this.setState({
      recommends: res.recommend
    });
  }

  render() {
    return (
      <View />
    );
  }
}

export default RecommendSong;
