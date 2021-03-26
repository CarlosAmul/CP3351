import { GestureResponderEvent } from "react-native";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type DrawerParamList = {
  Dashboard: undefined,
  Actions: undefined,
  Settings: undefined,
  InstallationsService: undefined
};

export type TabOneParamList = {
  DashboardScreen: undefined;
};

export type TabTwoParamList = {
  ActionsScreen: undefined;
  SafetyInstructionsScreen: undefined
};

export type TabThreeParamList = {
  SettingsScreen: undefined;
};

export type TabFourParamList = {
  InstallationServiceScreen: undefined;
  DetailsScreen: undefined;
};