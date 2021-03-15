import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {hcalendarItemStyles} from './hcalendarItem.styles';
import {HCalendarElementProps} from './hcalendar.types';

const HCalendarItem: FC<HCalendarElementProps> = (props) => {
  const textStyle = [
    hcalendarItemStyles.defaultTxt,
    props.item.isToday && hcalendarItemStyles.todayTxt,
    props.item.dayOfWeek == '5' && hcalendarItemStyles.weekendTxt,
    props.item.dayOfWeek == '6' && hcalendarItemStyles.weekendTxt,
    props.isDeactivated && hcalendarItemStyles.deactivatedItem,
  ];
  return (
    <TouchableOpacity
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      disabled={props.isDeactivated}
      style={[
        hcalendarItemStyles.calendarItem,
        {borderRadius: props.borderRadius},
      ]}>
      {props.isSelectedItem ? (
        <LinearGradient
          colors={['#FD0000', '#FFA900']}
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          style={[
            hcalendarItemStyles.activeCalItem,
            {borderRadius: props.borderRadius},
          ]}>
          <Text style={hcalendarItemStyles.selectedItemDayTxt}>
            {props.item.dayAcronym}
          </Text>
          <Text style={hcalendarItemStyles.selectedItemNumberTxt}>
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

export default HCalendarItem;
