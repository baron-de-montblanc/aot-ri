import React, {useState} from "react";
import "../assets/Contact.css";
import { Form } from "react-bootstrap";




function Contact () {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message could not be sent. Please try again later.")  // TODO: fix this...
        // TODO: add API call logic here
    };



    return (
        <div className="contact-content">
            <div className="container">
                <hr/>
                <h2 id="contact" className="contact-h2">Contact Us</h2>

                <Form onSubmit={handleSubmit} className="contact-form">

                    <div className="contact-form-inner-div">
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email*</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="subject">
                            <Form.Label>Subject*</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="message">
                            <Form.Label>Message*</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </div>
                    <button className="send-button"> Send Message </button>
                </Form>
            </div>
        </div>
    );
};

export default Contact;