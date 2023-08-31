import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../utils/theme.js";
import useWindowDimensions from "../utils/useWindowDimensions.js";
import { animated, useSpring } from "@react-spring/web";
import Descriptions from "./Descriptions.js";

const Container = styled.div`
  position: relative;
  display: block;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  @media (max-width: 768px) {
    flex-direction: column; 
    height: auto; 
  }
`;

const Left = styled.div`
  position: relative;
  display: block;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) => (props.flip ? "flex-start" : "flex-end")};
  width: 45%;
  height: 100vh;
  @media (max-width: 768px) {
    width: 100%; 
    height: 70vh;
  }
`;

const Right = styled.div`
  position: relative;
  display: block;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 100vh;
  @media (max-width: 768px) {
    width: 99%;
    margin: 0 auto;
    text-align: center;
    position: relative;
    height: 34vh;
  }
`;

const VideoContainer = styled(animated.div)`
  position: relative;
  height: 60%;
  width: 60%;
  margin-top: 4em;
  @media (max-width: 768px) {
    width: 95%;
    height: 91%;
    margin-top: 2em;
    text-align: center;
    margin: 0 auto;
    margin-left: 3%;
  }
`;

const Video = styled(animated.video)`
  height: 100%;
  width: 100%;
  border-radius: 20px;
  object-fit: cover;
`;

const VideoBrownOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.brownOverlay};
  opacity: 0;
  @media (max-width: 768px) {
    opacity: 0.5; 
    border-radius: 20px;
  }
`;

const VideoGradientOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 60%;
  background-image: linear-gradient(white, transparent);
  opacity: 0.7;
  @media (max-width: 768px) {
    height: 40%; 
    border-radius: 20px;
  }
`;

const Titles = styled.div`
  position: absolute;
  right: 12%;
  top: 21%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media (max-width: 768px) {
    right: auto;
    top: auto;
    left: 7%;
    bottom: 16%;
  }
`;

const Title = styled(animated.p)`
  color: ${theme.colors.primary};
  font-family: "Giovanna";
  font-size: 3em;
  text-align: right;
  @media (max-width: 768px) {
    font-size: 2em; 
    text-align: center; 
    
  }
`;

export default function WAWSection({ data, flip, setLoaded, websiteLoading,handleVideoClick }) {
  const { height } = useWindowDimensions();
  const [title1Style, title1Api] = useSpring(
    () => ({
      from: { transform: "translate(0%, 50%)", opacity: 0 },
    }),
    []
  );
  const [title2Style, title2Api] = useSpring(
    () => ({
      from: { transform: "translate(0%, 50%)", opacity: 0 },
    }),
    []
  );
  const [videoStyle, videoApi] = useSpring(
    () => ({
      from: { transform: "translate(0%, 10%)", opacity: 0 },
    }),
    []
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!websiteLoading && (!flip || scrolled)) {
      title1Api.start(() => ({
        from: { transform: "translate(0%, 50%)", opacity: 0 },
        to: { transform: "translate(0%, 0%)", opacity: 1 },
        config: {
          duration: 600,
        },
      }));
      title2Api.start(() => ({
        from: { transform: "translate(0%, 50%)", opacity: 0 },
        to: { transform: "translate(0%, 0%)", opacity: 1 },
        config: {
          duration: 600,
        },
      }));
      videoApi.start(() => ({
        from: { transform: "translate(0%, 10%)", opacity: 0 },
        to: { transform: "translate(0%, 0%)", opacity: 1 },
        config: {
          duration: 600,
        },
      }));
    }
  }, [websiteLoading, scrolled, flip]);

  const listenScrollEvent = () => {
    if (window.scrollY >= 30) {
      return setScrolled(true);
    }
  };
  const handleVideo = () => {
    const dd = handleVideoClick;
    handleVideoClick();
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    <Container>
     
      <Right>
        <VideoContainer style={{ ...videoStyle }} onClick={handleVideo}>
          <Video
            autoPlay
            muted
            loop
            alt={`${data.title[0]} ${data.title[1]}`}
            onLoadedData={() => setLoaded((loaded) => loaded + 1)}>
            <source src={data.video} type="video/mp4" />
          </Video>
          <VideoBrownOverlay />
          <VideoGradientOverlay />
        </VideoContainer>
        <Titles>
          <Title style={{ ...title1Style }}>{data.title[0]}</Title>
          <Title style={{ ...title2Style }}>{data.title[1]}</Title>
        </Titles>
      </Right>
     
    </Container>
  );
}
