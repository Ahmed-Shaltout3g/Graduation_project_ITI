import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { MdSchool, MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import styles from "./Header.module.css";

export default function Header({ links }) {
    const { user, logoutUser, token } = useAuth();
    const FirstName = localStorage.getItem("FirstName") || (user && user.name);

    const navLinks = links || [
        { label: "Home", path: "/" },
        { label: "Marketplace", path: "/marketplace" },
        { label: "About Us", path: "/aboutus" },

    ];

    return (
        <Navbar expand="lg" variant="dark" fixed="top" className={`py-3 shadow-sm ${styles.mainColor}`}>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold text-info">
                    <MdSchool size={28} className="me-2 text-info" />
                    Eagrely
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar">
                    <MdMenu className="text-light" />
                </Navbar.Toggle>

                <Navbar.Collapse id="main-navbar">
                    <Nav className="mx-auto">
                        {navLinks.map(link => (
                            <Nav.Link
                                as={Link}
                                to={link.path}
                                key={link.path}
                                className="text-light mx-2"
                            >
                                {link.label}
                            </Nav.Link>
                        ))}
                    </Nav>


                    <div className="d-flex align-items-center">
                        {token ? (
                            <>
                                <Nav.Link as={Link} to="/dashboard">
                                    <Button variant="outline-info" className={`me-2 text-light border-info ${styles.btnOutlineInfo}`}>
                                        Dashboard
                                    </Button>
                                </Nav.Link>
                                <span className="text-light me-3">Hello, {FirstName}</span>
                                <Button variant="outline-info" onClick={logoutUser}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    <Button variant="outline-info" className={`me-2 text-light border-info ${styles.btnOutlineInfo}`}>
                                        Log in
                                    </Button>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register">
                                    <Button variant="outline-info" className={`me-2 text-light border-info ${styles.btnOutlineInfo}`}>
                                        Register
                                    </Button>
                                </Nav.Link>
                            </>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
