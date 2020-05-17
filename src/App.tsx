import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import Navigation from "./navigation";
import API from "./services";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  API.loginForEmail('xxx', 'xxx');
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

