import Animated, {
  useAnimatedStyle,
  useSharedValue,
  Easing,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, FlatList, View, TouchableOpacity, Text} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {DAYS} from '../constants/data';
import HCalendarItem from './hcalendarItem';
import {createCalendarElements} from './hcalendar.utils';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const ITEM_WIDTH = 60;
const ITEM_HEIGHT = 60;
const SCROLL_TAPPED_ITEM = true;

const HCalendarReanimated = ({
  borderRadius,
  daysBeforeToday,
  daysAfterToday,
}) => {
  // useStates
  const [selectedIndex, setSelectedIndex] = useState(daysBeforeToday);
  const [dateList, setDateList] = useState([]);
  const [isCalendarOpened, setIsCalendarOpened] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    console.log('init datelist');
    initDateList();
  }, []);

  // functions
  const initDateList = () => {
    const calendarElements = createCalendarElements(
      daysBeforeToday,
      // add 4 elements, we need 4 disabled items at the end of the list
      // because it cant be scrolled to them
      daysAfterToday + 4,
    );
    setDateList(calendarElements);
  };

  // calendaritem tapped
  const calendarItemTapped = (id, tappedIndex) => {
    console.log('tapped', tappedIndex, isCalendarOpened);
    ReactNativeHapticFeedback.trigger('impactMedium', options);

    if (selectedIndex == tappedIndex && isCalendarOpened) {
      console.log('same');
      closeCalendar(tappedIndex);
      setIsCalendarOpened(false);
    } else if (selectedIndex == tappedIndex && !isCalendarOpened) {
      openCalendar(tappedIndex);
      setIsCalendarOpened(true);
    } else {
      setSelectedIndex(tappedIndex);
      // scroll active cal item to beginning of flatlist on tap
      if (flatListRef.current && SCROLL_TAPPED_ITEM) {
        flatListRef.current.scrollToIndex({
          animated: true,
          index: tappedIndex,
        });
      }
    }
  };

  // animations
  const flatListWith = useSharedValue(ITEM_WIDTH);
  const animatedStyle = useAnimatedStyle(() => ({
    width: flatListWith.value,
  }));

  const openCalendar = (index) => {
    flatListWith.value = withTiming(5 * ITEM_WIDTH, {
      duration: 350,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const closeCalendar = (index) => {
    flatListWith.value = withTiming(ITEM_WIDTH, {
      duration: 350,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    scrollToIndex(index);
  };

  const scrollToIndex = (index) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: index,
      });
    }
  };

  const todayBtnTapped = () => {
    ReactNativeHapticFeedback.trigger('impactHeavy', options);
    setSelectedIndex(daysBeforeToday);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: daysBeforeToday,
      });
    }
  };

  const renderItem = ({index, item}) => {
    //console.log(index);
    return (
      <HCalendarItem
        item={item}
        onPress={() => calendarItemTapped(item.id, index)}
        isActiveItem={index === selectedIndex}
        borderRadius={borderRadius}
        isDeactivated={index > dateList.length - 5}
        index={index}
      />
    );
  };

  return (
    <View style={styles.container}>
      {selectedIndex != daysBeforeToday && (
        <TouchableOpacity style={styles.todayButton} onPress={todayBtnTapped}>
          <Text style={styles.todayButtonTxt}>HEUTE</Text>
        </TouchableOpacity>
      )}
      <Animated.View style={[styles.overlay, {borderRadius}, animatedStyle]}>
        <FlatList
          ref={flatListRef}
          contentContainerStyle={styles.flatListCC}
          decelerationRate={'fast'}
          snapToInterval={ITEM_WIDTH}
          style={[styles.flatList, {borderRadius: borderRadius}]}
          scrollEnabled={isCalendarOpened}
          horizontal={true}
          getItemLayout={(data, index) => ({
            length: ITEM_WIDTH,
            offset: ITEM_WIDTH * index,
            index,
          })}
          initialScrollIndex={selectedIndex}
          showsHorizontalScrollIndicator={false}
          data={dateList}
          keyExtractor={(calendarItem) => calendarItem.id}
          renderItem={renderItem}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 50,
    zIndex: 2,
  },
  overlay: {
    overflow: 'hidden',
  },
  flatList: {
    backgroundColor: '#363535',
    width: 300,
    height: ITEM_HEIGHT,
    borderRadius: 15,
  },
  activeCalItemBorder: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2,
    position: 'absolute',
  },
  todayButton: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    backgroundColor: '#363535',
    marginBottom: 10,
    borderRadius: 50,
  },
  todayButtonTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 11,
  },
});

export default HCalendarReanimated;
