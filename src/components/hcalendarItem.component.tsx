import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {hcalendarItemStyles} from './hcalendarItem.styles';
import {HCalendarElementProps} from './hcalendar.types';

const HCalendarItem: FC<HCalendarElementProps> = ({
  item,
  onPress,
  onLongPress,
  isSelectedItem,
  borderRadius,
  isDeactivated,
}) => {
  const textStyle = [
    hcalendarItemStyles.defaultTxt,
    item.isToday && hcalendarItemStyles.todayTxt,
    item.dayOfWeek == '5' && hcalendarItemStyles.weekendTxt,
    item.dayOfWeek == '6' && hcalendarItemStyles.weekendTxt,
    isDeactivated && hcalendarItemStyles.deactivatedItem,
  ];
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={isDeactivated}
      style={[hcalendarItemStyles.calendarItem, {borderRadius: borderRadius}]}>
      {isSelectedItem ? (
        <LinearGradient
          colors={['#FD0000', '#FFA900']}
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          style={[
            hcalendarItemStyles.activeCalItem,
            {borderRadius: borderRadius},
          ]}>
          <Text style={hcalendarItemStyles.selectedItemDayTxt}>
            {item.dayAcronym}
          </Text>
          <Text style={hcalendarItemStyles.selectedItemNumberTxt}>
            {item.dayNumber}
          </Text>
        </LinearGradient>
      ) : (
        <>
          <Text style={textStyle}>{item.dayAcronym}</Text>
          <Text style={textStyle}>{item.dayNumber}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default HCalendarItem;
