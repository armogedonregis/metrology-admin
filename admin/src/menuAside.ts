import {
  mdiAccountCircleOutline,
  mdiViewDashboard,
  mdiMessage,
  mdiCalendar,
  mdiNoteTextOutline,
  mdiCardAccountDetailsOutline,
  mdiChartLine,
  mdiFileDocumentOutline,
  mdiCartOutline,
  mdiFileOutline,
  mdiTextBoxOutline,
  mdiShoppingOutline,
  mdiAccountMultiple,
  mdiChartPieOutline,
  mdiFaceAgent
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/',
    icon: mdiViewDashboard,
    label: 'Дашбоард',
  },
  {
    href: '/tables',
    label: 'Показатели',
    icon: mdiChartLine,
  },
  {
    href: '/calendar',
    label: 'Календарь',
    icon: mdiCalendar,
  },
  {
    href: '/message',
    label: 'Сообщения',
    icon: mdiMessage,
  },
  {
    href: '/note',
    label: 'Заметки',
    icon: mdiNoteTextOutline,
  },
  {
    href: '/orders',
    label: 'Ордеры',
    icon: mdiShoppingOutline,
  },
  {
    href: '/users',
    label: 'Клиенты',
    icon: mdiAccountMultiple ,
  },
  {
    href: '/support-chat',
    label: 'Support',
    icon: mdiFaceAgent,
  },
  {
    href: '/profile',
    label: 'Профиль',
    icon: mdiAccountCircleOutline,
  },
  {
    href: '/jobs',
    label: 'Должности',
    icon: mdiCardAccountDetailsOutline,
    role: 'admin'
  },
  {
    href: '/employees',
    label: 'Сотрудники',
    icon: mdiAccountMultiple,
    role: 'admin'
  },
  {
    href: '/page-management',
    label: 'Страницы',
    icon: mdiFileDocumentOutline,
    role: 'admin'
  },
  {
    href: '/graphic',
    label: 'График',
    icon: mdiChartPieOutline,
    role: 'admin'
  },
  {
    href: '/blog',
    label: 'Блоги',
    icon: mdiTextBoxOutline,
    role: 'admin'
  },
  {
    href: '/market-card',
    label: 'Маркет',
    icon: mdiCartOutline,
    role: 'admin'
  },
  {
    href: '/files-card',
    label: 'Файлы',
    icon: mdiFileOutline,
    role: 'admin'
  },
]

export default menuAside
