import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";
import loadingVideo from "../assets/loading.mp4";
import { animated, easings, useSpring } from "@react-spring/web";
import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";

const Root = styled.div`
  font-family: "Satoshi Regular";
  background: "#000";
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const VideoContainer = styled(animated.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  z-index: 999;
  min-width: 100%;
  background-color: #141414;
`;

const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function Layout({
  children,
  onAction,
  loaded,
  setLoaded,
  websiteLoading,
  setWebsiteLoading,
  showCover,
  navRef,
  selectedSlide,
  setSelectedSlide,
}) {
  const location = useLocation();
  const LOADABLES =
    location.pathname === "/" ? 4 : location.pathname === "/who-are-we" ? 2 : 1;
  const [videoStyle, videoApi] = useSpring(
    () => ({
      from: { opacity: 1 },
    }),
    []
  );
  const [landingFinishedPlaying, setLandingFinishedPlaying] = useState(false);

  useEffect(() => {
    if (landingFinishedPlaying && loaded >= LOADABLES) {
      setWebsiteLoading(false);
    }
  }, [landingFinishedPlaying, loaded]);

  useEffect(() => {
    if (websiteLoading) return;
    videoApi.start({
      to: {
        opacity: 0,
      },
      config: {
        duration: 1000,
        easing: easings.easeOutSine,
      },
    });
  }, [websiteLoading]);
  const isMobileDevice =  /mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|iphone|ipod|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent);

  return (
    <Root>
      <Content>
        <Navbar
          onAction={onAction}
          websiteLoading={websiteLoading}
          showCover={showCover}
          selectedSlide={selectedSlide}
          setSelectedSlide={setSelectedSlide}
          setLoaded={setLoaded}
          navRef={navRef}
        />
        <Base>{children}</Base>
        <Footer websiteLoading={websiteLoading} showCover={showCover} />
      </Content>
      
      {!isMobileDevice ?
        <VideoContainer
          style={{
            ...videoStyle,
            pointerEvents: websiteLoading ? "all" : "none",
          }}>
          <Video autoPlay muted onEnded={() => setLandingFinishedPlaying(true)}>
            <source src={loadingVideo} type="video/mp4" />
          </Video>
        </VideoContainer>
        : ''}
    </Root>
  );
}
