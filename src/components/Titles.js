import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import theme from "../utils/theme.js";
import { animated, easings, useSpring } from "@react-spring/web";

const Container = styled.div`
  position: absolute;
  right: 36%;
  top: 25%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Title = styled(animated.p)`
  color: ${theme.colors.primary};
  font-family: "Giovanna";
  font-size: 2.7em;
  text-align: right;
  margin-bottom: -0.2em;
  @media (max-width: 768px) {
    font-size: 1.7em;
    text-align: center;
  }
`;

export default function Titles({ data, selected, unset }) {
  const [texts, setTexts] = useState(null);
  const [title1Style, title1Api] = useSpring(
    () => ({
      from: {
        transform: "translate(0%, 100%)",
        opacity: 0,
      },
    }),
    []
  );

  const [title2Style, title2Api] = useSpring(
    () => ({
      from: {
        transform: "translate(0%, 100%)",
        opacity: 0,
      },
    }),
    []
  );

  useEffect(() => {
    if (unset) {
      title1Api.start({
        from: {
          transform: "translate(500px, 0px) scale(1)",
        },
        to: {
          transform: "translate(0px, 0px) scale(1.2)",
        },
        config: {
          duration: 1200,
          easing: easings.easeOutSine,
        },
      });
      title2Api.start({
        from: {
          transform: "translate(500px, 0px) scale(1)",
        },
        to: {
          transform: "translate(0px, 0px) scale(1.2)",
        },
        config: {
          duration: 1200,
          easing: easings.easeOutSine,
        },
        delay: 100,
      });
    }
  }, [unset]);

  useEffect(() => {
    if (selected) {
      title1Api.start({
        from: {
          transform: "translate(0px, 0px) scale(1)",
        },
        to: {
          transform: "translate(380px, 0px) scale(1.2)",
        },
        config: {
          duration: 1200,
          easing: easings.easeOutSine,
        },
      });
      title2Api.start({
        from: {
          transform: "translate(0px, 0%) scale(1)",
        },
        to: {
          transform: "translate(380px, 0%) scale(1.2)",
        },
        config: {
          duration: 1200,
          easing: easings.easeOutSine,
        },
        delay: 100,
      });
    }
  }, [selected]);

  useEffect(() => {
    title1Api.start({
      from: {
        transform: "translate(0%, 0%)",
      },
      to: {
        transform: "translate(0%, -100%)",
        opacity: 0,
      },
      config: {
        duration: 400,
        easing: easings.easeOutSine,
      },
    });
    title2Api.start({
      from: {
        transform: "translate(0%, 0%)",
      },
      to: {
        transform: "translate(0%, -100%)",
        opacity: 0,
      },
      config: {
        duration: 400,
        easing: easings.easeOutSine,
      },
      delay: 100,
    });

    title1Api.start({
      from: {
        transform: "translate(0%, 100%)",
        opacity: 0,
      },
      to: {
        transform: "translate(0%, 0%)",
        opacity: 1,
      },
      config: {
        duration: 400,
        easing: easings.easeOutSine,
      },
      delay: 500,
      onStart: () => {
        setTexts(data.title);
      },
    });
    title2Api.start({
      from: {
        transform: "translate(0%, 100%)",
        opacity: 0,
      },
      to: {
        transform: "translate(0%, 0%)",
        opacity: 1,
      },
      config: {
        duration: 400,
        easing: easings.easeOutSine,
      },
      delay: 600,
    });
  }, [data]);

  return texts ? (
    <Container>
      <Title style={{ ...title1Style }}>{texts[0]}</Title>
      <Title style={{ ...title2Style }}>{texts[1]}</Title>
    </Container>
  ) : null;
}
