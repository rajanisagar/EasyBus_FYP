import React from "react";
import styled from "styled-components";
import avatarImage1 from "../assets/avatarImage1.jpg";
import avatarImage2 from "../assets/avatarImage2.jpg";
import avatarImage3 from "../assets/avatarImage3.jpg";
import avatarImage4 from "../assets/avatarImage4.jpg";
export default function Testimonials() {
  return (
    <Section id="testimonials">
<Section className="mx-5 px-5 supervisor" id="testimonials">
      <div className="title">
        <h2>Our Supervisor</h2>
      </div>
      <div className="testimonials">
      
 
        <div className="testimonial">
        <div className="info">
            <img src={avatarImage4} alt="" />
            <div className="details">
              <h4>Faheem Akhtar Rajput</h4>
              <span>Associate Professor</span>
            </div>
          </div>
          <p className="mt-5 text-justify"> 
          Dr. Faheem Akhtar Rajput received his Ph.D. in Software Engineering (Data Science, Machine Learning, and Deep Learning) from Beijing University of Technology, Beijing, China in 2020. In addition, he completed his MS in Computer Science from National University, FAST, Karachi, Pakistan, and his Bachelors from Hamdard University Karachi. He has previously been part of the Computer Science faculty at WebXZone (Team Lead & Trainer), National University FAST, Muhammad Ali Jinnah University, and Bahria University Karachi. He is working at IBA University since 2013. Presently, he is working as an Associate Professor (BPS-20) and Coordinator of ABET/NCEAC Accreditation at the Computer Science Department. He has vast experience in teaching (around 14 years) and research. He has been part of various bodies and councils throughout his academic and professional career. 
          </p>

        </div>
      </div>
     
    </Section>

      <div className="title">
        <h2>Group Members</h2>
      </div>
      <div className="testimonials">
        <div className="testimonial">

          <div className="info">
            <img src={avatarImage1} alt="" />
            <div className="details">
              <h4>Sagar Rajani</h4>
              <span>Web Developer</span>
            </div>
          </div>
          <p className="">
            Computer Science Student - Sukkur IBA University 
            
          </p>
        </div>
        <div className="testimonial">

          <div className="info">
            <img src={avatarImage2} alt="" />
            <div className="details">
              <h4>Ali Baloch</h4>
              <span>Android Developer</span>
            </div>
          </div>
          <p>
          Computer Science Student - Sukkur IBA University 
          </p>
        </div>
        <div className="testimonial">

          <div className="info">
            <img src={avatarImage3} alt="" />
            <div className="details">
              <h4>Sdheer Ahmed</h4>
              <span>UI/UX Developer</span>
            </div>
          </div>
          <p>
          Computer Science Student - Sukkur IBA University 
          </p>
        </div>
      </div>
     

      
    </Section>
    
  );
}

const Section = styled.section`
  // margin: 1rem 0;
  margin-top:-25rem;
  .title {
    text-align: center;
    margin-bottom: 2rem;
    margin-top:12rem;
  }
  .testimonials {
    display: flex;
    justify-content: center;
    margin: 0 2rem;
    gap: 2rem;
    .testimonial {
      background-color: aliceblue;
      padding: 0.5rem 2rem;
      border-radius: 0.5rem;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: translateX(0.4rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      .info {
        display: flex;
        justify-content: center;
        gap: 1rem;
        align-items: start;
        margin-top: 0.9rem;
        img {
          border-radius: 3rem;
          height: 3rem;
        }
        .details {
          span {
            font-size: 0.9rem;
          }
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {
    .testimonials {
      flex-direction: column;
      margin: 0;
      .testimonial {
        justify-content: center;
        .info {
          flex-direction: column;
          justify-content: center;
        }
      }
    }
  }
  .supervisor{
    margin-top:20rem;
  }
`

;
