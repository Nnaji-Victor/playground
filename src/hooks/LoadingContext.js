import React from 'react';

const LoadContext = React.createContext();
LoadContext.displayName = "LoadContext";

const LoadingProvider = (props) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const value = [isLoading, setIsLoading];

    return (
        <LoadContext.Provider value={value} {...props}/>
    )
}

const useLoader = () => {
    const context = React.useContext(LoadContext);
    if(context === undefined){
        throw new Error(`useLoader must be used within a LoadingProvider Context`)
    }
    return context;
}


export {LoadingProvider, useLoader}