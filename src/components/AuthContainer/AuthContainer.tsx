import { observer } from 'mobx-react-lite';
import React, {FC, useContext, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../..';
import s from './AuthContainer.module.css';

interface PropsI {
    onSubmit: (email: string, password: string) => void,
    pageName: string
}

const LoginForm: FC<PropsI> = ({onSubmit, pageName}:PropsI) => { 
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);
    const location = useLocation()

    

    return (
        <>
        <div className={s.loginForm}>
            <div className={s.content}>
            <input 
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Email"
            />

            <input 
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            />
            <button className={s.authButtons} onClick={() => onSubmit(email, password)}>
                {pageName}
                </button>
                {!store.isAuth ? <div className={s.linkContainer}>
                    {location.pathname === '/login' ? <Link to='/register'>
                       Don't have an account?
                    </Link>
                        : null}
                    {location.pathname === '/register' ? <Link to='/login'>
                        Already have an account?
                    </Link>
                        : null}
                </div>
            : null
        }

            </div>


    
        </div>
        </>
    )
}
export default observer(LoginForm);