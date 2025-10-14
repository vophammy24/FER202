import { useState, useMemo } from "react";
import {
  Button, Container, Form, Nav, Navbar, NavDropdown, InputGroup, Modal, ProgressBar, Toast, ToastContainer
} from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FiUser, FiLogIn, FiHeart, FiSearch } from "react-icons/fi";

import "./navbar.css";
import AboutForm from "../forms/AboutForm";
import AccountForm from "../forms/AccountForm";
import AddressForm from "../forms/AddressForm";

const STEPS = [
  { key: "about",   label: "About"},
  { key: "account", label: "Account"},
  { key: "address", label: "Address"},
];

const emptyData = {
  // About
  firstName: "", lastName: "", email: "", phone: "", age: "", avatar: null,
  // Account
  username: "", password: "", confirmPassword: "",
  secretQuestion: "", answer: "",
  // Address
  street: "", city: "", state: "", zip: "", country: "",
};

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0); // 0=About, 1=Account, 2=Address
  const [data, setData] = useState(emptyData);
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const percent = useMemo(() => ([33, 67, 100][step]), [step]);

  const update = (field, value) => setData((d) => ({ ...d, [field]: value }));

  // ====== VALIDATION ======
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isPhone10 = (v) => /^\d{10}$/.test(v);
  const isAgeValid = (v) => /^\d+$/.test(v) && Number(v) >= 0 && Number(v) <= 100;

  const validateAbout = () => {
    const e = {};
    if (!data.firstName.trim()) e.firstName = "First name is required";
    if (!data.lastName.trim()) e.lastName = "Last name is required";
    if (!isEmail(data.email)) e.email = "Invalid email";
    if (!isPhone10(data.phone)) e.phone = "Phone Number must be 10 digits";
    if (!isAgeValid(String(data.age))) e.age = "Age 0–100";
    // avatar optional
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const validateAccount = () => {
    const e = {};
    if (!data.username.trim()) e.username = "Username is required";
    if (!data.password) e.password = "Password is required";
    if (!data.confirmPassword) e.confirmPassword = "Confirm your password";
    if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
      e.confirmPassword = "Passwords must match";
    }
    if (!data.secretQuestion) e.secretQuestion = "Pick a question";
    if (!data.answer.trim()) e.answer = "Answer is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const validateAddress = () => {
    const e = {};
    if (!data.street.trim()) e.street = "Street is required";
    if (!data.city.trim()) e.city = "City is required";
    if (!data.state.trim()) e.state = "State is required";
    if (!data.zip.trim()) e.zip = "Zip is required";
    if (!data.country) e.country = "Country is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleOpen = () => {
    setData(emptyData);
    setErrors({});
    setStep(0);
    setOpen(true);
  };

  const handleNext = () => {
    if (step === 0 && !validateAbout()) return;
    if (step === 1 && !validateAccount()) return;
    setErrors({});
    setStep((s) => s + 1);
  };

  const handlePrev = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  };

  const handleFinish = () => {
    if (!validateAddress()) return;
    // Lưu localStorage (avatar bỏ qua hoặc lưu tên file)
    const toSave = { ...data, avatar: data.avatar?.name ?? null };
    localStorage.setItem("buildProfile", JSON.stringify(toSave));
    setOpen(false);
    setShowToast(true);
  };

  return (
    <div>
      <Navbar expand="lg" className="dora-navbar" bg="light" variant="light" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/">DORA MOVIE</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>

            <div className="d-flex align-items-center gap-3">
              {/* Quick search */}
              <Form className="d-none d-lg-block">
                <InputGroup>
                  <Form.Control type="search" placeholder="Quick search" aria-label="Quick search" className="mx-3" />
                  <Button variant="primary"><FiSearch aria-hidden="true" /></Button>
                </InputGroup>
              </Form>

              {/* icons */}
              <Nav className="align-items-center">
                <NavDropdown
                  title={<span className="d-inline-flex align-items-center gap-2">
                    <FiUser aria-hidden="true" /> Accounts
                  </span>}
                  id="accountsDropdown"
                >
                  <NavDropdown.Item href="/account/profiles">Manage Your Profiles</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleOpen}>
                    Build your Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/account/change-password">Change Password</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/login" className="d-inline-flex align-items-center gap-2">
                  <FiLogIn aria-hidden="true" /> Login
                </Nav.Link>
                <Nav.Link href="/favourites" className="d-inline-flex align-items-center gap-2">
                  <FiHeart aria-hidden="true" /> Favourites
                </Nav.Link>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ===== MODAL WIZARD ===== */}
      <Modal show={open} onHide={() => setOpen(false)} centered size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Build Your Profile</Modal.Title>
        </Modal.Header>

        <div className="px-5 py-3">
          <ProgressBar now={percent} label={`${percent}%`} />
        </div>

        <Nav variant="tabs" className="px-3 wizard-tabs" activeKey={STEPS[step].key}>
            {STEPS.map((s, i) => (
                <Nav.Item key={s.key}>
                <Nav.Link
                    eventKey={s.key}
                    // chỉ cho phép click quay lại các bước đã đi (để không bỏ qua validate)
                    onClick={() => (i <= step ? setStep(i) : null)}
                    disabled={i > step}
                    className="d-flex align-items-center gap-2"
                >
                    <i className={`bi ${s.icon}`} aria-hidden="true" />
                    <span>{s.label}</span>
                </Nav.Link>
                </Nav.Item>
            ))}
        </Nav>

        <Modal.Body>
          {step === 0 && (
            <AboutForm values={data} errors={errors} onChange={update} />
          )}
          {step === 1 && (
            <AccountForm values={data} errors={errors} onChange={update} />
          )}
          {step === 2 && (
            <AddressForm values={data} errors={errors} onChange={update} />
          )}
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handlePrev} disabled={step === 0}>
            Previous
          </Button>

          <div className="d-flex gap-2">
            {step < 2 && (
              <Button variant="primary" onClick={handleNext}>
                Next
              </Button>
            )}
            {step === 2 && (
              <Button variant="success" onClick={handleFinish}>
                Finish
              </Button>
            )}
          </div>
        </Modal.Footer>
      </Modal>

      {/* Toast thành công */}
      <ToastContainer position="top-center">
        <Toast bg="success" onClose={() => setShowToast(false)} show={showToast} delay={2500} autohide>
          <Toast.Header closeButton={true}>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Profile saved to localStorage.</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}