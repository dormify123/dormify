import React from "react";
import "../contactus/contactus.css";

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>
        If you have any questions or need support, feel free to reach out to us:
      </p>

      <div className="contact-info">
        <h2>General Inquiries</h2>
        <p>
          Email: <a href="mailto:dormify94@gmail.com">dormify94@gmail.com</a>
        </p>
      </div>

      <div className="team-contacts">
        <h2>Team Contacts</h2>
        <div className="team-member-contact">
          <h3>Angela Sobhieh</h3>
          <p>
            Email: <a href="mailto:aps04@mail.aub.edu">aps04@mail.aub.edu</a>
          </p>
        </div>
        <div className="team-member-contact">
          <h3>Ezzedine Al Ozone</h3>
          <p>
            Email: <a href="mailto:eka07@mail.aub.edu">eka07@mail.aub.edu</a>
          </p>
        </div>
        <div className="team-member-contact">
          <h3>Reem El Hadka</h3>
          <p>
            Email: <a href="mailto:rye13@mail.aub.edu">rye13@mail.aub.edu</a>
          </p>
        </div>
        <div className="team-member-contact">
          <h3>Steven Oueiss</h3>
          <p>
            Email: <a href="mailto:svo00@mail.aub.edu">svo00@mail.aub.edu</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
