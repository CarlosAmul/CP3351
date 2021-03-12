import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';

// @ts-expect-error
import DashboardScreen from '../../../screens/Admin/DashboardScreen'
// @ts-expect-error
import ActionsScreen from '../../../screens/Admin/ActionsScreen'
// @ts-expect-error
import SettingsScreen from '../../../screens/Admin/SettingsScreen'
// @ts-expect-error
import NotificationsScreen from '../../../screens/Carlos/NotificationsScreen'
// @ts-expect-error
import FAQsScreen from '../../../screens/Carlos/FAQsScreen'
// @ts-expect-error
import PendingFAQsScreen from '../../../screens/Carlos/PendingQuestionsScreen'
// @ts-expect-error
import DraftsScreen from '../../../screens/Carlos/DraftsScreen'
// @ts-expect-error
import db from '../../../db.js'
// @ts-expect-error
import UserContext from '../../../UserContext';

import { DrawerParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList, TabFiveParamList } from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();
import { Text } from 'react-native-ui-lib'

export default function DrawerNavigator() {

  const { user } = React.useContext(UserContext)

  const [notifCount, setNotifCount] = React.useState(0)
  React.useEffect(() => db.Users.Notifications.unreadCount(user.id, setNotifCount))
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Dashboard"
        component={DashboardNavigator}
        options={{ drawerLabel: "Dashboard" }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsNavigation}
        options={{ drawerLabel: `Notifications (${notifCount})` }}
      />
      <Drawer.Screen
        name="Actions"
        component={ActionsNavigator}
      />
      <Drawer.Screen
        name="FAQs"
        component={FAQsNavigator}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsNavigator}
      />

    </Drawer.Navigator>
  );
}

const DashboardStack = createStackNavigator<TabOneParamList>();

function DashboardNavigator() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ headerTitle: 'Dashboard' }}
      />
    </DashboardStack.Navigator>
  )
}

const ActionsStack = createStackNavigator<TabTwoParamList>();

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

const SettingsStack = createStackNavigator<TabThreeParamList>();

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

const NotificationsStack = createStackNavigator<TabFourParamList>();

function NotificationsNavigation() {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{ headerTitle: 'Notifications' }}
      />
    </NotificationsStack.Navigator>
  )
}

const FAQsStack = createStackNavigator<TabFiveParamList>();

function FAQsNavigator() {
  return (
    <FAQsStack.Navigator>
      <FAQsStack.Screen
        name="FAQsScreen"
        component={FAQsScreen}
        options={{ headerTitle: 'FAQ' }}
      />
      <FAQsStack.Screen
        name="PendingQuestions"
        component={PendingFAQsScreen}
        options={{headerTitle: 'Pending Questions'}}
      />
      {/* <FAQsStack.Screen
        name="DraftsScreen"
        component={DraftsScreen}
      /> */}
    </FAQsStack.Navigator>
  )
}

// const PendingFAQsStack = createStackNavigator<TabSixParamList>();

// function PendingFAQsNavigator() {
//   return (
//     <PendingFAQsStack.Navigator>
//       <PendingFAQsStack.Screen
//         name="PendingFAQsScreen"
//         component={PendingFAQsScreen}
//         options={{ headerTitle: 'Pending FAQs' }}
//       />
//     </PendingFAQsStack.Navigator>
//   )
// }


