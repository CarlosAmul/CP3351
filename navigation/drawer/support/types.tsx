import { GestureResponderEvent } from "react-native";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type DrawerParamList = {
  Dashboard: undefined,
  Actions: undefined,
  Settings: undefined,
  Notifications: undefined,
  FAQs: undefined,
  FitnessTips: undefined
};

export type TabOneParamList = {
  DashboardScreen: undefined;
};

export type TabTwoParamList = {
  ActionsScreen: undefined;
};

export type TabThreeParamList = {
  SettingsScreen: undefined;
};

export type TabFourParamList = {
  NotificationsScreen: undefined;
};

export type TabFiveParamList = {
  FAQsScreen: undefined;
  PendingQuestions: undefined;
  DraftsScreen: undefined;
};

export type TabSixParamList = { 
  FitnessTipsScreen: undefined;
};

export type onPressFunc = (event: GestureResponderEvent) => void;