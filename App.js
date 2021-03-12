import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import HCalendarReanimated from './src/components/hcalendarReanimated';
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
            opacity: 0.5,
          }}
          resizeMode={'contain'}
          source={require('./src/assets/maptwo.png')}
        />
        {/* <HCalendar borderRadius={150} daysBeforeToday={5} daysAfterToday={30} /> */}
        <HCalendarReanimated
          borderRadius={150}
          daysBeforeToday={5}
          daysAfterToday={30}
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.mapBtns}>
            <Image
              style={styles.locationArrowIcon}
              source={require('./src/assets/location-arrow-filled3x.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapBtns}>
            <Image
              style={styles.filterIcon}
              source={require('./src/assets/filter-filled3x.png')}
            />
          </TouchableOpacity>
        </View>
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
  btnContainer: {
    zIndex: 0,
    position: 'absolute',
    bottom: 60,
    right: 40,
    flexDirection: 'row',
  },
  mapBtns: {
    width: 38,
    height: 38,
    backgroundColor: '#363535',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  locationArrowIcon: {
    width: 16,
    height: 16,
    top: 1,
    right: 1,
  },
  filterIcon: {
    width: 16,
    height: 16,
    top: 1.5,
  },
});

export default App;
