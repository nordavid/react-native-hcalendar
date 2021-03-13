import React, {useState, useRef, useEffect} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Easing,
  TouchableOpacity,
  Text,
} from 'react-native';
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

const HCalendar = ({borderRadius, daysBeforeToday, daysAfterToday}) => {
  // useStates
  const [selectedIndex, setSelectedIndex] = useState(daysBeforeToday);
  const [dateList, setDateList] = useState([]);
  const [isHCalendarOpen, setIsHCalendarOpen] = useState(false);
  const flatListRef = useRef(null);
  const widthAnim = useRef(new Animated.Value(ITEM_WIDTH)).current;

  // useRefs
  // const onViewRef = React.useRef((viewableItems) => {
  //   //ReactNativeHapticFeedback.trigger('impactMedium', options);
  // });
  // const viewConfigRef = React.useRef({
  //   viewAreaCoveragePercentThreshold: 0,
  //   waitForInteraction: true,
  // });

  useEffect(() => {
    console.log('init datelist');
    initDateList();
  }, []);

  const initDateList = () => {
    const calendarElements = createCalendarElements(
      daysBeforeToday,
      daysAfterToday + 4, // add 4 elemtens because the last 4 items are disabled due to the fact that it cant be scrolled to them
    );
    setDateList(calendarElements);
  };

  // calendaritem tapped
  const calItemTapped = (id, tappedIndex) => {
    console.log('tapped', tappedIndex, isHCalendarOpen);
    ReactNativeHapticFeedback.trigger('impactMedium', options);

    if (selectedIndex == tappedIndex && isHCalendarOpen) {
      console.log('same');
      closeCalendar(tappedIndex);
      setIsHCalendarOpen(false);
    } else if (selectedIndex == tappedIndex && !isHCalendarOpen) {
      openCalendar(tappedIndex);
      setIsHCalendarOpen(true);
    } else {
      setSelectedIndex(tappedIndex);
      // scroll active cal item to beginning of flatlist on tap
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          animated: true,
          index: tappedIndex,
        });
      }
    }
  };

  const calendarItemLongPresses = (id, tappedIndex) => {
    console.log('cal item long pressed');
  };

  const openCalendar = (index) => {
    Animated.timing(widthAnim, {
      toValue: 5 * ITEM_WIDTH,
      duration: 220,
      easing: Easing.out(Easing.bezier(0.28, 0.1, 0.28, 0.99)),
      useNativeDriver: false,
    }).start();
  };

  const closeCalendar = (index) => {
    Animated.timing(widthAnim, {
      toValue: ITEM_WIDTH,
      duration: 240,
      easing: Easing.out(Easing.bezier(0.28, 0.1, 0.28, 0.99)),
      useNativeDriver: false,
    }).start(() => scrollToIndex(index));
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
        onPress={() => calItemTapped(item.id, index)}
        onLongPress={() => calendarItemLongPresses(item.id, index)}
        isActiveItem={index === selectedIndex}
        borderRadius={borderRadius}
        isDeactivated={index > dateList.length - 5}
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

      <Animated.ScrollView
        style={[
          styles.flatList,
          {borderRadius: borderRadius},
          {width: widthAnim},
        ]}
        horizontal={true}
        snapToInterval={ITEM_WIDTH}
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}>
        {dateList.map((item, index) => {
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
        })}
      </Animated.ScrollView>

      <Animated.FlatList
        ref={flatListRef}
        contentContainerStyle={styles.flatListCC}
        decelerationRate={'fast'}
        snapToInterval={ITEM_WIDTH}
        style={[
          styles.flatList,
          {borderRadius: borderRadius},
          {width: widthAnim},
        ]}
        scrollEnabled={isHCalendarOpen}
        horizontal={true}
        snapToAlignment={'center'}
        // onViewableItemsChanged={onViewRef.current}
        // viewabilityConfig={viewConfigRef.current}
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
      {/* <View
        style={[styles.activeCalItemBorder, {borderRadius: borderRadius}]}
        pointerEvents={'none'}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 200,
  },
  flatListCC: {},
  flatList: {
    backgroundColor: '#363535',
    //width: 300,
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

export default HCalendar;
