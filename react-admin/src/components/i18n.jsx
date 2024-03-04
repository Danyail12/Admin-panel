// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
      translation: {
        dashboard: 'Dashboard',
        users: 'Users',
        expert: 'Expert',
        products: 'Products',
        ebooks: 'EBooks',
        courses: 'Courses',
        coursesService: 'Courses',
        onlineInspection: 'Online inspection',
        onsiteInspection: 'Onsite inspection',
        profile: 'Profile',
        logout: 'Logout',
      },
      widgets: {
        user: 'Users',
        expert: 'Experts',
        earning: 'Earning',
        bookingSessions: 'Booking Sessions',
        onlineInspections: 'Online Inspections',
        onsiteInspections: 'Onsite Inspections',
        pocketGarrage: 'Pocket Garrage',
      },
    },
    de: {
      translation: {
        dashboard: 'Instrumententafel',
        users: 'Benutzer',
        expert: 'Experte',
        products: 'Produkte',
        ebooks: 'E-Books',
        courses: 'Kurse',
        coursesService: 'Kurse',
        onlineInspection: 'Online-Inspektion',
        onsiteInspection: 'Vor-Ort-Inspektion',
        profile: 'Profil',
        logout: 'Abmelden',
      },
      widgets: {
        user: 'Benutzer',
        Experts: 'Experten', // corrected from 'Experts'
        earning: 'Einnahmen',
        bookingSessions: 'Buchungssitzungen',
        onlineInspections: 'Online-Inspektionen',
        onsiteInspections: 'Vor-Ort-Inspektionen',
        pocketGarrage: 'Taschengarage',
      },
    },
  };
  
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
