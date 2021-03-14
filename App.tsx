import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  View,
  Pressable,
  Text,
} from 'react-native';
import {startOfToday} from 'date-fns';
//import HCalendarReanimated from './src/components/hcalendarReanimated';
import SplashScreen from 'react-native-splash-screen';
import HCalendar from './src/components/hcalendar.component';

const SCREEN_WIDTH = Dimensions.get('window').width;

const App = () => {
  const [selectedDay, setSelectedDay] = useState(startOfToday().toISOString());
  const hcalendarRef = useRef(null);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const closeCalendar = () => {
    hcalendarRef.current.closeCalendar();
  };

  const handleSelectedItemChanged = (item) => {
    setSelectedDay(item.timestamp);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeAreaContainer}>
        <View>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            {selectedDay}
          </Text>
        </View>
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
        <HCalendar
          ref={hcalendarRef}
          borderRadius={150}
          daysBeforeToday={5}
          daysAfterToday={30}
          onSelectedItemChanged={(item) => handleSelectedItemChanged(item)}
        />
        {/* <HCalendarReanimated
          ref={hcalendarRef}
          borderRadius={150}
          daysBeforeToday={5}
          daysAfterToday={30}
          onSelectedItemChanged={(item) => handleSelectedItemChanged(item)}
        /> */}
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
