import React from 'react';

const MenuContext = React.createContext();
MenuContext.displayName = "MenuContext";

const MenuProvider = (props) => {
    const [isOpen, setOpen] = React.useState(false);
    const value = [isOpen, setOpen];

    return (
        <MenuContext.Provider value={value} {...props}/>
    )
}

const useMenu = () => {
    const context = React.useContext(MenuContext);
    if(context === undefined){
        throw new Error(`useLoader must be used within a MenuProvider Context`)
    }
    return context;
}


export {MenuProvider, useMenu}