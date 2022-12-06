import { observer } from "mobx-react-lite"
import { Dispatch, FC, SetStateAction, useContext, useState } from "react"
import { Context } from "../..";
import s from "./ChangePass.module.css";

type Props = {
    handleModal:(state:boolean)=>void
}

const ChangePass: FC<Props> = ({handleModal}) => {
    const {store} = useContext(Context);
    const [password, setPassword] = useState<any>('');
    const [validation, setValidation] = useState(false)

    const changePass = async () => {
        if(!password.length){
            setValidation(true)
            return;
        }
        await store.changePassword(store.user.id, password)
        setValidation(false)
        handleModal(false)
        setPassword('')
    }

    return (
        <div className={s.changePassStyle}>

            <input
            type="password" 
            onChange = {e => setPassword(e.target.value)}
            value={password}
            placeholder = { validation ? 'Enter new password' : 'Type new password' }
            />
            <button onClick={changePass}>Change password</button>
        </div>
    )

}

export default observer(ChangePass)