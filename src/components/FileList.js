import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types';
import useKeyPress from '../hooks/useKeyPress'

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
    const [ editStatus, setEditStatus ] = useState(0) // 最好设为0
    const [ value, setValue ] = useState('')
    const closeEdit = (e) => {
        // e.preventDefault()
        setEditStatus(-1)
        setValue('')
    }
    let node = useRef(null)
    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)

    useEffect(() => {
        if (enterPressed && editStatus) {
            console.log(editStatus)
            const editItem = files.find(file => file.id === editStatus)
            onSaveEdit(editItem.id, value)
            setEditStatus(false)
            setValue('')
        }
        if (escPressed && editStatus) {
            closeEdit()
        }
        // const handleInputEvent = (event) => {
        //     const { keyCode } = event
        //     if(keyCode === 13 && editStatus) {
        //         const editItem = files.find(file => file.id === editStatus)
        //         onSaveEdit(editItem.id, value)
        //         setEditStatus(false)
        //         setValue('')
        //     }else if(keyCode === 27 && editStatus) {
        //         closeEdit()
        //     }
        // }
        // document.addEventListener('keyup', handleInputEvent)
        // return () => {
        //     document.removeEventListener('keyup', handleInputEvent)
        // }
    })
    

    return (
        <ul className="list-group list-group-flush file-list">
            {
                files.map(file => (
                    <li
                    className="list-group-item bg-light row d-flex align-items-center file-item"
                    key={file.id}
                    >
                        
                        { (file.id !== editStatus) &&
                        <>
                            <span className="col-1"><FontAwesomeIcon title="编辑" icon={faMarkdown} /></span>
                            <span className="col-8 c-link">{file.title}</span>
                            <button 
                            type="button" 
                            className="icon-btn col-1" 
                            onClick={() => {setEditStatus(file.id); setValue(file.title)}}
                            >
                                <FontAwesomeIcon title="编辑" icon={faEdit} />
                            </button>
                            <button 
                            type="button" 
                            className="icon-btn col-1" 
                            onClick={() => {onFileDelete(file.id)}}
                            >
                                <FontAwesomeIcon title="删除" icon={faTrash} />
                            </button>
                        </>
                        }

                        { (file.id === editStatus) &&
                        <>
                            <div className="row menu d-flex align-items-center justify-content-between">
                                <input
                                    className = "form-control col-8"
                                    value={value}
                                    ref={node}
                                    placeholder="请输入文件名称"
                                    onChange={(e) => { setValue(e.target.value) }}
                                />
                                <button 
                                    type="button" 
                                    className="icon-btn col-4" 
                                    onClick={closeEdit}
                                >
                                    <FontAwesomeIcon title="关闭" size="lg" icon={faTimes} />
                                </button>
                            </div>
                        </>
                        }
                    </li>
                ))
            }
        </ul>
    )
}
FileList.prototype = {
    files: PropTypes.array,
    onFileClick: PropTypes.func,
    onFileDelete: PropTypes.func,
    onSaveEdit: PropTypes.func
}
export default FileList