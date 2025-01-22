import React from 'react';
import './footer.css'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h4 className="footer-title">About VisitAmhara</h4>
            <ul>
              <li><a href="#">The Bureau</a></li>
              <li><a href="#">Our Management</a></li>
              <li><a href="#">Mandate and Responsibility</a></li>
              <li><a href="#">Archive (Publication)</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4 className="footer-title">Destinations</h4>
            <ul>
              <li><a href="#">World Heritage National Parks</a></li>
              <li><a href="#">Community Protected Areas</a></li>
              <li><a href="#">Lakes, Hot Springs and Waterfalls</a></li>
              <li><a href="#">Religious Sites</a></li>
              <li><a href="#">Historical Landmarks</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4 className="footer-title">Things To Do</h4>
            <ul>
              <li><a href="#">Hiking and Trekking</a></li>
              <li><a href="#">Bird Watching</a></li>
              <li><a href="#">Fishing</a></li>
              <li><a href="#">Biking</a></li>
              <li><a href="#">Horseback Riding</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4 className="footer-title">Events</h4>
            <ul>
              <li><a href="#">Religious Events</a></li>
              <li><a href="#">Cultural Events</a></li>
              <li><a href="#">Corporate Events</a></li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p className="copyright">© 2023 VisitAmhara.travel</p>
          </div>
          <div className="col-md-6">
            <p className="contact-info">
              <a href="tel: +251111234567">
                <i className="fas fa-phone"></i> +251 11 123 4567
              </a>
            </p>
          </div>
          <div className="col-md-6">
            <p className="contact-info">
              <a href="mailto:info@visitamhara.travel">
                <i className="fas fa-envelope"></i> info@visitamhara.travel
              </a>
            </p>
          </div>
          <div className="col-md-12">
            <ul className="social-media">
              <li>
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;