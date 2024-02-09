import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Carousel, Form } from 'react-bootstrap'

function Panel() {
    const [posts, setPosts] = useState([])
    const [galleries, setGalleries] = useState([])

    const [gallery, setGallery] = useState([])
    const [galleryMessage, setGalleryMessage] = useState('')
    const [header, setHeader] = useState('')
    const [headerMessage, setHeaderMessage] = useState('')
    const [post, setPost] = useState('')
    const [postMessage, setPostMessage] = useState('')

    const fileInputRef = useRef(null)

    useEffect(() => {
        axios.get("./postsapi").then(response => {
            setPosts(response.data)
        }).catch(err => console.log(`Get posts error: ${err}`))

        axios.get("./galleriesapi").then(response => {
            setGalleries(response.data)
        }).catch(err => console.log(`Get gallery error: ${err}`))
    }, [])

    const MakePost = (e) => {
        e.preventDefault()
        if (!gallery.length || !header || !post) {
            if (!gallery.length) {
                setGalleryMessage('The gallery field is required')
            } else {
                setGalleryMessage('')
            }
            if (!header) {
                setHeaderMessage('The header field is required.')
            } else {
                setHeaderMessage('')
            }
            if (!post) {
                setPostMessage('The post field is required.')
            } else {
                setPostMessage('')
            }
        } else {
            setHeaderMessage('')
            setPostMessage('')

            const formData = new FormData()
            formData.append("header", header)
            formData.append("post", post)
            for (let i = 0; i < gallery.length; i++) {
                const element = gallery[i];
                formData.append("gallery[]", element)
            }
            axios.post('./makepost', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-CSRF-TOKEN": document.head.querySelector('meta[name="csrf-token"]').content
                }
            }).then(response => {
                if (response.data) {
                    console.log(response.data)
                } else {
                    if (fileInputRef.current.value) {
                        fileInputRef.current.value = ''
                    }
                    setHeader('')
                    setPost('')
                    axios.get("./postsapi").then(response => {
                        setPosts(response.data)
                    }).catch(err => console.log(`Get posts error: ${err}`))

                    axios.get("./galleriesapi").then(response => {
                        setGalleries(response.data)
                    }).catch(err => console.log(`Get gallery error: ${err}`))
                }
            }).catch(err => console.log(`Make post error: ${err}`))
        }
    }

    const DeletePost = (id) => {
        const formData = new FormData()
        formData.append("id", id)
        axios.post("./deletepost", formData, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.data) {
                console.log(response.data)
            } else {
                axios.get("./postsapi").then(response => {
                    setPosts(response.data)
                }).catch(err => console.log(`Get posts error: ${err}`))

                axios.get("./galleriesapi").then(response => {
                    setGalleries(response.data)
                }).catch(err => console.log(`Get gallery error: ${err}`))
            }
        }).catch(err => console.log(`Delete post error: ${err}`))
    }

    return (
        <div>
            <form onSubmit={MakePost}>
                <Form.Group className='mb-3'>
                    <label htmlFor="gallery" className='form-label'>Gallery</label>
                    <input type="file" className='form-control' id="gallery" onChange={e => setGallery(e.target.files)} ref={fileInputRef} accept='image/*' multiple />
                    <b>{galleryMessage}</b>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <label htmlFor="header" className='form-label'>Header</label>
                    <textarea id="header" className='form-control' rows="10" value={header} onChange={e => setHeader(e.target.value)}></textarea>
                    <b>{headerMessage}</b>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <label htmlFor="post" className='form-label'>Post</label>
                    <textarea id="post" className='form-control' rows="10" value={post} onChange={e => setPost(e.target.value)}></textarea>
                    <b>{postMessage}</b>
                </Form.Group>
                <button className='btn btn-success'>Submit</button>
            </form>
            <hr />
            {
                (posts.length) ? (
                    posts.map(post => (
                        <div className="post" key={`postkey${post.id}`}>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <b>{post.header}</b>
                                </div>
                                <div>
                                    <button onClick={() => DeletePost(post.id)} className='btn btn-danger'>X</button>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <b>{post.post}</b>
                            </div>
                            <div>
                                {
                                    (galleries.filter(file => file.postid === post.id).length > 1) ? (
                                        <Carousel interval={null}>
                                            {
                                                galleries.filter(file => file.postid === post.id).map(file => (
                                                    <Carousel.Item key={`filekey${file.id}`}>
                                                        <center>
                                                            <img src={`./gallery/${file.name}`} alt={file.name} />
                                                        </center>
                                                    </Carousel.Item>
                                                ))
                                            }
                                        </Carousel>
                                    ) : (
                                        galleries.filter(file => file.postid === post.id).map(file => (
                                            <div key={`filekey${file.id}`}>
                                                <center>
                                                    <img src={`./gallery/${file.name}`} alt={file.name} />
                                                </center>
                                            </div>
                                        ))
                                    )
                                }
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="text-center">Posts don't exist.</h1>
                )
            }
        </div>
    )
}

export default Panel
