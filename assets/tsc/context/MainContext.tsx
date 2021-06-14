import React, { useState, createContext, FC } from 'react';

export let Content = {
    values: {
        main: {
            Login: null,
            Session: null
        }
    }
}

export const MainContext = createContext(Content.values);

export const MainContextProvider: FC<any> = ({children}) => {
    let [login, setLogin ] = useState(false);
    let [session, setSession ] = useState(null);

    Content.values = {
        main: {
            get Session(): any {
                return session
            },
            set Session(session: any){
                setSession(session)
            },
            get Login(): any {
                return login
            },
            set Login(state: any){
                setLogin(state);
            }
        }
    }

    return (
        <MainContext.Provider value={Content.values}>
            {children}
        </MainContext.Provider>
    );
}