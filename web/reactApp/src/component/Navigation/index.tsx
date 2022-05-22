import { Container, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import { Link } from "react-router-dom";

export default function Navigation() {

    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to={"/"}>Voyages</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/allFlights">All Flights</Nav.Link>
                        <Nav.Link as={Link} to="/myFlights">My Flights</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}