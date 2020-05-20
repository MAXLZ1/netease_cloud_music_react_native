import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import Navigation from "./navigation";
import API from "./services";
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from 'react-redux';
import store from "./redux/store";

export default function App() {
  API.loginForEmail('xxx', 'xxx');
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

