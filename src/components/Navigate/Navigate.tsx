import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../..';
import ChangePass from '../ChangePass/ChangePass';
import Portal from '../Portal';
import s from './Navigate.module.css'


const Navigate: FC = () => {
    const location = useLocation()
    const [isModalOpen, setModalOpen] = useState(false)

    const { store } = useContext(Context);

    return (
        <>



            {store.isAuth ? (
                <div className={s.navLink}>
                    <div className={s.linkFlexContainer}>
                        <Link className={s.link} to='login' onClick={() => store.logout()}>Logout</Link>
                        {isModalOpen ? <Portal>
                            <div style={{
                                position: 'fixed',
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                                backgroundColor: 'rgba(51, 51, 51, 0.3)',
                                backdropFilter: 'blur(1px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 1,
                            }} >
                                <div className={s.modal} >
                                    <ChangePass handleModal={setModalOpen} />
                                    <button className={s.closeButton} onClick={() => { setModalOpen(false) }}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </Portal> : null}
                        <div>
                            <button className={s.changePasswordBtn} onClick={() => { setModalOpen(true) }}>Change Password</button>
                            <Link className={s.link} to='login' onClick={() => store.deleteUser(store.user.id)}>Delete Account</Link>
                        </div>
                    </div>
                </div>
            ) : null
            }
        </>
    )
}
export default observer(Navigate);