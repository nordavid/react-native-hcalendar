import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {hcalendarElementStyles} from './hcalendarElement.styles';
import {HCalendarElementProps} from './hcalendar.types';

const HCalendarElement: FC<HCalendarElementProps> = (props) => {
  const textStyle = [
    hcalendarElementStyles.defaultTxt,
    props.item.isToday && hcalendarElementStyles.todayTxt,
    props.item.dayOfWeek == '5' && hcalendarElementStyles.weekendTxt,
    props.item.dayOfWeek == '6' && hcalendarElementStyles.weekendTxt,
    props.isDeactivated && hcalendarElementStyles.deactivatedItem,
  ];
  return (
    <TouchableOpacity
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      disabled={props.isDeactivated}
      style={[
        hcalendarElementStyles.calendarItem,
        {borderRadius: props.borderRadius},
      ]}>
      {props.isSelectedItem ? (
        <LinearGradient
          colors={['#FD0000', '#FFA900']}
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          style={[
            hcalendarElementStyles.activeCalItem,
            {borderRadius: props.borderRadius},
          ]}>
          <Text style={hcalendarElementStyles.selectedItemDayTxt}>
            {props.item.dayAcronym}
          </Text>
          <Text style={hcalendarElementStyles.selectedItemNumberTxt}>
            {props.item.dayNumber}
          </Text>
        </LinearGradient>
      ) : (
        <>
          <Text style={textStyle}>{props.item.dayAcronym}</Text>
          <Text style={textStyle}>{props.item.dayNumber}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default HCalendarElement;
