import React, { Component } from 'react';
import axios from 'axios';
import { Button, Spinner } from 'react-bootstrap';
import Image from './Image.js';

class ImageList extends React.Component {
    state = {
        images: [],
        visible: 2,
        isLoading: true,
        newLoaded: false,
    }

    componentDidMount() {
        setTimeout(this.getImages, 1500)
    }

    getImages = () => {
        axios.get('http://localhost:8000/api/images/', {
            headers: {
                'accept': 'application/json'
            }
        }).then(resp => {
            this.setState({images: resp.data})
            console.log(resp)
        }) 
        this.setState({isLoading: false})
    }

    handleVisible = () => {
        const visible = this.state.visible
        const new_visible = visible + 2
        this.setState({newLoaded: true})
        setTimeout(() => {
            this.setState({
                visible: new_visible,
                newLoaded: false
            })
        }, 300);
    }

    render() {
        const images = this.state.images.slice(0, this.state.visible).map(image => {
            return <Image key={image.id} pic={image.picture} name={image.classified} />
        }) 
        return (
            <div>
                <h1>Image List here</h1>
                {this.state.isLoading ?
                    <Spinner animation="border" role="status">
                        <span className="sr-only"></span>
                    </Spinner>
                :
                <React.Fragment>  
                    {this.state.images.length === 0 && 
                        <h3>No Images Classified!</h3>
                    }  
                    {images}
                    {this.state.newLoaded &&
                        <Spinner animation="border" role="status">
                            <span className="sr-only"></span>
                        </Spinner>
                    }
                    <br></br>
                    {((this.state.images.length > 0) && (this.state.images.length <= this.state.visible)) &&
                    <h3>No More Images To Load</h3>
                    }
                    {((this.state.images.length > 0) && (this.state.images.length > this.state.visible)) &&
                    <Button variant="primary" size="lg" onClick={this.handleVisible}>Load more</Button>
                    }
                </React.Fragment>
                }
            </div>
        );
    }
}
 
export default ImageList;