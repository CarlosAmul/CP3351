import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';

// @ts-expect-error
import DashboardScreen from '../../../screens/Carlos/Marketing/DashboardScreen'
// @ts-expect-error
import ActionsScreen from '../../../screens/Carlos/Marketing/ActionsScreen'
// @ts-expect-error
import SettingsScreen from '../../../screens/Carlos/Marketing/SettingsScreen'
// @ts-expect-error
import AdForm from '../../../screens/Carlos/Marketing/AdForm'
// @ts-expect-error
import db from '../../../db.js'
// @ts-expect-error
import UserContext from '../../../UserContext';

import { DrawerParamList, TabOneParamList,  TabTwoParamList, TabThreeParamList } from './types';

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
        name="Actions"
        component={ActionsNavigator}
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
       <DashboardStack.Screen
        name="AdForm"
        component={AdForm}
        options={{ headerTitle: 'Create ad' }}
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



