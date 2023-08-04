import {useRef} from "react";
// import { Link } from "react-router-dom";
import emailjs from '@emailjs/browser';

const Footer = () => {
  const form = useRef()

  const sendEmail = (e) => {
          e.preventDefault();
      
          emailjs.sendForm('service_274vcxw', 'template_z00bn7l', form.current, 'sfhaq42-wZOu7XFji')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            e.target.reset()
  };


  return (
  




    <div className="footer">
      
        <div className="section-text">
          <h2> Contact Us</h2>
         <h4> We would love to hear from you! </h4>
          <p>Share your opinion by filling the following <br></br>form with your name and email</p>
          
        </div>

       
          <div className="form-box">
            <form ref={form} onSubmit={sendEmail} className="contact-form">
            <input type="name" id="name" className="txt-box" placeholder="Enter your name " required /><br />
            <input name="email" placeholder="Enter email" id="email" type="email" className="txt-box" required /><br />
            <textarea placeholder="Your Message" type="textarea" id="message" name="message" className="txt-box" required defaultValue={""} /><br />
            <button type="submit" className="btn"> Send Message</button>

            </form>
        </div>
    </div>

  );
};

export default Footer;
