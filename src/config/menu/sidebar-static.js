const sidebarMenu = () => [
  {
    name: 'Translations',
    menuItems: [
      {
        name: 'New Translation',
        path: `/`,
      },
      {
        name: 'History',
        path: `/comingsoon`,
      },
    ],
  },
  {
    name: 'Account',
    menuItems: [
      {
        name: 'Clear History',
        path: `/comingsoon`,
      },
      {
        name: 'Settings',
        path: `/comingsoon`,
      },
    ],
  },
  {
    name: 'Help',
    menuItems: [
      {
        name: 'Support',
        path: `/support`,
      },
    ],
  },
];

export default sidebarMenu;
