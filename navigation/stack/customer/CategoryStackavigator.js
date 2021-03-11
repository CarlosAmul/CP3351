import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function CategoryStackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Categories" component={Contact} />
      </Stack.Navigator>
    );
  }