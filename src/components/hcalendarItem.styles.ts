import {StyleSheet} from 'react-native';

export const hcalendarItemStyles = StyleSheet.create({
  calendarItem: {
    width: 60,
    marginLeft: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  activeCalItem: {
    flex: 1,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  defaultTxt: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
  },
  todayTxt: {
    fontWeight: 'bold',
    color: '#FAA82B',
  },
  weekendTxt: {
    fontWeight: '700',
  },
  deactivatedItem: {
    opacity: 0.2,
  },
  selectedItemDayTxt: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Poppins-Black',
  },
  selectedItemNumberTxt: {
    color: 'white',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: 1,
    fontFamily: 'Poppins-Black',
  },
});
