import { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerGestureContext } from '@react-navigation/drawer';
import * as React from 'react';

// @ts-expect-error
import db from '../../../db.js'
// @ts-expect-error
import UserContext from '../../../UserContext';
// @ts-expect-error
import PublicHomeScreen from '../../../screens/Zainab/PublicHomeScreen'

// import CategoryFavsScreen from '../../../screens/Zainab/CategoryFavsScreen'
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

import { DrawerParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList, TabFiveParamList, TabSixParamList } from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();


export default function DrawerNavigator() {

  const { user } = useContext(UserContext)

  const [notifCount, setNotifCount] = React.useState(0)
  React.useEffect(() => db.Users.Notifications.unreadCount(user.id, setNotifCount))

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="PublicHome"
        component={PublicHomeNavigator}
        options={{ drawerLabel: "Home" }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsNavigator}
        options={{ drawerLabel: `Notifications (${notifCount})` }}
      />
      <Drawer.Screen
        name="FAQs"
        component={FAQsNavigator}
        options={{ drawerLabel: 'FAQ' }}
      />
      <Drawer.Screen
        name="Actions"
        component={ActionsNavigator}
      />
      <Drawer.Screen
        name="Sensors"
        component={SensorsNavigator}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{ drawerLabel: "Settings" }}
      />
      <Drawer.Screen
        name="UserFavorites"
        component={UserFavoritesNavigator}
        options={{ drawerLabel: "My Favorites" }}
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
        component={PublicHomeScreen}
        options={{ headerTitle: 'Home' }}
      />
      {/* <PublicHomeStack.Screen
        name="CategoryFavsScreen"
        component={CategoryFavsScreen}
        options={{ headerTitle: 'Category Favorites' }}
      />
      <PublicHomeStack.Screen
        name="PaymentFormScreen"
        component={PaymentFormScreen}
        options={{ headerTitle: 'Payment Form' }}
      /> */}
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