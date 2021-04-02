import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import * as React from 'react';
import { View, SafeAreaView, Image } from 'react-native'
// @ts-expect-error
import DashboardScreen from '../../../Zainab/Admin/DashboardScreen'
// @ts-expect-error
import ActionsScreen from '../../../Zainab/Admin/ActionsScreen'
// @ts-expect-error
import SettingsScreen from '../../../screens/Admin/SettingsScreen'
// @ts-expect-error
import RewardsScreen from '../../../Zainab/Admin/RewardsScreen'
// @ts-expect-error
import VacancyScreen from '../../../Zainab/Admin/VacancyScreen'
// @ts-expect-error
import ApplicationsScreen from '../../../Zainab/Admin/ApplicationsScreen'

import { DrawerParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList, TabFiveParamList, TabSixParamList, TabSevenParamList} from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();
import {Text} from 'react-native-ui-lib'

export default function DrawerNavigator() {
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
        name="Dashboard"
        component={DashboardNavigator}
        options={{ drawerLabel: "Dashboard" }} 
      />
      <Drawer.Screen
        name="Actions"
        component={ActionsNavigator}
      />
      <Drawer.Screen
        name="Rewards"
        component={RewardsNavigator}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsNavigator}
      />
      <Drawer.Screen
        name="Vacancy"
        component={VacancyNavigator}
      />
      <Drawer.Screen
        name="Applications"
        component={ApplicationsNavigator}
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

const RewardsStack = createStackNavigator<TabFourParamList>();

function RewardsNavigator() {
  return (
    <RewardsStack.Navigator>
      <RewardsStack.Screen
        name="RewardsScreen"
        component={RewardsScreen}
        options={{ headerTitle: 'Rewards' }}
      />
    </RewardsStack.Navigator>
  )
}

const ApplicationsStack = createStackNavigator<TabSixParamList>();

function ApplicationsNavigator() {
  return (
    <ApplicationsStack.Navigator>
      <ApplicationsStack.Screen
        name="ApplicationsScreen"
        component={ApplicationsScreen}
        options={{ headerTitle: 'Applications' }}
      />
    </ApplicationsStack.Navigator>
  )
}

const VacancyStack = createStackNavigator<TabFiveParamList>();

function VacancyNavigator() {
  return (
    <VacancyStack.Navigator>
      <VacancyStack.Screen
        name="VacancyScreen"
        component={VacancyScreen}
        options={{ headerTitle: 'Vacancy' }}
      />
    </VacancyStack.Navigator>
  )
}