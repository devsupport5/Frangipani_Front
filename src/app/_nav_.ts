import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Manage'
  },
  {
    name: 'Category',
    url: '/category/category',
    icon: 'icon-pencil'
  },{
    name: 'Sub Category',
    url: '/subcategory',
    icon: 'icon-pencil'
  },{
    name: 'Product',
    url: '/product',
    icon: 'icon-pencil'
  }
  ,{
    name: 'Authors',
    url: '/authors',
    icon: 'icon-pencil'
  },{
    name: 'Currency',
    url: '/currency',
    icon: 'icon-pencil'
  },{
    name: 'Order',
    url: '/order',
    icon: 'icon-pencil'
  },{
    name: 'Slider',
    url: '/slider',
    icon: 'icon-pencil'
  }
  
];
