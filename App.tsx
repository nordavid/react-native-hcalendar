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
  Animated,
} from 'react-native';
import {startOfToday} from 'date-fns';
import SplashScreen from 'react-native-splash-screen';
import HCalendar from './src/components/hcalendar.component';
import {
  HCalendarListItem,
  HCalendarRef,
} from './src/components/hcalendar.types';

const SCREEN_WIDTH = Dimensions.get('window').width;

const App = () => {
  const [selectedDay, setSelectedDay] = useState(startOfToday().toISOString());
  const [isHCalendarOpened, setIsHCalendarOpened] = useState<boolean>(false);
  const hcalendarRef = useRef<HCalendarRef | null>(null);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const onCalendarOpened = () => {
    setIsHCalendarOpened(true);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const onCalendarClosed = () => {
    setIsHCalendarOpened(false);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 220,
      delay: 100,
      useNativeDriver: true,
    }).start();
  };

  const closeCalendar = () => {
    if (hcalendarRef.current) {
      hcalendarRef.current.closeCalendar();
    }
  };

  const handleSelectedItemChanged = (item: HCalendarListItem) => {
    setSelectedDay(item.timestamp);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeAreaContainer}>
        <View>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            SelectedDay: {selectedDay}
          </Text>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            isHCalendarOpened: {isHCalendarOpened.toString()}
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
          daysBeforeToday={4}
          daysAfterToday={14}
          onCalendarOpened={onCalendarOpened}
          onCalendarClosed={onCalendarClosed}
          onSelectedItemChanged={(item) => handleSelectedItemChanged(item)}
        />
        <Animated.View style={{...styles.btnContainer, opacity: fadeAnim}}>
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
        </Animated.View>
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
    right: 15,
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
