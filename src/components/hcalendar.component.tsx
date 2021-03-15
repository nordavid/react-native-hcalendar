import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  FC,
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
import HCalendarElement from './hcalendarElement.component';
import {
  createCalendarElements,
  DEFAULT_DAYS_BEFORE_TODAY,
  DEFAULT_DAYS_AFTER_TODAY,
} from './hcalendar.utils';
import {hcalendarStyles, ITEM_WIDTH} from './hcalendar.styles';
import {HCalendarProps, HCalendarListItem} from './hcalendar.types';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const SCROLL_TO_TAPPED_ITEM = true;

const HCalendar: FC<HCalendarProps> = forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    props.daysBeforeToday || DEFAULT_DAYS_BEFORE_TODAY,
  );
  const [dateList, setDateList] = useState<HCalendarListItem[]>([]);
  const [isCalendarOpened, setIsCalendarOpened] = useState<boolean>(false);
  const flatListRef = useRef<FlatList | null>(null);
  const animatedWidth = useRef<Animated.Value>(new Animated.Value(ITEM_WIDTH))
    .current;

  useEffect(() => {
    initDateList();
  }, []);

  useImperativeHandle(ref, () => ({
    closeCalendar,
  }));

  const initDateList = () => {
    const calendarElements = createCalendarElements(
      props.daysBeforeToday || DEFAULT_DAYS_BEFORE_TODAY,
      // add 4 elements to daysAfterToday as we need 4 disabled items at the end of the list
      props.daysAfterToday || DEFAULT_DAYS_AFTER_TODAY + 4,
    );
    setDateList(calendarElements);
  };

  const calendarItemTapped = (item: HCalendarListItem, tappedIndex: number) => {
    ReactNativeHapticFeedback.trigger('impactMedium', options);

    if (selectedIndex == tappedIndex && isCalendarOpened) {
      closeCalendar();
    } else if (selectedIndex == tappedIndex && !isCalendarOpened) {
      openCalendar();
    } else {
      setSelectedIndex(tappedIndex);
      props.onSelectedItemChanged(item);
      SCROLL_TO_TAPPED_ITEM && scrollToIndex(tappedIndex, true);
    }
  };

  const calendarItemLongPressed = (
    item: HCalendarListItem,
    tappedIndex: number,
  ) => {
    if (isCalendarOpened) {
      setSelectedIndex(tappedIndex);
      props.onSelectedItemChanged(item);
      ReactNativeHapticFeedback.trigger('impactHeavy', options);

      setTimeout(() => {
        closeCalendar(tappedIndex);
      }, 100);
    }
  };

  const todayButtonTapped = () => {
    ReactNativeHapticFeedback.trigger('impactHeavy', options);
    setSelectedIndex(props.daysBeforeToday || DEFAULT_DAYS_BEFORE_TODAY);
    props.onSelectedItemChanged(
      dateList[props.daysBeforeToday || DEFAULT_DAYS_BEFORE_TODAY],
    );
    scrollToIndex(props.daysBeforeToday, isCalendarOpened);
  };

  const openCalendar = () => {
    Animated.spring(animatedWidth, {
      toValue: ITEM_WIDTH * 5,
      useNativeDriver: false,
      friction: 8,
    }).start();
    setIsCalendarOpened(true);
    if (props.onCalendarOpened) {
      props.onCalendarOpened();
    }
  };

  const closeCalendar = (index = selectedIndex) => {
    Animated.timing(animatedWidth, {
      toValue: ITEM_WIDTH,
      duration: 240,
      easing: Easing.out(Easing.bezier(0.25, 0.1, 0.25, 1)),
      useNativeDriver: false,
    }).start(() => scrollToIndex(index));
    setIsCalendarOpened(false);
    if (props.onCalendarClosed) {
      props.onCalendarClosed();
    }
  };

  const scrollToIndex = (
    index: number = selectedIndex,
    animated: boolean = true,
  ) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: animated,
        index: index,
      });
    }
  };

  const renderItem = ({
    index,
    item,
  }: {
    index: number;
    item: HCalendarListItem;
  }) => {
    return (
      <HCalendarElement
        item={item}
        onPress={() => calendarItemTapped(item, index)}
        onLongPress={() => calendarItemLongPressed(item, index)}
        isSelectedItem={index === selectedIndex}
        borderRadius={props.borderRadius}
        isDeactivated={index > dateList.length - 5}
      />
    );
  };

  return (
    <View style={hcalendarStyles.container}>
      {selectedIndex != props.daysBeforeToday && (
        <TouchableOpacity
          style={hcalendarStyles.todayButton}
          onPress={todayButtonTapped}>
          <Text style={hcalendarStyles.todayButtonTxt}>HEUTE</Text>
        </TouchableOpacity>
      )}
      <Animated.View
        style={[
          hcalendarStyles.overlay,
          {borderRadius: props.borderRadius},
          {width: animatedWidth},
        ]}>
        <FlatList
          ref={flatListRef}
          decelerationRate={'fast'}
          snapToInterval={ITEM_WIDTH}
          style={[hcalendarStyles.flatList, {borderRadius: props.borderRadius}]}
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
});

export default HCalendar;
