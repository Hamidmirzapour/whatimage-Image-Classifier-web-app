import React, { Component } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

class Navigation extends React.Component {
    render() { 
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Image Classifier</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/list">History</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}
 
export default Navigation;