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
  FitnessTipsScreen: undefined;
};

export type onPressFunc = (event: GestureResponderEvent) => void;