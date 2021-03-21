import { GestureResponderEvent } from "react-native";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type DrawerParamList = {
  Dashboard: undefined,
  Actions: undefined,
  Settings: undefined,
  UserTrackings: undefined
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
  UserTrackingsScreen: undefined;
};


export type onPressFunc = (event: GestureResponderEvent) => void;