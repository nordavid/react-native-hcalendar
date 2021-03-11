/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import HCalendar from './src/components/hcalendar';

const SCREEN_WIDTH = Dimensions.get('window').width;

const App = () => {
  const animateFlatList = () => {};

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeAreaContainer}>
        <Image
          style={{
            position: 'absolute',
            bottom: -500,
            width: SCREEN_WIDTH + 100,
          }}
          resizeMode={'contain'}
          source={require('./src/assets/maptwo.png')}
        />
        <HCalendar borderRadius={150} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: '#0f1011',
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
