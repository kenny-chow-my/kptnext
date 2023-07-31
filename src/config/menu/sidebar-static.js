const sidebarMenu = () => [
  {
    name: 'Translations',
    menuItems: [
       {
        name: 'New Translation',
        path: `/translate`,
      },
      {
        name: 'History',
        path: `/history`,
      },
    ],
  },
  {
    name: 'Account',
    menuItems: [
      {
        name: 'Clear History',
        path: `/deletehistory`,
      },
      {
        name: 'Settings',
        path: `/account/settings`,
      },
    ],
  },
];

export default sidebarMenu;
