import { observer } from "mobx-react-lite"
import React, { FC, useContext, useEffect, useState } from "react"
import { Context } from "../..";
import s from "./ListComponent.module.css"

interface IListItem {
    _id: string,
    text: string
}

const ListComponent: FC = () => {
    const { store } = useContext(Context);
    const [text, setText] = useState<string>('');
    const [list, setList] = useState<IListItem[]>([]);
    const [validation, setValidation] = useState(false)

    useEffect(() => {
        store.getPosts(store.user.id).then(posts => setList(posts))
    }, [])

    const addPost = async () => {
        if (!text.length) {
            setValidation(true)
            return;
        }
        setValidation(false)
        await store.post(text, store.user.id)
        const posts = await store.getPosts(store.user.id)
        setList(posts)
        setText('')
    }
    const deletePost = async (id: string) => {
        await store.deletePost(id)
        const posts = await store.getPosts(store.user.id)
        setList(posts)
    }
    return (
        <div className={s.listContainer}>
            <div className={s.listContentContainer} >
                <div className={s.listContent}>
                    <div style={{paddingTop:'10px'}} >
                        <input
                            onChange={e => setText(e.target.value)}
                            value={text}
                            type="text"
                            placeholder={validation ? 'Enter some text' : 'Type something'}
                        />
                    </div>
                    <div>
                        <button className={s.addPostButton} onClick={addPost}>Add Post</button>
                    </div>
                    <div style={{ overflow: 'scroll', height:'245px' }} >
                        {list.map(el => <div className={s.postItem} key={el._id} ><p className={s.paragraph}>{el.text}</p>
                            <button onClick={() => deletePost(el._id)}>Delete</button>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(ListComponent)
