import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../utils/theme.js";
import masterperfumers from "../assets/masterperfumers.mp4";
import masterperfumersMob from "../assets/fineperfumery.png";
import scienceofperfumery from "../assets/scienceofperfumery.mp4";
import scienceofperfumeryMob from "../assets/scienceofperfumery.png";
import WAWSection from "../components/WAWSection.js";
import Expertise from "../components/Expertise.js";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (max-width: 768px) {
    padding: 1em; /* Add padding for smaller screens */
  }
`;

export default function WhoAreWe({ setLoaded, websiteLoading, setShowCover,isMobileDevice }) {
  useEffect(() => {
    setShowCover(false);
  }, []);

  const sections = [
    {
      descriptions: [
        "Our company is home to a group of",
        "highly trained perfumers and fragrance",
        "designers who live and breathe the art",
        "of creating distinctive and memorable",
        "aromas. We take great pride in being",
        "able to offer our clients unrivalled",
        "service and quality in the fragrance",
        "industry, which is our specialty.",
      ],
      title: ["Master", "Perfumers"],
      video: isMobileDevice ? masterperfumersMob :  masterperfumers,
    },
    {
      descriptions: [
        "We consider fragrance development to",
        "be both an art and a science here at",
        "our company. We are dedicated to exceeding",
        "our customers' expectations in every",
        "way, from the quality of our products to",
        "the friendliness of our customer service",
        "staff. We have the experience and knowledge",
        "to help you find the perfect fragrance,",
        "whether it's a bespoke creation or a",
        "perfume already on the market.",
      ],
      title: ["Science of", "Fragrance"],
      video: isMobileDevice ?  scienceofperfumeryMob : scienceofperfumery,
    },
  ];

  return (
    <Container>
      <WAWSection
        data={sections[0]}
        setLoaded={setLoaded}
        websiteLoading={websiteLoading}
        isMobileDevice ={isMobileDevice}
      />
      <WAWSection
        data={sections[1]}
        flip
        setLoaded={setLoaded}
        websiteLoading={websiteLoading}
        isMobileDevice ={isMobileDevice}
      />
      <Expertise />
    </Container>
  );
}
