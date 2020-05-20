import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import Navigation from "./navigation";
import API from "./services";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  API.loginForEmail('18254170605@163.com', 'lgz5785368');
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

