export interface NavItem {
  label: string
  href: string
  serviceId?: string
}

export interface NavColumn {
  heading: string
  items: NavItem[]
}

export interface NavGroup {
  label: string
  href?: string
  columns?: NavColumn[]
}

export const navItems: NavGroup[] = [
  {
    label: 'About Us',
    columns: [
      {
        heading: 'About Us',
        items: [
          { label: 'About Us',  href: '/about'     },
          { label: 'Blog',      href: '/blog'       },
          { label: 'Newsroom',  href: '/newsroom'   },
          { label: 'Partners',  href: '/partners'   },
        ],
      },
    ],
  },
  {
    label: 'Our Businesses',
    columns: [
      {
        heading: 'Business',
        items: [
          { label: 'Call Centre',       href: '/businesses/call-centre'       },
          { label: 'Imports',           href: '/businesses/imports'           },
          { label: 'IT Infrastructure', href: '/businesses/it-infrastructure' },
          { label: 'Supply Chain',      href: '/businesses/supply-chain'      },
          { label: 'Travel',            href: '/businesses/travel'            },
        ],
      },
      {
        heading: 'Companies',
        items: [
          { label: 'EG Digital Australia', href: '/companies/eg-digital'     },
          { label: 'EG Foundations',       href: '/companies/eg-foundations' },
          { label: 'EG Imports',           href: '/companies/eg-imports'     },
          { label: 'EG Transport',         href: '/companies/eg-transport'   },
          { label: 'EG Travels',           href: '/companies/eg-travels'     },
        ],
      },
    ],
  },
  {
    label: 'Sustainability',
    columns: [
      {
        heading: 'Sustainability',
        items: [
          { label: 'Environmental Responsibility', href: '/sustainability/environment' },
          { label: 'Sustainability Initiatives',   href: '/sustainability/initiatives' },
          { label: 'Reports & Updates',            href: '/sustainability/reports'     },
        ],
      },
    ],
  },
  { label: 'Careers',    href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
]

export const loginItems: NavItem[] = [
  { label: 'Customer Login',  href: '#' },
  { label: 'Vendor Login',    href: '#' },
  { label: 'Employee Login',  href: '#' },
]
