import {
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
} from '@mdi/js'
import { MenuNavBarItem } from './interfaces'

const menuNavBar: MenuNavBarItem[] = [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'Профиль',
        href: '/profile',
      },
      {
        icon: mdiEmail,
        label: 'Сообщения',
        href: '/message'
      },
      {
        isDivider: true,
      },
      {
        icon: mdiLogout,
        label: 'Выйти',
        isLogout: true,
      },
    ],
  }
]

export default menuNavBar
