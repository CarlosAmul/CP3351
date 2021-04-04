import React, { useState, useEffect, createRef } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { Card, Text, Button, Carousel, TabBar, Image } from 'react-native-ui-lib'
import { ScrollView } from 'react-native-gesture-handler';
import MenuIcon from '../../components/MenuIcon'
import DashboardCategory from './DashboardCategory'
import DashboardAd from './DashboardAd'
import { AntDesign } from '@expo/vector-icons';
import { Colors } from 'react-native-ui-lib'
import { PieChart } from 'react-native-chart-kit'
import db from '../../db';


export default async function reformatData(category) {
    console.log('reformat data')
    const sensors = await db.Sensors.findAll()
    console.log(sensors.size)

    return {
        name: category.name
    };
}