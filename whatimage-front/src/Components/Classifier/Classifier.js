import React, { Component } from 'react';
import { Alert, Button, Image, Spinner } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import './Classifier.css';
import axios from 'axios';


class Classifier extends React.Component {
    state = {
        files: [],
        isLoading: false,
        recentImage: null,
    }

    onDrop = (files) => {
        this.setState({
            files: [],
            isLoading: true,
            recentImage: null,
        })
        this.loadImage(files)
    }

    loadImage = (files) => {
        setTimeout(() => {
            this.setState({
                files: files,
                isLoading: false,
            }, () => {
                console.log(this.state.files)
            })
        }, 1000);
    }

    activateSpinner = () => {
        this.setState({
            isLoading: true,
            files: []
        })
    }

    deactivateSpinner = () => {
        this.setState({
            isLoading: false
        })
    }

    sendImage = () => {
        this.activateSpinner()
        let formData = new FormData()
        formData.append('picture', this.state.files[0], this.state.files[0].name)
        axios.post('http://localhost:8000/api/images/', formData, {
            headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data'
            }
        })
        .then(res => {
            this.getImageClass(res)
            console.log(res)
        })
        .catch(err => {
            console.log('Error Message Here: ' + err)
        })
    }

    getImageClass = (obj) => {
        axios.get(`http://localhost:8000/api/images/${obj.data.id}/`, {
            headers: {
                'accept': 'application/json'
            }
        })
        .then(res => {
            this.setState({recentImage: res})
            console.log(res)
        })
        .catch(err => {
            console.log('Error Message Here: ' + err)
        })
        this.deactivateSpinner()
    }

    render() {
        const files = this.state.files.map(file => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
        ));         
        return (
            <Dropzone onDrop={this.onDrop} accept="image/png, image/jpeg">
                {({isDragActive, getRootProps, getInputProps}) => (
                <section className="container">
                    <div {...getRootProps({className: 'dropzone back'})}>
                    <input {...getInputProps()} />
                    <i className="far fa-image mb-2 text-muted"/>
                    <p className="text-muted">{isDragActive ? "Drop some files" : "Drag 'n' drop some files here, or click to select files"}</p>
                    </div>
                    <aside>
                    <ul>{files}</ul>
                    </aside>

                    {this.state.files.length > 0 && 
                    <Button variant="info" size="lg" className="mt-3" onClick={this.sendImage}>Select Image</Button>
                    }              
                    {this.state.isLoading &&
                    <Spinner animation="border" role="status">
                        <span className="sr-only"></span>
                    </Spinner>
                    }
                    {this.state.recentImage &&
                        <React.Fragment>
                            <Alert variant="primary">{this.state.recentImage.data.classified}</Alert>
                            <Image className="justified-content-center classified-image" src={this.state.recentImage.data.picture} rounded/>
                        </React.Fragment>
                    }
                </section>
                )}
            </Dropzone>
        );
    }
}
 
export default Classifier;