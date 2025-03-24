import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  Dropdown,
  Offcanvas,
} from "react-bootstrap";
import { BsBell } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa6";
import { LuUser } from "react-icons/lu";
import { MdFullscreen } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header({ toggleSidebar }) {
  // States for Offcanvas visibility
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate()

  // Function to enable full-screen mode
  const enterFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  };

  const adminLogout = () =>
  {
    localStorage.removeItem("admin_access_token")
    toast.success('Logout Successfully')
    navigate('/admin/auth')
  }

  return (
    <Navbar expand="lg" bg="light" >
      <Container fluid>
        {/* Left side: Toggle button and Logo */}
        <div className="d-flex align-items-center">
          {/* Sidebar Toggle for all views */}
          <button
            onClick={toggleSidebar}
            className="bg-transparent border-0 me-2"
          >
            <RxHamburgerMenu size={25} />
          </button>
          <Navbar.Brand href="#" className="text-dark fw-bold">
            Ansar
          </Navbar.Brand>
        </div>

        {/* Mobile-specific Notification and Profile Icons */}
        <div className="d-lg-none d-flex ms-auto align-items-center">
          <Button
            variant="link"
            className="p-0 text-dark me-3"
            onClick={() => setShowNotifications(true)}
          >
            <BsBell style={{ fontSize: "18px" }} />
          </Button>
          <Button
            variant="link"
            className="p-0 text-dark"
            onClick={() => setShowProfile(true)}
          >
            <LuUser style={{ fontSize: "20px" }} />
          </Button>
        </div>

        {/* Right side: Search bar, notification, and profile menus */}
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav>
            {/* Search Bar */}
            {/* <Nav.Item>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  size="sm"
                  style={{ boxShadow: "none" }}
                />
              </Form>
            </Nav.Item> */}

            {/* Full screen Icon */}
            <Nav.Item className="ms-2">
              <Button variant="link" className="p-0 text-dark">
                <MdFullscreen
                  style={{ fontSize: "22px" }}
                  onClick={enterFullScreen}
                />
              </Button>
            </Nav.Item>

            {/* Notification and Profile Dropdowns for Desktop View */}
            {/* <Nav.Item className="d-none d-lg-inline ms-2">
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" className="p-0 text-dark">
                  <BsBell style={{ fontSize: "18px" }} />
                </Dropdown.Toggle>
                <Dropdown.Menu className="mt-4">
                  <Dropdown.Item href="#">Notification 1</Dropdown.Item>
                  <Dropdown.Item href="#">Notification 2</Dropdown.Item>
                  <Dropdown.Item href="#">Notification 3</Dropdown.Item>
                  <Dropdown.Item href="#">View All</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item> */}

            <Nav.Item className="d-none d-lg-inline ms-2">
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" className="p-0 text-dark">
                  <LuUser style={{ fontSize: "20px" }} />
                </Dropdown.Toggle >
                <Dropdown.Menu className="mt-4">
                  <Dropdown.Item href="#" onClick={adminLogout} className="text-danger" style={{ fontSize: "13px" }}>Logout <FaPowerOff style={{ fontSize: "13px"}} /> </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Offcanvas for Notifications */}
      <Offcanvas
        show={showNotifications}
        onHide={() => setShowNotifications(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Notifications</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p className="text-secondary">loading....</p>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Offcanvas for Profile */}
      <Offcanvas
        show={showProfile}
        onHide={() => setShowProfile(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Button variant="danger" onClick={adminLogout}>Logout</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}

export default Header;
