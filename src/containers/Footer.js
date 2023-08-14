import React, { useEffect } from "react";
import styled from "styled-components";
import theme from "../utils/theme.js";
import logo from "../assets/logo.png";
import bwinvite from "../assets/bwinvite.png";
import instagram from "../assets/instagram.svg";
import linkedin from "../assets/linkedin.svg";
import { animated, easings, useSpring, useSprings } from "@react-spring/web";

const Container = styled(animated.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  align-self: center;
  width: calc(90vw);
  height: calc(10vh - 8px);
  transition: all ease-in 200ms;
  padding-bottom: 8px;
`;

const BWInvite = styled.img`
  width: 7%;
  margin-right: 2%;
  margin-bottom: 1%;  
`;

const Content = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 10px;
`;

const LogoImage = styled.img`
  cursor: pointer;
  width: 5%;
`;

const Division = styled.div`
  height: 1px;
  width: 87%;
  background-color: ${theme.colors.primary};
`;

const Social = styled.img`
  cursor: pointer;
  width: 15px;
  height: 15px;
  margin-left:7px;
  &:hover {
    opacity: 0.6;
    transition: all 250ms ease-in;
  }
`;

const socials = [
  {
    name: "Instagram",
    image: instagram,
    link: "https://www.instagram.com",
  },
  {
    name: "LinkedIn",
    image: linkedin,
    link: "https://www.linkedin.com/company/luxury-aromatic-essential-oils",
  },
];

export default function Footer({ websiteLoading, showCover }) {
  const [containerStyles, containerApi] = useSpring(
    () => ({
      from: {
        opacity: 0,
      },
    }),
    []
  );

  useEffect(() => {
    if (websiteLoading || showCover) return;
    containerApi.start({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: {
        duration: 800,
      },
      easing: easings.easeOutSine,
    });
  }, [websiteLoading, showCover]);

  return (
    <Container style={{ ...containerStyles }}>
      <BWInvite src={bwinvite} alt="beautyworld invite" />
      <Content>
        <Division />
        {socials.map((item) => (
          <Social
            onClick={() => window.open(item.link, "_blank")}
            key={item.name}
            alt={item.name}
            src={item.image}
          />
        ))}
      </Content>
    </Container>
  );
}
