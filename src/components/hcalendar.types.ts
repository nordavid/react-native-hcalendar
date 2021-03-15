export interface HCalendarProps {
  onSelectedItemChanged: (item: HCalendarListItem) => void;
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
