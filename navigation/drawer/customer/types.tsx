import { GestureResponderEvent } from "react-native";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type DrawerParamList = {
  PublicHome: undefined,
  Settings: undefined,
  Actions: undefined,
  Sensors: undefined,
  Notifications: undefined;
};

export type TabOneParamList = {
  PublicHomeScreen: undefined;
};

export type TabTwoParamList = {
  SettingsScreen: undefined;
};

export type TabThreeParamList = {
  ActionsScreen: undefined;
};

export type TabFourParamList = {
  SensorsScreen: undefined;
};

export type TabFiveParamList = {
  NotificationsScreen: undefined;
};

export type onPressFunc = (event: GestureResponderEvent) => void;