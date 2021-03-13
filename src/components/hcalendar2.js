import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  Easing,
  Animated,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import HCalendarItem from './hcalendarItem';
import {createCalendarElements} from './hcalendar.utils';
import {hcalendarStyles, ITEM_WIDTH} from './hcalendar.styles';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const SCROLL_TAPPED_ITEM = true;

const HCalendar2 = forwardRef(
  (
    {borderRadius, daysBeforeToday, daysAfterToday, onSelectedItemChanged},
    ref,
  ) => {
    // useStates
    const [selectedIndex, setSelectedIndex] = useState(daysBeforeToday);
    const [dateList, setDateList] = useState([]);
    const [isCalendarOpened, setIsCalendarOpened] = useState(false);
    const flatListRef = useRef(null);
    const animatedWidth = useRef(new Animated.Value(ITEM_WIDTH)).current;

    useEffect(() => {
      console.log('init datelist');
      initDateList();
    }, []);

    useImperativeHandle(ref, () => ({
      closeCalendar() {
        closeCalendar();
      },
    }));

    // functions
    const initDateList = () => {
      const calendarElements = createCalendarElements(
        daysBeforeToday,
        // add 4 elements to daysAfterToday as we need 4 disabled items at the end of the list
        daysAfterToday + 4,
      );
      setDateList(calendarElements);
    };

    // calendaritem tapped
    const calendarItemTapped = (item, tappedIndex) => {
      console.log('tapped', tappedIndex, isCalendarOpened);
      ReactNativeHapticFeedback.trigger('impactMedium', options);

      if (selectedIndex == tappedIndex && isCalendarOpened) {
        console.log('same as selected item');
        closeCalendar();
      } else if (selectedIndex == tappedIndex && !isCalendarOpened) {
        openCalendar();
      } else {
        setSelectedIndex(tappedIndex);
        onSelectedItemChanged(item);
        // scroll active cal item to beginning of flatlist on tap
        if (flatListRef.current && SCROLL_TAPPED_ITEM) {
          flatListRef.current.scrollToIndex({
            animated: true,
            index: tappedIndex,
          });
        }
      }
    };

    const calendarItemLongPresses = (item, tappedIndex) => {
      if (isCalendarOpened) {
        setSelectedIndex(tappedIndex);
        onSelectedItemChanged(item);
        ReactNativeHapticFeedback.trigger('impactHeavy', options);
        console.log('cal item long pressed');

        setTimeout(() => {
          closeCalendar(tappedIndex);
        }, 100);
      }
    };

    const todayButtonTapped = () => {
      ReactNativeHapticFeedback.trigger('impactHeavy', options);
      setSelectedIndex(daysBeforeToday);
      onSelectedItemChanged(dateList[daysBeforeToday]);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          animated: isCalendarOpened,
          index: daysBeforeToday,
        });
      }
    };

    // animations
    const openCalendar = () => {
      Animated.timing(animatedWidth, {
        toValue: 5 * ITEM_WIDTH,
        duration: 220,
        easing: Easing.out(Easing.bezier(0.25, 0.1, 0.25, 1)),
        useNativeDriver: false,
      }).start();
      setIsCalendarOpened(true);
    };

    const closeCalendar = (index = selectedIndex) => {
      Animated.timing(animatedWidth, {
        toValue: ITEM_WIDTH,
        duration: 240,
        easing: Easing.out(Easing.bezier(0.25, 0.1, 0.25, 1)),
        useNativeDriver: false,
      }).start(() => scrollToIndex(index));
      setIsCalendarOpened(false);
    };

    const scrollToIndex = (index = selectedIndex) => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          animated: true,
          index: index,
        });
      }
    };

    const renderItem = ({index, item}) => {
      //console.log(index);
      return (
        <HCalendarItem
          item={item}
          onPress={() => calendarItemTapped(item, index)}
          onLongPress={() => calendarItemLongPresses(item, index)}
          isActiveItem={index === selectedIndex}
          borderRadius={borderRadius}
          isDeactivated={index > dateList.length - 5}
          index={index}
        />
      );
    };

    return (
      <View style={hcalendarStyles.container}>
        {selectedIndex != daysBeforeToday && (
          <TouchableOpacity
            style={hcalendarStyles.todayButton}
            onPress={todayButtonTapped}>
            <Text style={hcalendarStyles.todayButtonTxt}>HEUTE</Text>
          </TouchableOpacity>
        )}
        <Animated.View
          style={[
            hcalendarStyles.overlay,
            {borderRadius},
            {width: animatedWidth},
          ]}>
          <FlatList
            ref={flatListRef}
            contentContainerStyle={hcalendarStyles.flatListCC}
            decelerationRate={'fast'}
            snapToInterval={ITEM_WIDTH}
            style={[hcalendarStyles.flatList, {borderRadius: borderRadius}]}
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
  },
);

export default HCalendar2;
