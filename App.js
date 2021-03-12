import React, {useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import HCalendarReanimated from './src/components/hcalendarReanimated';
import HCalendar from './src/components/hcalendar';

const SCREEN_WIDTH = Dimensions.get('window').width;

const App = () => {
  const hcalendarRef = useRef(null);

  const closeCalendar = () => {
    hcalendarRef.current.closeCalendarRef();
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeAreaContainer}>
        <Pressable
          style={{
            position: 'absolute',
            bottom: -500,
            width: SCREEN_WIDTH + 100,
            opacity: 0.5,
          }}
          onPress={closeCalendar}>
          <Image
            style={{
              width: SCREEN_WIDTH + 100,
              opacity: 0.5,
            }}
            resizeMode={'contain'}
            source={require('./src/assets/maptwo.png')}
          />
        </Pressable>
        {/* <HCalendar borderRadius={150} daysBeforeToday={5} daysAfterToday={30} /> */}
        <HCalendarReanimated
          ref={hcalendarRef}
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
          <TouchableOpacity onPress={closeCalendar} style={styles.mapBtns}>
            <Image
              style={styles.filterIcon}
              source={require('./src/assets/filter-filled3x.png')}
            />
          </TouchableOpacity>
        </View>
        <Image
          style={{
            position: 'absolute',
            bottom: -60,
            width: SCREEN_WIDTH,
          }}
          resizeMode={'contain'}
          source={require('./src/assets/tabbar.png')}
        />
        <View
          style={{
            position: 'absolute',
            bottom: -30,
            width: SCREEN_WIDTH,
            height: 50,
            backgroundColor: 'black',
          }}
        />
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
    zIndex: 1,
    position: 'absolute',
    bottom: 121,
    right: 45,
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
