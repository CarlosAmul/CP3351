import { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerGestureContext, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { View, SafeAreaView, Image } from 'react-native'
import * as React from 'react';
// @ts-expect-error
import db from '../../../db.js'
// @ts-expect-error
import UserContext from '../../../UserContext';
// @ts-expect-error
import PublicHomeScreen from '../../../Zainab/PublicHomeScreen'
// @ts-expect-error
import UserFavoritesScreen from '../../../Zainab/UserFavoritesScreen'
// @ts-expect-error
import PaymentFormScreen from '../../../Zainab/PaymentFormScreen'
// @ts-expect-error
import SettingsScreen from '../../../screens/Customer/SettingsScreen'
// @ts-expect-error
import ActionsScreen from '../../../screens/Customer/ActionsScreen'
// @ts-expect-error
import SensorsScreen from '../../../screens/Customer/SensorsScreen'
// @ts-expect-error
import NotificationsScreen from '../../../Carlos/NotificationsScreen'
// @ts-expect-error
import FAQsScreen from '../../../Carlos/FAQsScreen'
// @ts-expect-error
import CategoryFavsScreen from '../../../Zainab/CategoryFavsScreen'
// @ts-expect-error
import FitnessTipsScreen from '../../../Zainab/FitnessTipsScreen'
// @ts-expect-error
import CustomerSafetyInstructionsScreen from '../../../Zainab/CustomerSafetyInstructionsScreen'
// @ts-expect-error
import ApprovedFitnessTipsScreen from '../../../Zainab/ApprovedFitnessTipsScreen'
// @ts-expect-error
import ReportsScreen from '../../../screens/Customer/ReportsScreen'
// @ts-expect-error
import InstallationsFormScreen from '../../../screens/Customer/SensorsComponents/InstallationsFormScreen'
// @ts-expect-error
import ReportsFormScreen from '../../../screens/Customer/SensorsComponents/ReportsFormScreen'
// @ts-expect-error
import InstallationsScreen from '../../../screens/Customer/InstallationsScreen'
// @ts-expect-error
import DetailsScreen from '../../../screens/Customer/DetailsScreen'
// @ts-expect-error
import CustomerRewardsScreen from '../../../Zainab/CustomerRewardsScreen'
// @ts-expect-error
import RewardsHistoryScreen from '../../../Zainab/RewardsHistoryScreen'
// @ts-expect-error
import VacancyScreen from '../../../Zainab/VacancyScreen'
// @ts-expect-error
import ApplicationScreen from '../../../Zainab/ApplicationScreen'
// @ts-expect-error
import RegisterLogin from '../../../RegisterLogin'
// @ts-expect-error
import ReviewForm from '../../../Carlos/ReviewForm'
// @ts-expect-error
import ReviewsScreen from '../../../Carlos/Customer/ReviewsScreen'

import { DrawerParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList, TabFiveParamList, TabSixParamList, TabSevenParamList, TabEightParamList, TabNineParamList, TabTenParamList, TabElevenParamList } from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {

  const { user } = useContext(UserContext)

  const [notifCount, setNotifCount] = React.useState(0)
  React.useEffect(() => user ? db.Users.Notifications.unreadCount(user.id, setNotifCount) : undefined, [user])

  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 200,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../../assets/images/logo.png")}
                style={{ width: 110, height: 120 }}
              />
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
    >
      <Drawer.Screen
        name="PublicHome"
        component={PublicHomeNavigator}
        options={{ drawerLabel: "Home" }}
      />
      {
        user
        &&
        <Drawer.Screen
          name="Notifications"
          component={NotificationsNavigator}
          options={{ drawerLabel: `Notifications (${notifCount})` }}
        />
      }
      {
        user
        &&
        <Drawer.Screen
          name="Actions"
          component={ActionsNavigator}
        />
      }
      <Drawer.Screen
        name="FAQs"
        component={FAQsNavigator}
        options={{ drawerLabel: 'FAQ' }}
      />
      {
        user
        &&
        <Drawer.Screen
          name="Sensors"
          component={SensorsNavigator}
        />
      }
      {
        user
        &&
        <Drawer.Screen
          name="Reviews"
          component={ReviewsNavigator}
          options={{ drawerLabel: "My Reviews" }}
        />
      }
      {
        user
        &&
        <Drawer.Screen
          name="Settings"
          component={SettingsNavigator}
          options={{ drawerLabel: "Settings" }}
        />
      }
      {
        user
        &&
        <Drawer.Screen
          name="UserFavorites"
          component={UserFavoritesNavigator}
          options={{ drawerLabel: "My Favorites" }}
        />
      }
      {
        user
        &&
        <Drawer.Screen
          name="FitnessTips"
          component={FitnessTipsNavigator}
          options={{ drawerLabel: "My Fitness Tips" }}
        />
      }
      {
        user
        &&
        <Drawer.Screen
          name="Reports"
          component={ReportsNavigator}
          options={{ drawerLabel: "My Reports" }}
        />
      }
      {
        user
        &&
        <Drawer.Screen
          name="Installations"
          component={InstallationsNavigator}
          options={{ drawerLabel: "My Installations" }}
        />
      }
      <Drawer.Screen
        name="CustomerRewards"
        component={CustomerRewardsNavigator}
        options={{ drawerLabel: "Rewards" }}
      />
      {
        !user
        &&
        <Drawer.Screen
          name="LoginRegister"
          component={LoginRegisterNavigator}
          options={{ drawerLabel: "Login" }}
        />
      }
    </Drawer.Navigator>
  );
}

const PublicHomeStack = createStackNavigator<TabOneParamList>();

function PublicHomeNavigator() {
  return (
    <PublicHomeStack.Navigator>
      <PublicHomeStack.Screen
        name="PublicHomeScreen"
        component={PublicHomeScreen}
        options={{ headerTitle: 'Home' }}
      />
      <PublicHomeStack.Screen
        name="CategoryFavsScreen"
        component={CategoryFavsScreen}
        options={{ headerTitle: 'Category Favorites' }}
      />
      <PublicHomeStack.Screen
        name="PaymentFormScreen"
        component={PaymentFormScreen}
        options={{ headerTitle: 'Payment Form' }}
      />
      <PublicHomeStack.Screen
        name="CustomerSafetyInstructionsScreen"
        component={CustomerSafetyInstructionsScreen}
        options={{ headerTitle: 'Safety Instructions' }}
      />
      <PublicHomeStack.Screen
        name="ApprovedFitnessTipsScreen"
        component={ApprovedFitnessTipsScreen}
        options={{ headerTitle: 'Fitness Tips' }}
      />
      <PublicHomeStack.Screen
        name="VacancyScreen"
        component={VacancyScreen}
        options={{ headerTitle: 'Vacancies' }}
      />
      <PublicHomeStack.Screen
        name="ApplicationScreen"
        component={ApplicationScreen}
        options={{ headerTitle: 'Apply Now' }}
      />
    </PublicHomeStack.Navigator>
  )
}

const SettingsStack = createStackNavigator<TabTwoParamList>();

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
    </SettingsStack.Navigator>
  )
}

const ActionsStack = createStackNavigator<TabThreeParamList>();

function ActionsNavigator() {
  return (
    <ActionsStack.Navigator>
      <ActionsStack.Screen
        name="ActionsScreen"
        component={ActionsScreen}
        options={{ headerTitle: 'Actions' }}
      />
    </ActionsStack.Navigator>
  )
}

const SensorsStack = createStackNavigator<TabFourParamList>();

function SensorsNavigator() {
  return (
    <SensorsStack.Navigator>
      <SensorsStack.Screen
        name="SensorsScreen"
        component={SensorsScreen}
        options={{ headerTitle: 'Sensors' }}
      />
      <SensorsStack.Screen
        name="InstallationsFormScreen"
        component={InstallationsFormScreen}
        options={{ headerTitle: 'Installation Form' }}
      />
      <SensorsStack.Screen
        name="ReportsFormScreen"
        component={ReportsFormScreen}
        options={{ headerTitle: 'Report Form' }}
      />
    </SensorsStack.Navigator>
  )
}

const NotificationStack = createStackNavigator<TabFiveParamList>();

function NotificationsNavigator() {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{ headerTitle: 'Notifications' }}
      />
    </NotificationStack.Navigator>
  )
}

const FAQsStack = createStackNavigator<TabSixParamList>();

function FAQsNavigator() {
  return (
    <FAQsStack.Navigator>
      <FAQsStack.Screen
        name="FAQsScreen"
        component={FAQsScreen}
        options={{ headerTitle: 'Frequently Asked Questions' }}
      />
    </FAQsStack.Navigator>
  )
}
const UserFavoritesStack = createStackNavigator<TabSevenParamList>();

function UserFavoritesNavigator() {
  return (
    <UserFavoritesStack.Navigator>
      <UserFavoritesStack.Screen
        name="UserFavoritesScreen"
        component={UserFavoritesScreen}
        options={{ headerTitle: 'My Favorites' }}
      />
    </UserFavoritesStack.Navigator>
  )
}

const FitnessTipsStack = createStackNavigator<TabEightParamList>();

function FitnessTipsNavigator() {
  return (
    <FitnessTipsStack.Navigator>
      <FitnessTipsStack.Screen
        name="FitnessTipsScreen"
        component={FitnessTipsScreen}
        options={{ headerTitle: 'My Fitness Tips' }}
      />
    </FitnessTipsStack.Navigator>
  )
}

const ReportsStack = createStackNavigator<TabNineParamList>();

function ReportsNavigator() {
  return (
    <ReportsStack.Navigator>
      <ReportsStack.Screen
        name="ReportsScreen"
        component={ReportsScreen}
        options={{ headerTitle: 'Reports' }}
      />
    </ReportsStack.Navigator>
  )
}

const InstallationsStack = createStackNavigator<TabTenParamList>();

function InstallationsNavigator() {
  return (
    <InstallationsStack.Navigator>
      <InstallationsStack.Screen
        name="InstallationScreen"
        component={InstallationsScreen}
        options={{ headerTitle: 'Installations' }}
      />
      <InstallationsStack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ headerTitle: 'Details' }}
      />
       <InstallationsStack.Screen
        name="ReviewsForm"
        component={ReviewForm}
        options={{ headerTitle: 'Review Form' }}
      />
    </InstallationsStack.Navigator>
  )
}

const CustomerRewardsStack = createStackNavigator<TabNineParamList>();

function CustomerRewardsNavigator() {
  return (
    <CustomerRewardsStack.Navigator>
      <CustomerRewardsStack.Screen
        name="CustomerRewardsScreen"
        component={CustomerRewardsScreen}
        options={{ headerTitle: 'Rewards' }}
      />
      <CustomerRewardsStack.Screen
        name="RewardsHistoryScreen"
        component={RewardsHistoryScreen}
        options={{ headerTitle: 'Rewards History' }}
      />
    </CustomerRewardsStack.Navigator>
  )
}

const LoginRegisterStack = createStackNavigator<TabTenParamList>();

function LoginRegisterNavigator() {
  return (
    <LoginRegisterStack.Navigator>
      <LoginRegisterStack.Screen
        name="LoginRegisterScreen"
        component={RegisterLogin}
        options={{ headerTitle: 'Login/Register' }}
      />
    </LoginRegisterStack.Navigator>
  )
}

const ReviewsStack = createStackNavigator<TabElevenParamList>();

function ReviewsNavigator() {
  return (
    <ReviewsStack.Navigator>
      <ReviewsStack.Screen
        name="ReviewsScreen"
        component={ReviewsScreen}
        options={{ headerTitle: 'Reviews' }}
      />
    </ReviewsStack.Navigator>
  )
}