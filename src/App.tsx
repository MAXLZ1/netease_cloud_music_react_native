import React, {Component} from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import Navigation from "./navigation";
import API from "./services";
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from 'react-redux';
import store from "./redux/store";
import {connect} from "react-redux";
import {getUserInfo} from "./redux/actions/userInfo-action";
import {AnyAction, Dispatch} from "redux";

interface LayoutProps {
  getUserInfo: (uid: number) => Function
}

class Layout extends Component<LayoutProps>{
  async componentDidMount() {
    const result: any = await API.loginForEmail('xxx', 'xxx');
    const uid = result.account.id;
    await this.props.getUserInfo(uid);
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </SafeAreaView>
      </>
    );
  }
}

const Container = connect(
  null,
  (dispatch: Dispatch<AnyAction>) => ({
    getUserInfo: (uid: number) => dispatch(getUserInfo(uid))
  })
)(Layout);

export default function App() {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}

