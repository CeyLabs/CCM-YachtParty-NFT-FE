// MainMenu.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function MainMenu(props) {
  const { menuPosition, isAdmin, handleMenuItemClick } = props;
  const [activeItem, setActiveItem] = useState(useLocation().pathname);

  const isMenuItemActive = (path) => {
    return activeItem === path;
  };

  const handleClick = (path) => {
    setActiveItem(path);
    handleMenuItemClick();
  };

  let classNames = 'navbar-nav ms-auto mb-2 mb-lg-0 align-items-center';

  if (menuPosition !== 'desktop') {
    classNames = 'navbar-nav ms-auto mb-2 mb-lg-0 mobile align-items-left';
  }

  return (
    <ul className={classNames}>
      {/* <li className={`nav-item ${isMenuItemActive('/') ? 'active-class' : ''}`}>
        <Link
          className="nav-link"
          to="/"
          onClick={() => handleClick('/')}
        >
          Home
        </Link>
      </li> */}
      {/* <li className={`nav-item x-margin ${isMenuItemActive('/listing') ? 'active-class' : ''}`}>
        <Link
          className="nav-link"
          to="/listing"
          onClick={() => handleClick('/listing')}
        >
          Listing
        </Link>
      </li>
      <li className={`nav-item ${isMenuItemActive('/inventory') ? 'active-class' : ''}`}>
        <Link
          className="nav-link"
          to="/inventory"
          onClick={() => handleClick('/inventory')}
        >
          Inventory
        </Link>
      </li>
      <li className={`nav-item x-margin ${isMenuItemActive('/referral') ? 'active-class' : ''}`}>
        <Link
          className="nav-link"
          to="/referral"
          onClick={() => handleClick('/referral')}
        >
          Referral
        </Link>
      </li> */}
      {/* {isAdmin && (
        <li className={`nav-item ${isMenuItemActive('/admin') ? 'active-class' : ''}`}>
          <Link
            className="nav-link"
            to="/admin"
            onClick={() => handleClick('/admin')}
          >
            Admin
          </Link>
        </li>
      )} */}
    </ul>
  );
}

export default MainMenu;
