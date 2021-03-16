import React, { useState, useEffect } from 'react';
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

  const [newAd, setNewAd] = useState(false)

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>

        {/* Categories */}
        <Text text60 style={{ marginTop: 30, marginBottom: 10, color: Colors.primary }}>Categories</Text>
        <Card
          row
          enableShadow
          style={styles.card}
        >
          <Carousel
            pageControlProps={{
              size: 8
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
        <Card
          row
          enableShadow
          style={styles.card}
        >
          <Carousel
            pageControlProps={{
              size: 8
            }}
            pageControlPosition={Carousel.pageControlPositions.UNDER}
          >
            {
              ads.map(ad =>
                <DashboardAd key={ad.id} ad={ad} />
              )
            }
            {
              newAd ?
                <View style={{ alignItems: 'center' }}>
                  <Text text70 style={{ color: Colors.primary, marginBottom: 10 }}>Title</Text>
                  <TextInput style={styles.input} placeholder='Enter title here...' />
                  <Text text70 style={{ color: Colors.primary, marginTop: 10 }}>Description</Text>
                  <View style={[styles.textAreaContainer, { margin: 10, height: 150 }] }>
                    <TextArea
                      style={{ marginBottom: 20 }}
                      placeholder="Enter description here.."
                    />
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button
                      backgroundColor={Colors.primary}
                      label="Submit"
                      labelStyle={{ fontWeight: '100' }}
                      style={{ borderRadius: 5 }}
                      enableShadow
                      onPress={() => setNewAd(false)}
                    />
                    <Button
                      backgroundColor={Colors.primary}
                      label="Cancel"
                      labelStyle={{ fontWeight: '100' }}
                      style={{ borderRadius: 5 }}
                      enableShadow
                      onPress={() => setNewAd(false)}
                    />
                  </View>
                </View>
                :
                <View style={{ alignItems: 'center', marginTop: 65 }}>
                  <AntDesign name="pluscircle" size={100} color={Colors.primary} onPress={() => setNewAd(true)} />
                  <Text text40 style={{ marginTop: 20, color: Colors.primary }}>New Ad</Text>
                </View>
            }

            {/* <View style={{ alignItems: 'center' }}>
              <View>
                <Image
                  cover
                  style={{ alignSelf: 'center', borderRadius: 10 }}
                  source={{ uri: 'https://www.sekkeistudio.com/blog/wp-content/uploads/2015/05/big1.jpg' }}
                />
              </View>
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text text70 >Time set</Text>
                <Text text80>1/3/2021-1/4/2021</Text>
                <Text text70>URL</Text>
                <Text text80>??</Text>
              </View>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View>
                <Image
                  cover
                  style={{ alignSelf: 'center', borderRadius: 10 }}
                  source={{ uri: 'https://adpitch.files.wordpress.com/2011/05/hp.jpg' }}
                />
              </View>
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text text70>Time set</Text>
                <Text text80>1/3/2021-1/4/2021</Text>
                <Text text70>URL</Text>
                <Text text80>??</Text>
              </View>
            </View> */}

          </Carousel>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
