import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const HCalendarItem = ({
  item,
  index,
  onPress,
  onLongPress,
  isActiveItem,
  borderRadius,
  isDeactivated,
}) => {
  const textStyle = [
    {color: 'white', fontFamily: 'Poppins-Regular', lineHeight: 20},
    item.isToday && {fontWeight: 'bold', color: '#FAA82B'},
    item.dayAcronym == 'Fr' && {fontWeight: '700'},
    item.dayAcronym == 'Sa' && {fontWeight: '700'},
    isDeactivated && {opacity: 0.3},
  ];
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={item.placeholder || isDeactivated}
      style={[styles.calendarItem, {borderRadius: borderRadius}]}>
      {isActiveItem ? (
        <LinearGradient
          colors={['#FD0000', '#FFA900']}
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          style={[styles.activeCalItem, {borderRadius: borderRadius}]}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              lineHeight: 22,
              fontFamily: 'Poppins-Black',
            }}>
            {item.dayAcronym}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              lineHeight: 18,
              letterSpacing: 1,
              fontFamily: 'Poppins-Black',
            }}>
            {item.dayNumber}
          </Text>
        </LinearGradient>
      ) : (
        <>
          {/* <Text style={textStyle}>i: {index}</Text> */}
          <Text style={textStyle}>{item.dayAcronym}</Text>
          <Text style={textStyle}>{item.dayNumber}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  calendarItem: {
    width: 60,
    marginLeft: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    //backgroundColor: 'green',
  },
  activeCalItem: {
    flex: 1,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
});

export default HCalendarItem;
