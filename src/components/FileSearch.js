import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import useKeyPress from '../hooks/useKeyPress'

const FileSearch = ({ title, onFileSearch }) => {
    const [inputActive, setinputActive ] = useState(false)
    const [ value, setValue] = useState('')
    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)
    let node = useRef(null)

    const closeSearch = () => {
        // e.preventDefault()
        setinputActive(false)
        setValue('')
    }
    useEffect(() => {
        if (enterPressed && inputActive) {
            onFileSearch(value)
        }
        if (escPressed && inputActive) {
            closeSearch()
        }
        // const handleInputEvent = (event) => {
        //     const { keyCode } = event
        //     if(keyCode === 13 && inputActive) {
        //         onFileSearch(value)
        //     }else if(keyCode === 27 && inputActive) {
        //         closeSearch(event)
        //     }
        // }
        // document.addEventListener('keyup', handleInputEvent)
        // return () => {
        //     document.removeEventListener('keyup', handleInputEvent)
        // }
    })
    useEffect(() => {
        if(inputActive){
            node.current.focus()
        }
        
    }, [inputActive])

    return(
        <div className="alert alert-primary">
            { !inputActive &&
                <div className="row menu d-flex align-items-center">
                    <span className="col-8">{title}</span>
                    <button 
                        type="button" 
                        className="icon-btn col-4" 
                        onClick={() => {setinputActive(true)}}
                    >
                    <FontAwesomeIcon title="搜索" size="lg" icon={faSearch} />
                    </button>
                </div>
            }
            {
                inputActive &&
                <div className="row menu d-flex align-items-center">
                    <input
                        className = "form-control col-8"
                        value = {value}
                        ref={node}
                        onChange={(e) => {setValue(e.target.value)}}
                    />
                    <button 
                        type="button" 
                        className="icon-btn col-4" 
                        onClick={() => {closeSearch()}}
                    >
                        <FontAwesomeIcon title="关闭" size="lg" icon={faTimes} />
                    </button>
                </div>
            }
        </div>
    )
}


FileSearch.prototype = {
    title: PropTypes.string,
    onFileSearch: PropTypes.func.isRequired
}

FileSearch.defaultProps = {
    title: '我的云文档'

}

export default FileSearch