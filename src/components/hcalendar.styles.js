import {StyleSheet} from 'react-native';

export const ITEM_WIDTH = 60;
export const ITEM_HEIGHT = 60;

export const hcalendarStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 110,
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
