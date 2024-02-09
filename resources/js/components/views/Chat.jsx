import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Chat() {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        axios.get("./chatapi").then(response => {
            setMessages(response.data)
        }).catch(err => console.log(err))
    }, [])

    const DeleteMessage = (id) => {
        const formData = new FormData()
        formData.append("id", id)
        axios.post("./deletemessage", formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.data) {
                console.log(response.data)
            } else {
                axios.get("./chatapi").then(response => {
                    setMessages(response.data)
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
    }
    return (
        <div>
            {
                (messages.length) ? (
                    messages.map(message => (
                        <div className="post" key={message.id}>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <b>Name: {message.sendername}</b>
                                </div>
                                <div>
                                    <button className="btn btn-danger" onClick={() => DeleteMessage(message.id)}>X</button>
                                </div>
                            </div>
                            <div>
                                <b>Email: {message.senderemail}</b>
                            </div>
                            <div>
                                <b>Header: {message.header}</b>
                            </div>
                            <div>
                                <b>Message: {message.message}</b>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="text-center">Messages don't exist.</h1>
                )
            }
        </div>
    )
}

export default Chat
