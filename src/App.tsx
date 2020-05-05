import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import Navigation from "./navigation";

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <Navigation />
      </SafeAreaView>
    </>
  );
}

