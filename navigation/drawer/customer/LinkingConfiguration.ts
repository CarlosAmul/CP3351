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
        },
      },
      NotFound: '*',
    },
  },
};
