import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              DashboardScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              ActionsScreen: 'one',
            },
          },
          TabThree: {
            screens: {
              SettingsScreen: 'three',
            },
          },
          TabFour: {
            screens: {
              UserTrackingsScreen: 'four'
            },
          }
        },
      },
      NotFound: '*',
    },
  },
};
