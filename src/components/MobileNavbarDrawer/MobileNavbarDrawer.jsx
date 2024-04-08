// MobileNavbarDrawer.js
import React from 'react'
import MainMenu from '../navbar/MainMenu';

function MobileNavbarDrawer(props) {
    const { isVisible, menuPosition, isAdmin, setIsDrawerVisible } = props

    const drawerMenuClass = isVisible ? 'menu-wrapper show-menu' : 'menu-wrapper'

    const handleMenuItemClick = () => {
        setIsDrawerVisible(false);
    };

    return (
        <div className={drawerMenuClass}>
            <MainMenu menuPosition={menuPosition} isAdmin={isAdmin} handleMenuItemClick={handleMenuItemClick} />
        </div>
    )
}

export default MobileNavbarDrawer
