import * as React from 'react';

import { Text, Feather } from './Themed';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity, Image } from 'react-native';
  // @ts-expect-error
import db from '../db'

import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { onPressFunc } from '../navigation/drawer/customer/types';

  // @ts-expect-error
import UserContext from '../UserContext';

export default function MenuIcon(notif: number) {
  notif = 0

  const { user } = React.useContext(UserContext)
  const [count, setCount] = React.useState(0)
  
  React.useEffect(() => user? db.Users.Notifications.unreadCount(user.id, setCount): undefined, [user])

 

  const navigation = useNavigation();

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, []);

  return (
    <TouchableOpacity onPress={openDrawer}>
      {
       count && count > 0 ?
          <Image
            style={{ width: 24, height: 24, marginLeft: 25 }}
            source={require('../assets/images/menunotification.png')}
            resizeMode="contain"
          />
          :
          <Feather name="menu" size={24} style={{ marginLeft: 25 }} />
      }
      {/* <Feather name="menu" size={24} style={{ marginLeft: 25 }} /> */}
    </TouchableOpacity>
  );
};