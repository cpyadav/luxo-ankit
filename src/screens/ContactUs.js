import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import theme from "../utils/theme.js";
import { animated, easings, useSpring } from "@react-spring/web";
import { Mail, MapPin, MapPinIcon, Phone } from "lucide-react";
import contactus from "../assets/contactus.mp4";
import map from "../assets/map.svg";

const Container = styled.div `
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 75%;
  height: 90vh;
  @media (max-width: 768px) {
    width: 90%;
    flex-direction: column;
    justify-content: center;
  }
`;

const Left = styled.div `
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 45%;
  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const Map = styled(animated.img)
`
  width: 100%;
  @media (max-width: 768px) {
    margin-top:200px
  }
`;

const Row = styled.div `
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin: 1.1em 0;
    @media (max-width: 768px) {
      justify-content: center;
      margin: 0.7em 0;
    }
  `;

const Description = styled(animated.p)
`
  color: ${theme.colors.primary};
  font-size: 1.3em;
  text-align: ${(props) => (props.flip ? "left" : "right")};
  width: 70%;
  margin-right: 1em;
  @media (max-width: 768px) {
    font-size: 1.1em;
    width: 100%;
    margin-left: 15px;
    text-align: left; /* You might want to adjust text alignment for small devices */
    transform: translate(0%, 0%) !important;
    opacity: 1 !important;
  }
`;

const Book = styled(animated.button)
`
  border-style: solid;
  border-radius: 3em;
  color: white;
  background-color: ${theme.colors.primary};
  border-width: ${(props) => (props.cta ? "1px" : "0px")};
  border-color: ${theme.colors.primary};
  padding: 0.7em ${(props) => (props.cta ? "2em" : "1em")};
  font-size: 1.1em;
  font-weight: 600;
  text-decoration: none;
  font-family: "Satoshi Light";
  text-transform: uppercase;
  letter-spacing: 0.2em;
  cursor: pointer;
  margin-top: 2.5em;

  ${(props) =>
    props.cta &&
    css`
      &:hover {
        color: ${theme.colors.primary};
        background-color: transparent;
        transition: all ease-in 250ms;
      }
    `}
    @media (max-width: 768px) {
      font-size: 1em;
      padding: 0.5em ${(props) => (props.cta ? "1.5em" : "0.8em")};
      margin-top: 1.5em;
    }
`;

const Right = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 55%;
  height: 100vh;
  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const AnimatedMapPin = animated(MapPin);
const AnimatedPhone = animated(Phone);
const AnimatedMail = animated(Mail);

export default function ContactUs({ websiteLoading, setShowCover,isMobileDevice }) {
  const [descriptionStyle, descriptionApi] = useSpring(
    () => ({
      from: { transform: "translate(0%, 10%)", opacity: (isMobileDevice ? 1 : 0) },
    }),
    []
  );
  const [bookStyle, bookApi] = useSpring(
    () => ({
      from: { transform: "translate(0%, 50%)", opacity: (isMobileDevice ? 1 : 0) },
    }),
    []
  );

  useEffect(() => {
    setShowCover(false);
  }, []);

  useEffect(() => {
    if (!websiteLoading) {
      descriptionApi.start(() => ({
        from: { transform: "translate(0%, 10%)", opacity: 0 },
        to: { transform: "translate(0%, 0%)", opacity: 1 },
        config: {
          duration: 600,
        },
        delay: 200,
      }));
      bookApi.start(() => ({
        from: { transform: "translate(0%, 50%)", opacity: 0 },
        to: { transform: "translate(0%, 0%)", opacity: 1 },
        config: {
          duration: 600,
        },
        delay: 400,
      }));
    }
  }, [websiteLoading]);

  const details = [
    {
      text: `LUXURY AROMATIC & ESSENTIAL OILS FZE\nSharjah Airport International Freezone\nPO Box 513820, Sharjah, UAE​`,
      icon: () => (
        <AnimatedMapPin
          style={{ ...descriptionStyle }}
          color={theme.colors.primary}
          size={30}
        />
      ),
    },
    {
      text: `+971 6 5218859​`,
      icon: () => (
        <AnimatedPhone
          style={{ ...descriptionStyle }}
          color={theme.colors.primary}
          size={30}
        />
      ),
    },
    {
      text: `inquiry@luxeolabs.com`,
      icon: () => (
        <AnimatedMail
          style={{ ...descriptionStyle }}
          color={theme.colors.primary}
          size={30}
        />
      ),
    },
  ];
  //const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const handleOpenEmail = () => {
    const emailAddress = 'inquiry@luxeolabs.com';

    // Construct the mailto link
    const mailtoLink = `mailto:${emailAddress}`;

    // Open the email client with the mailto link
    window.location.href = mailtoLink;
  };
  return (
    <Container>
      <Left>
        <Map src={map} alt="Map" />
      </Left>
      <Right>
        {details.map((item, index) => (
          <Row key={index}>
            {isMobileDevice ? 
            <>
            {item.icon()}
            <Description
              style={{ ...descriptionStyle, whiteSpace: "pre-line" }}>
              {item.text}
            </Description> 
            </>  : 
           <>
            <Description
              style={{ ...descriptionStyle, whiteSpace: "pre-line" }}>
              {item.text}
            </Description>
             {item.icon()}
             </>
            }
             
          </Row>
        ))}

        <Book cta style={{ ...bookStyle }} onClick={handleOpenEmail} >
        Talk to us ⟶
        </Book>
      </Right>
    </Container>
  );
}