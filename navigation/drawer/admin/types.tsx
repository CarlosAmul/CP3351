import { GestureResponderEvent } from "react-native";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type DrawerParamList = {
  Dashboard: undefined,
  Actions: undefined,
  Settings: undefined,
  Rewards: undefined,
  Vacancy: undefined,
  Applications: undefined
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
  RewardsScreen: undefined;
};

export type TabFiveParamList = {
  VacancyScreen: undefined;
};

export type TabSixParamList = {
  ApplicationsScreen: undefined;
};


export type onPressFunc = (event: GestureResponderEvent) => void;