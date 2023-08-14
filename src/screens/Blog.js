import React from "react";
import styled from "styled-components";
import theme from "../utils/theme.js";
import masterperfumers from "../assets/masterperfumers.mp4";
import scienceofperfumery from "../assets/scienceofperfumery.mp4";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const BlogSection = styled.div`
  max-width: 800px;
  padding: 20px;
  margin-bottom: 30px;
  background-color: ${theme.colors.white};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

const BlogTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const BlogParagraph = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const BlogVideo = styled.video`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export default function WhoAreWe() {
  const sections = [
    {
      descriptions: [
        "Our company is home to a group of",
        "highly trained perfumers and fragrance",
        "designers who live and breathe the art",
        "of creating distinctive and memorable",
        "aromas. We take great pride in being",
        "able to offer our clients unrivaled",
        "service and quality in the fragrance",
        "industry, which is our specialty.",
      ],
      title: "Master Perfumers",
      video: masterperfumers,
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
      title: "Science of Perfumery",
      video: scienceofperfumery,
    },
  ];

  return (
    <Container>
      {sections.map((section, index) => (
        <BlogSection key={index}>
          <BlogTitle>{section.title}</BlogTitle>
          {section.descriptions.map((desc, idx) => (
            <BlogParagraph key={idx}>{desc}</BlogParagraph>
          ))}
          <BlogVideo controls>
            <source src={section.video} type="video/mp4" />
            Your browser does not support the video tag.
          </BlogVideo>
        </BlogSection>
      ))}
    </Container>
  );
}
