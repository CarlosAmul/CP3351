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
import { BarChart, PieChart } from 'react-native-chart-kit'
import db from '../../db';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';


export default function DashboardScreen() {

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      // @ts-expect-error
      headerLeft: () => (<MenuIcon />)
    });
  });

  const tabRouter = ['purchases', 'likes']

  

  const [sensors, setSensors] = useState([])
  useEffect(() => db.Sensors.listenAll(setSensors), [categories])

  const [favs, setFavs] = useState([])
  useEffect(() => db.Categories.Favorites.listenToAllFavs(setFavs), [categories])

  const [categories, setCategories] = useState([])
  useEffect(() => db.Categories.listenAll(setCategories), [])

  const [ads, setAds] = useState([])
  useEffect(() => db.Ads.listenAll(setAds), [])

  const [filter, setFilter] = useState('purchases')

  const [colors, setColors] = useState([])
  useEffect(() => setColors(categories.map(getRandomColor)), [categories])

  const [buyData, setBuyData] = useState([])
  useEffect(() => setBuyData(categories.map(reformatBuyData)), [colors])
  useEffect(() => setBuyData(categories.map(reformatBuyData)), [categories])
  useEffect(() => setBuyData(categories.map(reformatBuyData)), [sensors])

  const [likeData, setLikeData] = useState([])
  useEffect(() => setLikeData(categories.map(reformatLikeData)), [colors])
  useEffect(() => setLikeData(categories.map(reformatLikeData)), [categories])
  useEffect(() => setLikeData(categories.map(reformatLikeData)), [favs])
 
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const reformatBuyData = (category) => {
    const color = colors[categories.indexOf(category)]
    return {
      name: `(${category.name})`,
      data: sensors.filter(sensor => sensor.categoryid == category.id).length,
      color: color,
      legendFontColor: color,
      legendFontSize: 15
    }
  }

  const reformatLikeData = (category) => {
    const color = colors[categories.indexOf(category)]
    return {
      name: `(${category.name})`,
      data: favs.filter(sensor => sensor.parentId == category.id).length,
      color: color,
      legendFontColor: color,
      legendFontSize: 15
    }
  }

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
          {
            categories.length > 0 ?
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
              :
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Image
                  cover
                  source={{ uri: 'https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' }}
                />
                <Text text60>
                  Loading...
                </Text>
              </View>
          }


        </Card>


        {/* Statistics */}
        <Text text60 style={{ marginTop: 30, marginBottom: 10, color: Colors.primary }}>Statistics</Text>
        <TabBar
          onTabSelected={(value) => setFilter(tabRouter[value])}
          enableShadow
          containerWidth={345}
        >
          <TabBar.Item
            label="Purchases"
            selectedLabelStyle={{ color: Colors.primary, fontWeight: "bold" }}
          />
          <TabBar.Item
            label="Likes"
            selectedLabelStyle={{ color: Colors.primary, fontWeight: "bold" }}
          />
        </TabBar>
        <Card
          row
          enableShadow
          style={styles.card}
        >
          {/* <BarChart
            data={
              {
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                  {
                    data: [20, 45, 28, 80, 99, 43],
                    strokeWidth: 10 // optional
                  }
                ],
                legend: ["Rainy Days"] // optional
              }
            }
            width={300}
            height={220}
            chartConfig={{
              backgroundGradientFrom: "white",
              backgroundGradientTo: "white",
              color: (opacity = 1) => Colors.primary,
              strokeWidth: 2, // optional, default 3
              barPercentage: 0.5
            }}
            verticalLabelRotation={0}
          /> */}
          {
            likeData.length > 0 || buyData.length > 0 || colors.length > 0 ?
              <PieChart
              data={ filter == 'purchases' ? buyData : likeData }
              width={350}
              height={200}
              chartConfig={{
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
              }}
              accessor={"data"}
              backgroundColor={"transparent"}
              paddingLeft={"5"}
              center={[0, 15]}
              absolute
            />
            :
            undefined
          }
          
        </Card>


        {/* Ads */}
        <Text text60 style={{ marginTop: 20, marginBottom: 10, color: Colors.primary }}>Ads</Text>
        <Button size={Button.sizes.xSmall} onPress={() => navigation.navigate('AdForm', { screen: "AdForm" })}>
          <Text style={{ color: 'white', margin: 5, fontWeight: 'bold' }}>Add</Text>
          <AntDesign name="pluscircle" size={25} color='white' style={{ marginLeft: 4 }} />
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
              ads.length > 0 ?
                ads.map(ad =>
                  <DashboardAd key={ad.id} ad={ad} />
                )
                :
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <Image
                    cover
                    source={{ uri: 'https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' }}
                  />
                  <Text text60>
                    Loading...
              </Text>
                </View>
            }

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
