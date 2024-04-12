import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn } from 'mdb-react-ui-kit'; // Make sure MDBIcon is imported
import { FaGithub, FaGoogle, FaLinkedinIn, FaSquareFacebook, FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import styled from 'styled-components';


export default function App() {
  return (  
    <StyledFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <SocialIconsWrapper>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>
        <SocialIconGroup>
          <SocialIconLink href='https://www.facebook.com/'>
            <FaSquareFacebook />
          </SocialIconLink>
          <SocialIconLink href='https://twitter.com/'>
            <FaTwitter />
          </SocialIconLink>
          <SocialIconLink href='https://www.google.com/'>
            <FaGoogle />
          </SocialIconLink>
          <SocialIconLink href='https://www.instagram.com/'>
            <FaInstagram />
          </SocialIconLink>
          <SocialIconLink href='https://www.linkedin.com/'>
            <FaLinkedinIn />
          </SocialIconLink>
          <SocialIconLink href='https://github.com/'>
            <FaGithub />
          </SocialIconLink>
          </SocialIconGroup>
      </SocialIconsWrapper>
      
      <FooterContent>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
          <MDBCol md="3" lg="2" xl="3" className='mb-4'>
              <FooterLogoWrapper>
                <FooterLogo src="https://res.cloudinary.com/digbjrzel/image/upload/v1712661087/BINARAMA_LOGO_1_jflthj.png" alt="Logo" />
              </FooterLogoWrapper>
              <FooterDetails>
                <FooterDetail>Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</FooterDetail>
              </FooterDetails>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>About</h6>
              <p>
                <a href='/about' className='text-reset'>
                  Our Story
                </a>
              </p>
              <p>
                <a href='/privacy-policy' className='text-reset'>
                  Privacy Policy
                </a>
              </p>
              <p>
                <a href='/faq' className='text-reset'>
                  FAQ
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='/courses' className='text-reset'>
                  Course
                </a>
              </p>
              <p>
                <a href='/profile' className='text-reset'>
                  My Account
                </a>
              </p>
              <p>
                <a href='/course-dashboard' className='text-reset'>
                  Course Dashboard
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                ihello@elearning.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </FooterContent>

      <FooterCopyright>
        © 2024 Copyright:
        <a className='text-reset fw-bold' href=''>
          Elearning
        </a>
      </FooterCopyright>
    </StyledFooter>
  );
}
const StyledFooter = styled(MDBFooter)`
  background-color: rgba(0, 0, 0, 0.05);
  color: #6c757d;
`;

const SocialIconsWrapper = styled.section`
display: flex;
justify-content: space-between; /* Align content to left and right */
align-items: center; /* Vertically center align content */
padding: 1.5rem 2rem; /* Add padding */
border-bottom: 1px solid #dee2e6;
`;
const SocialIconGroup = styled.div`
  display: flex; /* Display icons horizontally */
  gap: 1rem; /* Add space between icons */
`;

const SocialIconLink = styled.a`
  color: inherit;
`;

const FooterContent = styled.section`
  padding: 4rem 0;
`;
const SectionTitle = styled.h6`
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`;
const FooterLogoWrapper = styled.div`
  margin-right: auto; /* Push to left */
`;
const FooterLogo = styled.img`
  max-width: 300px;
  margin-top: -100px;
  margin-left: -70px;
   /* Adjust the size as needed */
`;
const FooterDetails = styled.div`
  margin-left: -60px; /* Add some space */
`;

const FooterDetail = styled.p`
  margin-bottom: 1rem;
`;

const FooterCopyright = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 1rem 0;
  justify-content: center;
`;