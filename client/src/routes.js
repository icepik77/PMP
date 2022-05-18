import React from "react"
import {Routes, Route, Router} from 'react-router-dom';
import {AuthenticationPage} from "./pages/auth";
import {RegistrPage} from "./pages/registr";

export const useRouter = function(){
    return(
        <Router>
            <Routes>
                <Route path = "/registr">
                    <RegistrPage/>
                </Route>
                <Route path = "/auth">
                    <AuthenticationPage/>
                </Route>
            </Routes>
        </Router>
    )
}
