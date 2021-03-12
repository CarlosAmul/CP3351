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
              NotificationsScreen: 'four',
            },
          },
          TabFive: {
            screens: {
              FAQsScreen: 'five',
            },
          },
          TabSix: {
            screens: {
              PendingFAQsScreen: 'five',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
