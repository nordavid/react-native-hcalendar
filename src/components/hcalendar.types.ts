export interface HCalendarRef {
  closeCalendar: () => void;
}

export interface HCalendarProps {
  ref?: any;
  onSelectedItemChanged: (item: HCalendarListItem) => void;
  onCalendarOpened?: () => void;
  onCalendarClosed?: () => void;
  borderRadius?: number;
  daysBeforeToday?: number;
  daysAfterToday?: number;
}

export interface HCalendarElementProps {
  item: HCalendarListItem;
  onPress: () => void;
  onLongPress: () => void;
  isSelectedItem: boolean;
  borderRadius?: number;
  isDeactivated: boolean;
}

export interface HCalendarListItem {
  id: string;
  dayNumber: string;
  dayAcronym: string;
  dayOfWeek: string;
  timestamp: string;
  isToday: boolean;
}
