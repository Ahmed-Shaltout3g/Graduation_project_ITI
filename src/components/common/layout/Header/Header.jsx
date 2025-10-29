import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { MdSchool, MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import styles from "./Header.module.css";

export default function Header() {
    const { user, logoutUser } = useAuth();
    const userName = localStorage.getItem("userName") || (user && user.name);

    return (
        <Navbar expand="lg" variant="dark" fixed="top" className={`py-3 shadow-sm ${styles.mainColor}`}>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold text-info">
                    <MdSchool size={28} className="me-2 text-info" />
                    UniSupply
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar">
                    <MdMenu className="text-light" />
                </Navbar.Toggle>

                <Navbar.Collapse id="main-navbar">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/" className="text-light mx-2">Home</Nav.Link>
                        <Nav.Link as={Link} to="/product" className="text-light mx-2">Products</Nav.Link>
                        <Nav.Link as={Link} to="/aboutus" className="text-light mx-2">About Us</Nav.Link>
                    </Nav>

                    <div className="d-flex align-items-center">
                        {userName ? (
                            <>
                                <span className="text-light me-3">Hello, {userName}</span>
                                <Button variant="outline-info" onClick={logoutUser}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    <Button variant="outline-info" className={`me-2 text-light border-info ${styles.btnOutlineInfo}`}>Log in</Button>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register">
                                    <Button variant="outline-info" className={`me-2 text-light border-info ${styles.btnOutlineInfo}`}>Register</Button>
                                </Nav.Link>
                            </>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
