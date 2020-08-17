import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBInput } from "mdbreact";
import Layout from "../../../Layout/MyDash/Dashboard";
import Wrapper from "./styles";

const ContactUs = () => {
    return (
        <Wrapper>
            <Layout>
                <section className="my-5">
                    <h2 className="h1-responsive font-weight-bold text-center my-5 py-5">
                    Contact us
                    </h2>
                    {/* <p className="text-center w-responsive mx-auto pb-5">
                    저희 꼬북 제품을 사용하시다가 궁금한 점 혹은 불편한 사항이 있다면 언제든지 연락주세요. 언제나 빠르고 성의 있는 답변 드리도록 노력하겠습니다 :)
                    </p> */}
                    <MDBRow>
                    <MDBCol lg="5" className="lg-5 mb-4 ml-5">
                        <MDBCard>
                        <MDBCardBody>
                            <div className="form-header blue accent-1">
                            <h3 className="mt-2">
                                <MDBIcon icon="envelope" /> Write to us
                            </h3>
                            </div>
                            {/* <p className="dark-grey-text">
                            We'll write rarely, but only the best content.
                            </p> */}
                            <div className="md-form">
                            <MDBInput
                                icon="user"
                                label="Your name"
                                iconClass="grey-text"
                                type="text"
                                id="form-name"
                            />
                            </div>
                            <div className="md-form">
                            <MDBInput
                                icon="envelope"
                                label="Your email"
                                iconClass="grey-text"
                                type="text"
                                id="form-email"
                            />
                            </div>
                            <div className="md-form">
                            <MDBInput
                                icon="tag"
                                label="Subject"
                                iconClass="grey-text"
                                type="text"
                                id="form-subject"
                            />
                            </div>
                            <div className="md-form">
                            <MDBInput
                                icon="pencil-alt"
                                label="Your Message"
                                iconClass="grey-text"
                                type="textarea"
                                id="form-text"
                            />
                            </div>
                            <div className="text-center">
                            <MDBBtn color="light-blue">Submit</MDBBtn>
                            </div>
                        </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="6">
                        <div
                        id="map-container"
                        className="rounded z-depth-1-half map-container"
                        style={{ height: "400px" }}
                        >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3213.2394843424454!2d127.29615161523496!3d36.35497768004275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35654cad3d82caa9%3A0xb3fbce2dcaf4b67f!2z7IK87ISx7ZmU7J6sIOycoOyEseyXsOyImOybkA!5e0!3m2!1sen!2skr!4v1597592382016!5m2!1sen!2skr"
                            title="This is a unique title"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style={{ border: 0 }}
                        />
                        </div>
                        <br />
                        <MDBRow className="text-center">
                        <MDBCol md="4">
                            <MDBBtn tag="a" floating color="light-blue" className="accent-1">
                            <MDBIcon icon="map-marker-alt" />
                            </MDBBtn>
                            <p className="mt-2 mb-md-0">Daejeon</p>
                        </MDBCol>
                        <MDBCol md="4">
                            <MDBBtn tag="a" floating color="light-blue" className="accent-1">
                            <MDBIcon icon="phone" />
                            </MDBBtn>
                            <p className="mt-2 mb-md-0">042 123 1234</p>
                        </MDBCol>
                        <MDBCol md="4">
                            <MDBBtn tag="a" floating color="light-blue" className="accent-1">
                            <MDBIcon icon="envelope" />
                            </MDBBtn>
                            <p className="mt-2 mb-md-0">kkobuk@gmail.com</p>
                        </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    </MDBRow>
                </section>
            </Layout>
        </Wrapper>
    );
}

export default ContactUs;