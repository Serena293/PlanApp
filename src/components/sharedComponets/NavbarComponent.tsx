import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../../assets/navbar.css";

interface NavbarComponentProps {
  onClick: () => void
}


function NavbarComponent({onClick}: NavbarComponentProps) {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-color mb-2 p-0">
      <Container className='d-flex bg-color'>
        <Navbar.Brand href="#home" className='custom-navbar'>
          <img src="../../public/icons/icon-192x192.png" className="brand-logo" alt="Logo" />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className='bg-color'>
          <Nav className="ms-auto bg-color">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown" className='bg-color'>
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" onClick={onClick}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
