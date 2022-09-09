import React from 'react';
import busRound from '../assets/busRound.png'
function About() {
    return (
        <div>
        <section className="bg-light">
            <div className="container px-5">
                <div className="row gx-5 align-items-center justify-content-center justify-content-lg-between">
                    <div className="col-12 col-lg-6">
                        <h2 className="display-5 lh-1 mb-4">EasyBus - Multivendor Bus Ticket Booking in Pakistan </h2>
                        <p className="lead fw-normal text-muted mb-5 mb-lg-0">EasyBus is a multivendor platform,
different vendors of buses can register to our system, so travelers can search and compare buses and seats of different vendors on our
single platform. EasyBus plays the of role a third body where travelers
and vendors of buses will be facilitated to deliver them a convenient and trustworthy platform.</p>
                    </div>
                    <div className="col-sm-8 col-md-6">
                        <div className="px-5 px-lg-0"><img className="img-fluid rounded-circle" src={busRound} alt="..." /></div>
                    </div>
                </div>
            </div>
        </section>
            
        </div>
    );
}

export default About;