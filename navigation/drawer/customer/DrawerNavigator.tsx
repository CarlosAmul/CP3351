import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';

// @ts-expect-error
import PublicHomeScreen from '../../../screens/Zainab/PublicHomeScreen'
// @ts-expect-error
import SettingsScreen from '../../../screens/Customer/SettingsScreen'
// @ts-expect-error
import ActionsScreen from '../../../screens/Customer/ActionsScreen'
// @ts-expect-error
import SensorsScreen from '../../../screens/Customer/SensorsScreen'

import { DrawerParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList} from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();
import {Text} from 'react-native-ui-lib'

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="PublicHome"
        component={PublicHomeNavigator}
        options={{ drawerLabel: "Home" }} 
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