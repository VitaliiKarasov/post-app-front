import { observer } from "mobx-react-lite"
import { FC, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "..";
import AuthContainer from "../components/AuthContainer/AuthContainer";

const Login: FC = () => { 
    const {store} = useContext(Context);
    const navigate = useNavigate()

    const handleLogin = (email:string, password: string) => {
      store.login(email, password)
        navigate('/')
    }

    return (
        <div>
            {store.isAuth ? <Navigate to='/'/> : null}
            <AuthContainer onSubmit={handleLogin} pageName={'Login'}/>
        </div>
    )
}

export default observer(Login);