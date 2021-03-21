import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              PublicHomeScreen: 'one',
              CategoryFavsScreen: 'five',
            },
          },
          TabTwo: {
            screens: {
              SettingsScreen: 'two',
            },
          },
          TabThree: {
            screens: {
              ActionsScreen: 'two',
            },
          },
          TabFour: {
            screens: {
              SensorsScreen: 'two',
            },
          },
          TabFive: {
            screens: {
              NotificationsScreen: 'five',
            },
          },
          TabSix: {
            screens: {
              FAQsScreen: 'six'
            },
          },
          TabSeven: {
            screens: {
              UserFavoritesScreen: 'two',
            },
          },
          TabEight: {
            screens: {
              InstallationsScreen: 'two',
            },
          },
          NotFound: '*',
        },
      },
    },
  }
}
