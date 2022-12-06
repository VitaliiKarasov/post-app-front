import { observer } from "mobx-react-lite";
import { FC, useEffect, useMemo } from "react";
import ReactDOM from "react-dom"

type Props = {
    children: JSX.Element
}

const Portal: FC<Props> = ({children}) => {
    const parentEl = document.getElementById('modal');
    console.log(parentEl);
    

    const el = useMemo(()=>document.createElement('div'),[])

    useEffect(()=>{
        parentEl?.appendChild(el)

        return () => {
            parentEl?.removeChild(el)
        }
    })
    return ReactDOM.createPortal(children, el)
}


export default observer(Portal)