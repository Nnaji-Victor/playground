import React from 'react';

const AnimatingContext = React.createContext();
AnimatingContext.displayName = "AnimatingContext";

const AnimatingProvider = (props) => {
    const [animating, setAnimating] = React.useState(false);
    const value = [animating, setAnimating];

    return (
        <AnimatingContext.Provider value={value} {...props}/>
    )
}

const useAnimating = () => {
    const context = React.useContext(AnimatingContext);
    if(context === undefined){
        throw new Error(`useAnimating must be used within a AnimatingProvider Context`)
    }
    return context;
}


export {AnimatingProvider, useAnimating}