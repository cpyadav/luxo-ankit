import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import theme from "../utils/theme.js";
import lImage from "../assets/l.png";
import uImage from "../assets/u.png";
import xImage from "../assets/x.png";
import eImage from "../assets/e.png";
import oImage from "../assets/o.png";
import baseimage from "../assets/logo-base.png";
import bg from "../assets/bg.mp4";

import { useNavigate, Link, useLocation } from "react-router-dom";
import { animated, easings, useSpring, useSprings } from "@react-spring/web";
import mobilehamber from "../assets/mobilehamber.svg";

const Container = styled.div`
  z-index: 999;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100vw;
  height: 14vh;
  transition: all ease-in 200ms;
  overflow: hidden;
  @media (max-width: 768px) {
    height: 20vh; 
  }
`;

const BGVideo = styled.video`
  position: absolute;
  top: 0;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  @media (max-width: 768px) {
    height: auto; 
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: calc(100% - 10em);
  height: 75%;
  transition: all ease-in 200ms;
  overflow: hidden;
  padding: 0 5em;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 0 1em;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  @media (max-width: 768px) {
    height: auto;
  }
`;

const BaseImage = styled(animated.img)`
  height: 10%;
  @media (max-width: 768px) {
    height: 20%; 
  }
`;

const Title = styled.div`
  display: flex;
  height: 70%;

  @media (max-width: 768px) {
    height: auto; 
  }
`;

const BlockContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  height: 100%;
`;

const Block = styled(animated.img)`
  height: 100%;
  margin: 0;
  align: center;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 70%;
  height: 70%;
  @media (max-width: 768px) {
    width: 100%; 
    height: auto; 
    justify-content: center; 
  }
`;

const MenuItem = styled(animated(Link))`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.cta ? "white" : theme.colors.primary)};
  background-color: ${(props) =>
    props.cta ? theme.colors.primary : "transparent"};
  border-style: solid;
  border-radius: 3em;
  border-color: ${theme.colors.primary};
  border-width: ${(props) => (props.cta ? "0.9px" : "0")};
  padding: 0.4em ${(props) => (props.cta ? "1.0em" : "0em")};
  height: calc(100% - 2em);
  font-size: 0.8em;
  font-weight: ${(props) => (props.selected ? "800" : "400")};
  text-decoration: none;
  font-family: "Satoshi Regular";
  text-transform: uppercase;
  margin-right: 2em;
  letter-spacing: 0.0em;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 0.7em; 
    padding: 0.3em ${(props) => (props.cta ? "0.8em" : "0em")}; 
    margin-right: 1em; 
  }
  &:hover {
    color: #32704E;
  }

  ${(props) =>
    props.cta &&
    css`
      &:hover {
        color: ${theme.colors.primary};
        background-color: transparent;
        transition: all ease-in 250ms;
      }
    `}
`;

const Button = styled.button`
  display: none;
  font-size: 2em;
  color: ${theme.colors.primary};
  cursor: pointer;
  @media (max-width: 800px) {
    display: block;
  }
`;
const SVGIcon = styled.div`
width: 66px;
height: 42px;
transform: rotate(-90deg);
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="72" height="48" viewBox="0 0 72 48" fill="none"><path d="M3 3L69 3.00001" stroke="#00561E" stroke-width="6" stroke-linecap="round"/><path d="M3 24L69 24" stroke="#00561E" stroke-width="6" stroke-linecap="round"/><path d="M3 45L69 45" stroke="#00561E" stroke-width="6" stroke-linecap="round"/></svg>');
  flex-shrink: 0;
`;
const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-color: white;
  width: 100vw;
  padding-top: 6vh;
  transition: all ease-in 200ms;

  @media (max-width: 800px) {
    display: flex;
  }
`;

const MobileMenuItem = styled(Link)`
  color: ${(props) =>
    props.highlight ? theme.colors.accent : theme.colors.primary};
  font-size: 1.1em;
  font-weight: 600;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 1.1em 0;
  cursor: pointer;
  @media (max-width: 800px) {
    font-size: 1em; 
    padding: 1em 0; 
  }
`;
const Mobilehamber = styled.img`
  width: 66px;
  height: 42px;
  transform: rotate(-90deg);
  flex-shrink: 0;
`;
const titleArr = [lImage, uImage, xImage, eImage, oImage];

const sections = [
  {
    text: "Who we are",
    link: "/who-we-are",
  },
  {
    text: "Contact us",
    link: "/contact-us",
  },
  // {
  //   text: "Blog",
  //   link: "/blog", // Replace this with the actual link for the Blog page when available.
  // },
  {
    text: "Talk to us",
    link: "",
  },
];

export default function Navbar({
  websiteLoading,
  showCover,
  onAction,
  navRef,
  setLoaded,
  setSelectedSlide,
}) {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuItemStyles, menuItemApi] = useSprings(
    sections.length,
    sections.map((_, index) => ({
      id: index,
      from: { transform: "translate(100%, 0%)", opacity: 0 },
    })),
    []
  );
  const [blockStyles, blockApi] = useSprings(
    titleArr.length,
    titleArr.map((_, index) => ({
      id: index,
      from: { transform: "translate(0%, 30%)", opacity: 0 },
    })),
    []
  );

  const [baseImageStyle, baseImageApi] = useSpring(() => ({
    from: { transform: "translate(-100%, 0%)", opacity: 0 },
  }));

  useEffect(() => {
    if (websiteLoading || showCover) return;

    // Animate the base image
    baseImageApi.start({
      from: { transform: "translate(-100%, 0%)", opacity: 0 },
      to: { transform: "translate(0%, 0%)", opacity: 1 },
      config: {
        duration: 400,
      },
      delay: 200 + titleArr.length * 50, // Delay the animation after the titleArr elements have animated
      easing: easings.easeOutSine,
    });

    // Animate the existing titleArr elements
    blockApi.start((index) => ({
      id: index,
      from: { transform: "translate(0%, 30%)", opacity: 0 },
      to: { transform: "translate(0%, 0%)", opacity: 1 },
      config: {
        duration: 400,
      },
      delay: 200 + index * 50,
      easing: easings.easeOutSine,
    }));

    menuItemApi.start((index) => ({
      from: { transform: "translate(100%, 0%)", opacity: 0 },
      to: { transform: "translate(0%, 0%)", opacity: 1 },
      config: {
        duration: 1000,
      },
      delay: index * 200,
      easing: easings.easeOutSine,
    }));
  }, [websiteLoading, showCover]);

  return (
    <Container>
      <BGVideo
        ref={navRef}
        muted
        playsinline
        loop
        onPlay={(e) => console.log("playing nav", e)}
        onLoadedData={() => setLoaded((loaded) => loaded + 1)}>
        <source src={bg} type="video/mp4" />
      </BGVideo>
      <Content>
        <Brand>
          <Title
            onClick={() => {
              setSelectedSlide(-1);
              onAction();
              navigate("/");
            }}>
            {titleArr.map((item, index) => (
              <BlockContainer key={index}>
                <Block
                  style={{ ...blockStyles[index] }}
                  src={item}
                  alt={`Letter ${index}`}
                />
              </BlockContainer>
            ))}
          </Title>
          <BaseImage
            style={{ ...baseImageStyle }}
            src={baseimage}
            alt="Base Image"
          />
        </Brand>
        <Menu>
          {sections.map((item, index) => (
            <MenuItem
              style={{ ...menuItemStyles[index] }}
              onClick={() => {
                onAction();
              }}
              key={item.text}
              smooth
              to={item.link}
              cta={index === sections.length - 1}
              selected={location.pathname === item.link}>
              {item.text}
            </MenuItem>
          ))}
        </Menu>
        <Button onClick={() => setMobileMenuOpen((v) => !v)} ><Mobilehamber src={mobilehamber}/></Button>
        {mobileMenuOpen && (
          <MobileMenu>
            {sections.map((item) => (
              <MobileMenuItem
                key={item.text}
                smooth
                to={item.link}
                onClick={() => setMobileMenuOpen(false)}>
                {item.text}
              </MobileMenuItem>
            ))}
          </MobileMenu>
        )}
      </Content>
    </Container>
  );
}
