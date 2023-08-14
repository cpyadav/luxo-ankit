import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./containers/Layout";
import Landing from "./screens/Landing.js";
import WhoAreWe from "./screens/WhoAreWe.js";
import GlobalFonts from "./fonts/fonts.js";
import { styled } from "styled-components";
import bg from "./assets/bg.mp4";
import theme from "./utils/theme";
import ContactUs from "./screens/ContactUs";

const BGVideoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: -1;
`;

const BGVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-width: 100%;
`;

const BGOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.bgOverlay};
  opacity: 0;
`;

function App() {
  const [loaded, setLoaded] = useState(0);
  const [websiteLoading, setWebsiteLoading] = useState(true);
  const [showCover, setShowCover] = useState(true);
  const [selectedSlide, setSelectedSlide] = useState(-1);
  const bgRef = useRef();
  const navRef = useRef();

  useEffect(() => {
    if (bgRef.current && navRef.current) {
      bgRef.current.playbackRate = 1;
      navRef.current.playbackRate = 1;
      bgRef.current.play();
      navRef.current.play();
    }
  }, [bgRef, navRef]);

  const onAction = (duration = 1500) => {
    // bgRef.current.playbackRate = 3;
    // navRef.current.playbackRate = 3;
    // setTimeout(() => {
    //   bgRef.current.playbackRate = 1;
    //   navRef.current.playbackRate = 1;
    // }, duration);
  };

  return (
    <BrowserRouter basename="/">
      <GlobalFonts />
      <Layout
        navRef={navRef}
        onAction={onAction}
        loaded={loaded}
        setLoaded={setLoaded}
        websiteLoading={websiteLoading}
        setWebsiteLoading={setWebsiteLoading}
        showCover={showCover}
        setShowCover={setShowCover}
        selectedSlide={selectedSlide}
        setSelectedSlide={setSelectedSlide}>
        <BGVideoContainer>
          <BGVideo
            ref={bgRef}
            muted
            playsinline
            loop
            onPlay={(e) => console.log("playing whole", e)}
            onLoadedData={() => setLoaded((loaded) => loaded + 1)}>
            <source src={bg} type="video/mp4" />
          </BGVideo>
          <BGOverlay />
        </BGVideoContainer>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Landing
                onAction={onAction}
                setLoaded={setLoaded}
                websiteLoading={websiteLoading}
                showCover={showCover}
                setShowCover={setShowCover}
                selectedSlide={selectedSlide}
                setSelectedSlide={setSelectedSlide}
              />
            }
          />
          <Route
            exact
            path="/who-we-are"
            element={
              <WhoAreWe
                onAction={onAction}
                setLoaded={setLoaded}
                websiteLoading={websiteLoading}
                setShowCover={setShowCover}
              />
            }
          />
          <Route
            exact
            path="/contact-us"
            element={
              <ContactUs
                onAction={onAction}
                setLoaded={setLoaded}
                websiteLoading={websiteLoading}
                setShowCover={setShowCover}
              />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
