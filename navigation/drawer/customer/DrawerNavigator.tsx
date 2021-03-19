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
import PublicHomeScreen from '../../../screens/Zainab/PublicHomeScreen'
// @ts-expect-error
import UserFavoritesScreen from '../../../screens/Zainab/UserFavoritesScreen'
// @ts-expect-error
import PaymentFormScreen from '../../../screens/Zainab/PaymentFormScreen'
// @ts-expect-error
import SettingsScreen from '../../../screens/Customer/SettingsScreen'
// @ts-expect-error
import ActionsScreen from '../../../screens/Customer/ActionsScreen'
// @ts-expect-error
import SensorsScreen from '../../../screens/Customer/SensorsScreen'
// @ts-expect-error
import NotificationsScreen from '../../../screens/Carlos/NotificationsScreen'
// @ts-expect-error
import FAQsScreen from '../../../screens/Carlos/FAQsScreen'
// @ts-expect-error
import CategoryFavsScreen from '../../../screens/Zainab/CategoryFavsScreen'
// @ts-expect-error
import FitnessTipsScreen from '../../../screens/Zainab/FitnessTipsScreen'
// @ts-expect-error
import CustomerSafetyInstructionsScreen from '../../../screens/Zainab/CustomerSafetyInstructionsScreen'
// @ts-expect-error
import ApprovedFitnessTipsScreen from '../../../screens/Zainab/ApprovedFitnessTipsScreen'
// @ts-expect-error
import CustomerRewardsScreen from '../../../screens/Zainab/CustomerRewardsScreen'
// @ts-expect-error
import RewardsHistoryScreen from '../../../screens/Zainab/RewardsHistoryScreen'

import { DrawerParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList, TabFiveParamList, TabSixParamList, TabSevenParamList, TabEightParamList, TabNineParamList } from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();


export default function DrawerNavigator() {

  const { user } = useContext(UserContext)

  const [notifCount, setNotifCount] = React.useState(0)
  React.useEffect(() => db.Users.Notifications.unreadCount(user.id, setNotifCount))

  return (
    <Drawer.Navigator
      drawerContent={ (props) => {
        return (
          <SafeAreaView>
            <View
              style={ {
                height: 200,
                alignItems: "center",
                justifyContent: "center",
              } }
            >
              <Image
                source={ require("../../../assets/images/logo.png") }
                style={{width: 110, height: 120}}
              />
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      } }
    >
      <Drawer.Screen
        name="PublicHome"
        component={ PublicHomeNavigator }
        options={ { drawerLabel: "Home" } } 
      />
      <Drawer.Screen
        name="Notifications"
        component={ NotificationsNavigator }
        options={ { drawerLabel: `Notifications (${notifCount})` } }
      />
      <Drawer.Screen
        name="FAQs"
        component={ FAQsNavigator }
        options={ { drawerLabel: 'FAQ' } }
      />
      <Drawer.Screen
        name="Actions"
        component={ ActionsNavigator }
      />
      <Drawer.Screen
        name="Sensors"
        component={ SensorsNavigator }
      />
      <Drawer.Screen
        name="Settings"
        component={ SettingsNavigator }
        options={ { drawerLabel: "Settings" } }
      />
      <Drawer.Screen
        name="UserFavorites"
        component={ UserFavoritesNavigator }
        options={ { drawerLabel: "My Favorites" } }
      />
      <Drawer.Screen
        name="FitnessTips"
        component={ FitnessTipsNavigator }
        options={ { drawerLabel: "My Fitness Tips" } }
      />
      <Drawer.Screen
        name="CustomerRewards"
        component={ CustomerRewardsNavigator }
        options={ { drawerLabel: "Rewards" } }
      />
    </Drawer.Navigator>
  );
}

const PublicHomeStack = createStackNavigator<TabOneParamList>();

function PublicHomeNavigator() {
  return (
    <PublicHomeStack.Navigator>
      <PublicHomeStack.Screen
        name="PublicHomeScreen"
        component={ PublicHomeScreen }
        options={ { headerTitle: 'Home' } }
      />
      <PublicHomeStack.Screen
        name="CategoryFavsScreen"
        component={ CategoryFavsScreen }
        options={ { headerTitle: 'Category Favorites' } }
      />
      <PublicHomeStack.Screen
        name="PaymentFormScreen"
        component={ PaymentFormScreen }
        options={ { headerTitle: 'Payment Form' } }
      />
      <PublicHomeStack.Screen
        name="CustomerSafetyInstructionsScreen"
        component={ CustomerSafetyInstructionsScreen }
        options={ { headerTitle: 'Safety Instructions' } }
      />
      <PublicHomeStack.Screen
        name="ApprovedFitnessTipsScreen"
        component={ ApprovedFitnessTipsScreen }
        options={ { headerTitle: 'Fitness Tips' } }
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
        component={ SettingsScreen }
        options={ { headerTitle: 'Settings' } }
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
        component={ ActionsScreen }
        options={ { headerTitle: 'Actions' } }
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
        component={ SensorsScreen }
        options={ { headerTitle: 'Sensors' } }
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
        component={ NotificationsScreen }
        options={ { headerTitle: 'Notifications' } }
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
        component={ FAQsScreen }
        options={ { headerTitle: 'Frequently Asked Questions' } }
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
        component={ UserFavoritesScreen }
        options={ { headerTitle: 'My Favorites' } }
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
        component={ FitnessTipsScreen }
        options={ { headerTitle: 'My Fitness Tips' } }
      />
    </FitnessTipsStack.Navigator>
  )
}

const CustomerRewardsStack = createStackNavigator<TabNineParamList>();

function CustomerRewardsNavigator() {
  return (
    <CustomerRewardsStack.Navigator>
      <CustomerRewardsStack.Screen
        name="CustomerRewardsScreen"
        component={ CustomerRewardsScreen }
        options={ { headerTitle: 'Rewards' } }
      />
      <CustomerRewardsStack.Screen
        name="RewardsHistoryScreen"
        component={ RewardsHistoryScreen }
        options={ { headerTitle: 'Rewards History' } }
      />
    </CustomerRewardsStack.Navigator>
  )
}