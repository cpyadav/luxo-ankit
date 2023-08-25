import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../utils/theme.js";
import useWindowDimensions from "../utils/useWindowDimensions.js";
import homeCare from "../assets/expertise-homecare.png";
import personalCare from "../assets/expertise-personalcare.png";
import finePerfumery from "../assets/expertise-fineperfumery.png";
import WAWSection from "./WAWSection.js";
import { animated, easings, useSpring, useSprings } from "@react-spring/web";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  padding-top: 10vh;
`;

const Bar = styled.div`
  position: absolute;
  top: 0;
  width: 60%;
  height: 0.5px;
  background-color: ${theme.colors.primary};
`;

const Title = styled(animated.p)`
  color: ${theme.colors.primary};
  font-family: "Giovanna";
  font-size: 3em;
  text-align: right;
`;

const Parts = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 70%;
  margin-top: 22px;
`;

const Part = styled(animated.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 18%;
  height: 80%;
  border-top-right-radius: 200px;
  border-top-left-radius: 200px;
  background-image: linear-gradient(white, transparent);
`;

const Image = styled.img`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 22%;
  width: 60%;
`;

const Name = styled(animated.p)`
  position: absolute;
  bottom: 10%;
  color: ${theme.colors.primary};
  font-family: "Giovanna";
  font-size: 1.7em;
  text-align: right;
  margin-bottom:60px;
`;

const parts = [
  {
    name: "Home Care",
    image: homeCare,
  },
  {
    name: "Personal Care",
    image: personalCare,
  },
  {
    name: "Fine Perfumery",
    image: finePerfumery,
  },
];

export default function Expertise() {
  const { height } = useWindowDimensions();
  const [scrolled, setScrolled] = useState(false);
  const [titleStyles, titleApi] = useSpring(
    () => ({
      from: { transform: "translate(0%, 50%)", opacity: 0 },
    }),
    []
  );
  const [partStyles, partApi] = useSprings(
    3,
    parts.map((_, index) => ({
      id: index,
      from: { transform: "translate(0%, 50%)", opacity: 0 },
    })),
    []
  );

  useEffect(() => {
    if (scrolled) {
      titleApi.start(() => ({
        from: { transform: "translate(0%, 50%)", opacity: 0 },
        to: { transform: "translate(0%, 0%)", opacity: 1 },
        config: {
          duration: 600,
        },
        easing: easings.easeOutSine,
      }));
      partApi.start((index) => ({
        id: index,
        from: { transform: "translate(0%, 50%)", opacity: 0 },
        to: { transform: "translate(0%, 0%)", opacity: 1 },
        config: {
          duration: 400,
        },
        delay: 200 + index * 100,
        easing: easings.easeOutSine,
      }));
    }
  }, [scrolled]);

  const listenScrollEvent = () => {
    console.log(window.scrollY, height);
    if (window.scrollY > height * 1.4) {
      return setScrolled(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    <Container>
      <Bar />
      <Title style={{ ...titleStyles }}>Our Expertise</Title>
      <Parts>
        {parts.map((item, index) => (
          <Part key={item.name} style={{ ...partStyles[index] }}>
            <Image src={item.image} />
            <Name>{item.name}</Name>
          </Part>
        ))}
      </Parts>
    </Container>
  );
}
