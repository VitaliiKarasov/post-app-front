import { observer } from "mobx-react-lite"
import { FC, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "..";
import AuthContainer from "../components/AuthContainer/AuthContainer";



const Register: FC = () => { 
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const handleRegistration = (email:string, password: string) => {
      store.registration(email, password)
      navigate('/login')
    }

    return (
        <div>
            {store.isAuth ? <Navigate to='/'/> : null}
            <AuthContainer onSubmit={handleRegistration} pageName={'Register'}/>
        </div>
    )
}


export default observer (Register);