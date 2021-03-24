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
  Notifications: undefined,
  FAQs: undefined,
  UserFavorites: undefined,
  PaymentForm: undefined,
  FitnessTips: undefined,
  Reports: undefined,
  Installations: undefined,
  CustomerRewards: undefined,
  LoginRegister: undefined
};

export type TabOneParamList = {
  PublicHomeScreen: undefined;
  CategoryFavsScreen: undefined;
  PaymentFormScreen: undefined;
  ApprovedFitnessTipsScreen: undefined;
  CustomerSafetyInstructionsScreen: undefined;
  VacancyScreen: undefined;
  ApplicationScreen: undefined;
};

export type TabTwoParamList = {
  SettingsScreen: undefined;
};

export type TabThreeParamList = {
  ActionsScreen: undefined;
};

export type TabFourParamList = {
  SensorsScreen: undefined;
  InstallationsFormScreen: undefined;
  ReportsFormScreen: undefined;
};

export type TabFiveParamList = {
  NotificationsScreen: undefined;
};

export type TabSixParamList = {
  FAQsScreen: undefined;
};

export type TabSevenParamList = {
  UserFavoritesScreen: undefined;
};

export type TabEightParamList = {
  FitnessTipsScreen: undefined;
};

export type TabNineParamList = {
  ReportsScreen: undefined;
  CustomerRewardsScreen: undefined;
  RewardsHistoryScreen: undefined;
};

export type TabTenParamList = {
  LoginRegisterScreen: undefined;
  InstallationScreen: undefined;
  DetailsScreen: undefined;
};

export type onPressFunc = (event: GestureResponderEvent) => void;