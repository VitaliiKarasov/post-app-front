import { observer } from "mobx-react-lite"
import { FC, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "..";
import ListComponent from "../components/ListComponent/ListComponent";

const Home: FC = () => {

    const { store } = useContext(Context)
   

    return (
        <div>
            {!store.isAuth ? <Navigate to={'/login'} /> : (
                <>
                    <ListComponent />
                </>
            )}
        </div>
    )
}

export default observer(Home);