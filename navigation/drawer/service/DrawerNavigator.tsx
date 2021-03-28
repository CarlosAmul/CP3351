import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { View, SafeAreaView, Image } from 'react-native'
import * as React from 'react';
import {useContext} from 'react'
import {Text} from 'react-native-ui-lib'
// @ts-expect-error
import db from '../../../db.js'
// @ts-expect-error
import UserContext from '../../../UserContext';
// @ts-expect-error
import DashboardScreen from '../../../screens/Service/DashboardScreen'
// @ts-expect-error
import ActionsScreen from '../../../screens/Service/ActionsScreen'
// @ts-expect-error
import SettingsScreen from '../../../screens/Service/SettingsScreen'
// @ts-expect-error
import SafetyInstructionsScreen from '../../../Zainab/SafetyInstructionsScreen'
// @ts-expect-error
import InstallationsServiceScreen from '../../../screens/Service/InstallationsScreen'
// @ts-expect-error
import DetailsScreen from '../../../screens/Service/DetailsScreen'
// @ts-expect-error
import ReviewsScreen from '../../../Carlos/ReviewsScreen'
// @ts-expect-error
import ReviewForm from '../../../Carlos/ReviewForm'


import { DrawerParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList} from './types';

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
      <Drawer.Screen
        name="InstallationsService"
        component={InstallationsServiceNavigator}
        options={{ drawerLabel: "My Installations" }}
      />
      <Drawer.Screen
        name="Reviews"
        component={ReviewsNavigator}
        options={{ drawerLabel: "My Reviews" }}
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
      <ActionsStack.Screen
        name="SafetyInstructionsScreen"
        component={SafetyInstructionsScreen}
        options={{ headerTitle: 'SafetyInstructions' }}
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

const InstallationsServiceStack = createStackNavigator<{ 
  InstallationsServiceScreen: undefined,
  DetailsScreen: undefined,
  ReviewsForm: undefined 
}>();

function InstallationsServiceNavigator() {
  return (
    <InstallationsServiceStack.Navigator>
      <InstallationsServiceStack.Screen
        name="InstallationsServiceScreen"
        component={InstallationsServiceScreen}
        options={{ headerTitle: 'Installations' }}
      />
      <InstallationsServiceStack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ headerTitle: 'Details' }}
      />
      <InstallationsServiceStack.Screen
       name="ReviewsForm"
       component={ReviewForm}
       options={{ headerTitle: 'Review Form' }}
      />
    </InstallationsServiceStack.Navigator>
  )
}

const ReviewsStack = createStackNavigator<TabFourParamList>();

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