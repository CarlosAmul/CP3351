import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import * as React from 'react';
import { View, SafeAreaView, Image } from 'react-native'
import {useContext} from 'react'
// @ts-expect-error
import db from '../../../db.js'
// @ts-expect-error
import UserContext from '../../../UserContext';
// @ts-expect-error
import DashboardScreen from '../../../Zainab/Support/DashboardScreen'
// @ts-expect-error
import ActionsScreen from '../../../Zainab/Admin/ActionsScreen'
// @ts-expect-error
import SettingsScreen from '../../../screens/Admin/SettingsScreen'
// @ts-expect-error
import NotificationsScreen from '../../../Carlos/NotificationsScreen'
// @ts-expect-error
import FAQsScreen from '../../../Carlos/FAQsScreen'
// @ts-expect-error
import PendingFAQsScreen from '../../../Carlos/PendingQuestionsScreen'
// @ts-expect-error
import DraftsScreen from '../../../Carlos/DraftsScreen.js'
// @ts-expect-error
import FitnessTipsScreen from '../../../Zainab/Support/FitnessTipsScreen'

import { DrawerParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList, TabFiveParamList, TabSixParamList} from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();
import { Text } from 'react-native-ui-lib'

export default function DrawerNavigator() {

  const { user } = React.useContext(UserContext)

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
      <Drawer.Screen
        name="FitnessTips"
        component={FitnessTipsNavigator}
        options={{ drawerLabel: `Fitness Tips` }}
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
      <FAQsStack.Screen
        name="DraftsScreen"
        component={DraftsScreen}
        options={{headerTitle: 'Drafts'}}
      />
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

const FitnessTipsStack = createStackNavigator<TabSixParamList>();

function FitnessTipsNavigator() {
  return (
    <FitnessTipsStack.Navigator>
      <FitnessTipsStack.Screen
        name="FitnessTipsScreen"
        component={FitnessTipsScreen}
        options={{ headerTitle: 'Fitness Tips' }}
      />
    </FitnessTipsStack.Navigator>
  )
}

