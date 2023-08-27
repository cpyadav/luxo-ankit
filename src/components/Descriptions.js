import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import theme from "../utils/theme.js";
import { animated, easings, useSpring, useSprings } from "@react-spring/web";

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: ${(props) => (props.small ? "0em" : "30em")};
  margin-top: ${(props) => (props.small ? "0em" : "6em")};
  @media (max-width: 768px) {
    margin-right: 0; 
    margin-top: 2em; 
    align-items: center;
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.flip ? "flex-start" : "flex-end")};
  width: 100%;
  overflow: hidden;
  margin-top: ${(props) => (props.small ? "20px" : "2px")};
  @media (max-width: 768px) {
    align-items: center; 
    margin-top: ${(props) => (props.small ? "10px" : "1px")}; 
  }
`;

const Description = styled(animated.p)`
  color: ${theme.colors.primary};
  font-family: "Satoshi Light";
  font-size: ${(props) => (props.small ? "1.4em" : "1.5em")};
  text-align: ${(props) => (props.flip ? "left" : "right")};
  white-space: pre-line;
  margin-left:70px;
  @media (max-width: 768px) {
    font-size: ${(props) => (props.small ? "1.2em" : "1.3em")}; 
    text-align: center; 
    margin-left: 0; 
    margin-top: 10px; 
  }
`;

const Book = styled(animated.button)`
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
      padding: 0.5em ${(props) => (props.cta ? "1.5em" : "0.8em")}; 
      font-size: 1em; 
      margin-top: 1.5em; 
    }
`;

export default function Descriptions({ animate, flip, small, data, unset }) {
  const shouldStartAnimating = animate === undefined ? true : animate;
  const [descriptionStyles, descriptionsApi] = useSprings(
    data?.descriptions.length || 0,
    data?.descriptions.map((_, index) => ({
      id: index,
      from: { transform: "translate(0%, 100%)", opacity: 0 },
    })),
    []
  );
  const [bookStyle, bookApi] = useSpring(
    () => ({
      from: { transform: "translate(0%, 100%)", opacity: 0 },
    }),
    []
  );

  useEffect(() => {
    console.log(shouldStartAnimating);
    if (shouldStartAnimating && data) {
      descriptionsApi.start((index) => ({
        id: index,
        from: { transform: "translate(0%, 100%)", opacity: 0 },
        to: { transform: "translate(0%, 0%)", opacity: 1 },
        config: {
          duration: 600,
        },
        delay: small ? index * 100 : 1050 + index * 100,
        easing: easings.easeOutSine,
      }));
      bookApi.start(() => ({
        from: { transform: "translate(0%, 100%)", opacity: 0 },
        to: {
          transform: "translate(0%, 0%)",
          opacity: 1,
        },
        config: {
          duration: 600,
        },
        delay: small ? 7 * 100 : 1050 + 7 * 100,
        easing: easings.easeOutSine,
      }));
    }
  }, [data, shouldStartAnimating]);

  useEffect(() => {
    if (unset) {
      descriptionsApi.start({
        from: { opacity: 1 },
        to: { opacity: 0 },
        config: {
          duration: 400,
        },
      });
      bookApi.start({
        from: { opacity: 1 },
        to: { opacity: 0 },
        config: {
          duration: 400,
        },
      });
    }
  }, [unset]);

  return data ? (
    <Container small={small}>
      {data.descriptions.map((item, index) => (
        <DescriptionContainer flip={flip}>
          <Description
            flip={flip}
            small={small}
            style={{ ...descriptionStyles[index] }}>
            {item}
          </Description>
        </DescriptionContainer>
      ))}
      <DescriptionContainer small={small} flip={flip}>
        <Book cta style={{ ...bookStyle }}>
        Talk to us ⟶
        </Book>
      </DescriptionContainer>
    </Container>
  ) : null;
}
