import React from 'react';
import Link from 'next/link'

class Footer extends React.Component {
    state = {
        curTime: new Date().toLocaleString()
    }
    render() {
        return (

            <div className="bg-light text-center text-lg-start">
                <div className="container p-4">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                            <h5 className="text-uppercase">About us</h5>
                            <p>
                                NodeJs, React, Angular, ionic, php, Visual C#, Android Studio, AppInventure
                            </p>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Courses</h5>
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!" className="text-dark">Arduino for IoT</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-dark">ESP32 & ESP8266</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-dark">MicroPhyton</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-dark">PIC Microcontroller</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase mb-0">Language</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="#!" className="text-dark">C/C++</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-dark">Phyton</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-dark">MERN Stack</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-dark">IONIC Framework</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    Copyright©{this.state.curTime} <Link className="text-dark" href="https://siamcodes.com/">siamcodes.com</Link>
                </div>
            </div>

        )
    }

}

export default Footer;