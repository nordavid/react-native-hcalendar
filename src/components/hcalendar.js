import React, {useState, useRef} from 'react';
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

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const ITEM_WIDTH = 60;
const ITEM_HEIGHT = 60;

const HCalendar = ({borderRadius}) => {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const [selectedId, setSelectedId] = useState(null);
  const [isHCalendarOpen, setIsHCalendarOpen] = useState(false);
  const flatListRef = useRef(null);
  const widthAnim = useRef(new Animated.Value(ITEM_WIDTH)).current;

  const onViewRef = React.useRef((viewableItems) => {
    //console.log(viewableItems);
    //console.log('viewableTrigger');
    //ReactNativeHapticFeedback.trigger('impactMedium', options);
  });
  const viewConfigRef = React.useRef({
    viewAreaCoveragePercentThreshold: 0,
    waitForInteraction: true,
  });

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

  const openCalendar = (index) => {
    Animated.timing(widthAnim, {
      toValue: 5 * ITEM_WIDTH,
      duration: 300,
      easing: Easing.out(Easing.bezier(0.28, 0.1, 0.28, 0.99)),
      useNativeDriver: false,
    }).start();
  };

  const closeCalendar = (index) => {
    Animated.timing(widthAnim, {
      toValue: ITEM_WIDTH,
      duration: 300,
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
    setSelectedIndex(3);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: 3,
      });
    }
  };

  const renderItem = ({index, item}) => {
    //console.log(index);
    return (
      <HCalendarItem
        item={item}
        onPress={() => calItemTapped(item.id, index)}
        isActiveItem={index === selectedIndex}
        borderRadius={borderRadius}
        isDeactivated={index > DAYS.length - 5}
      />
    );
  };

  return (
    <View style={styles.container}>
      {selectedIndex != 3 && (
        <TouchableOpacity style={styles.todayButton} onPress={todayBtnTapped}>
          <Text style={styles.todayButtonTxt}>HEUTE</Text>
        </TouchableOpacity>
      )}

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
        scrollEnabled={true}
        horizontal={true}
        snapToAlignment={'center'}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        initialScrollIndex={selectedIndex}
        showsHorizontalScrollIndicator={false}
        data={DAYS}
        keyExtractor={(calendarItem) => calendarItem.id}
        renderItem={renderItem}
      />
      {/* <View style={styles.activeCalItemBorder} pointerEvents={'none'} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 50,
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
