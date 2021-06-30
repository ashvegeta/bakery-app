import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';
import * as BiIcons from 'react-icons/bi';

export const SidebarData = [
  {
    title: 'User',
    path: '/userinfo',
    icon: <BiIcons.BiUserCircle/>,
    cName: 'nav-text'
  },
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'About',
    path: '/about',
    icon: <AiIcons.AiFillInfoCircle/>,
    cName: 'nav-text'
  },
  {
    title: 'Contact Us',
    path: '/contact',
    icon: <AiIcons.AiFillContacts/>,
    cName: 'nav-text'
  },
  {
    title: 'Cart',
    path: '/cart',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },

  {
    title: 'Logout',
    path: '/logout',
    icon: <FiIcons.FiLogOut/>,
    cName: 'nav-text'
  }
];