import React, { useState, useEffect, createRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View } from '../../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { Card, Text, Button, Carousel, TextArea } from 'react-native-ui-lib'
import { ScrollView } from 'react-native-gesture-handler';
import MenuIcon from '../../../components/MenuIcon'
import DashboardCategory from './DashboardCategory'
import DashboardAd from './DashboardAd'
import { AntDesign } from '@expo/vector-icons';
import { Colors } from 'react-native-ui-lib'
import db from '../../../db';


export default function DashboardScreen() {

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      // @ts-expect-error
      headerLeft: () => (<MenuIcon />)
    });
  });

  const [categories, setCategories] = useState([])
  useEffect(() => db.Categories.listenAll(setCategories), [])

  const [ads, setAds] = useState([])
  useEffect(() => db.Ads.listenAll(setAds), [])

 
  const catCarousel = createRef();
  const adCarousel = createRef();

  return (
    <ScrollView style={{ flex: 1 }}
    >
      <View style={styles.container}>
        
        {/* Categories */}
        <Text text60 style={{ marginTop: 30, marginBottom: 10, color: Colors.primary }}>Categories</Text>
        <Card
          row
          enableShadow
          style={styles.card}
        >
          <Carousel
            ref={catCarousel}
            pageControlProps={{
              size: 8,
              enlargeActive: true,
              onPagePress: page => catCarousel.current.goToPage(page)
            }}
            pageControlPosition={Carousel.pageControlPositions.UNDER}
          >
            {
              categories.map(category =>
                <DashboardCategory key={category.id} category={category} />
              )
            }

          </Carousel>
        </Card>

        {/* Ads */}
        <Text text60 style={{ marginTop: 20, marginBottom: 10, color: Colors.primary }}>Ads</Text>
        <Button size={Button.sizes.xSmall} onPress={() => navigation.navigate('AdForm', { screen: "AdForm" })}>
          <Text style={{color: 'white', margin: 5, fontWeight: 'bold'}}>Add</Text>
          <AntDesign name="pluscircle" size={25} color='white' style={{marginLeft: 4 }}/>
        </Button>
        <Card
          row
          enableShadow
          style={styles.card}
        >
          <Carousel
            ref={adCarousel}
            pageControlProps={{
              size: 8,
              enlargeActive: true,
              onPagePress: page => adCarousel.current.goToPage(page)
            }}
            pageWidth={300}
            pageControlPosition={Carousel.pageControlPositions.UNDER}
          >
            {
              ads.map(ad =>
                <DashboardAd key={ad.id} ad={ad} />
              )
            }
            {/* <View style={{ alignItems: 'center', marginTop: 65 }}>
              <AntDesign name="pluscircle" size={100}
                color={Colors.primary}
                onPress={() => navigation.navigate('AdForm', { screen: "AdForm" })}
              />
              <Text text40 style={{ marginTop: 20, color: Colors.primary }}>New Ad</Text>
            </View> */}

          </Carousel>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    width: '45%',
    borderRadius: 0
  },
  textAreaContainer: {
    width: 250,
    padding: 20,
    backgroundColor: Colors.grey60,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.grey40
  },
  input: {
    width: 250,
    padding: 8,
    paddingLeft: 20,
    backgroundColor: Colors.grey60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grey40
  },
  card: {
    padding: 20,
    margin: 5,
    width: '90%',
    borderWidth: 2,
    borderColor: 'lightgray',
    justifyContent: 'center'
  },
  cardimg: {
    width: 400,
    height: 120
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
