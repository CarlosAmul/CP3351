import { GestureResponderEvent } from "react-native";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type DrawerParamList = {
  PublicHome: undefined,
  Settings: undefined,
  Actions: undefined,
  Sensors: undefined
};

export type TabOneParamList = {
  PublicHomeScreen: undefined;
  CategoryFavsScreen: undefined;
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

export type onPressFunc = (event: GestureResponderEvent) => void;