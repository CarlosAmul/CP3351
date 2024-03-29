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
              AdForm: 'two'
            },
          },
          TabTwo: {
            screens: {
              ActionsScreen: 'one',
            },
          },
          TabThree: {
            screens: {
              SettingsScreen: 'one',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
