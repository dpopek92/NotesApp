import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/notes">
          NotesAppLogo
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-end"
          id="basic-navbar-nav"
        ></Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
