import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        path: '/',
        screens: {
          Home: 'home',
          People: {
            path: 'person',
            screens:{
              ViewPeople: 'view-all',
              ViewPerson: 'view',
              EditPerson: 'edit',
            }
          },
          AddPerson: 'person/add',
          Help: 'help',
        },
      },
      NotFound: '*', // catch-all route (404 resource not found)
    },
  },
};
