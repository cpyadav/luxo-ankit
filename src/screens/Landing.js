import React, { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import theme from "../utils/theme.js";
import homecare from "../assets/homecare.mp4";
import personalcare from "../assets/personalcare.mp4";
import image from "../assets/logo.png";
import fineperfumery from "../assets/fineperfumery.mp4";
import { animated, easings, useSpring } from "@react-spring/web";
import Titles from "../components/Titles.js";
import Descriptions from "../components/Descriptions.js";
import chevronLeft from "../assets/chevron-left.svg";
import { ChevronDown } from "lucide-react";

import WAWSectiionHomeMobile from "../components/WAWSectiionHomeMobile.js";
import WAWSectiionHomeMobileDetail from "../components/WAWSectiionHomeMobileDetail.js";


const Container = styled(animated.div)`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
  overflow: hidden;
  @media (max-width: 768px) {
   
  }
 
`;

const ContainerMobile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (max-width: 768px) {
    padding: 1em; /* Add padding for smaller screens */
    position: absolute;
    top: 14%;
  }
`;
const Slides = styled(animated.div)`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 1350px;
  margin-top: 10em;
  perspective: 200em;
 
 
`;

const SlideContainer = styled(animated.div)`
  position: absolute;
  width: 27%;
  height: 60vh;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  cursor: ${(props) => (props.selectable ? "pointer" : "default")};
  pointer-events: ;
  @media (max-width: 768px) {
    width: 90%; 
    height: auto; 
    max-height: 80vh; 
  }
  
`;

const Slide = styled(animated.video)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  
`;

const SlideBrownOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.brownOverlay};
  opacity: ${(props) => (props.selectable ? 0.0 : 0.6)};
  mix-blend-mode: ${(props) => (props.selectable ? "normal" : "normal")};
 
`;

const SlideGradientOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 30%;
  background-image: linear-gradient(white, transparent);
  opacity: 0.5;
 
`;

const Buttons = styled.div`
  position: absolute;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10em;
  pointer-events: none;
 
`;

const Button = styled(animated.button)`
  width: 40px;
  height: 40px;
  opacity: 1;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  pointer-events: auto;

  &:hover {
    transform: scale(1.1);
    transition: all 250ms ease-in;
  }
 
`;

const ButtonImage = styled(animated.img)`
  width: 100%;
  height: 100%;
`;

const Cover = styled(animated.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 20%;
`;

const ExploreContainer = styled.button`
  position: absolute;
  bottom: 20%;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;

`;

const Explore = styled.p`
  color: ${theme.colors.primary};
  font-size: 1.2em;
  text-align: right;
  letter-spacing: 0.4em;
 
`;

const AnimatedChevronDown = animated(ChevronDown);

const GoBack = styled(animated.button)`
  position: absolute;
  left: 4.5%;
  bottom: 6.5%;
  color: ${theme.colors.primary};
  border: none;
  padding: 0.7em ${(props) => (props.cta ? "2em" : "1em")};
  font-size: 0.8em;
  font-weight: 600;
  text-decoration: none;
  font-family: "Satoshi Light";
  text-transform: uppercase;
  letter-spacing: 0.2em;
  cursor: pointer;
  background: none;
 
`;

const features = [
  {
    id: "homecare",
    video: homecare,
    title: ["Home", "Care"],
    descriptions: [
      "We provide one-of-a-kind fragrance options,",
      " for hair body, and skin care products thanks ",
      "to our broad fragrance collection and innovative",
      "fragrance staff. As the needs of our customers ",
      "evolve in response to shifting worldwide market",
      "conditions,we anticipate their needs and provide them with",
      "innovative solutions developed by our team of ",
      "recognized experts in the fieldof scent",
      "compound creation.",
      "Personal Hygiene Products Like Shampoo",
      "Conditioner, Body Wash, Face Wash, Exfoliants",
      ",Towelettes, and Deodorant.",
    ],
   
  },
  {
    id: "personalcare",
    video: personalcare,
    title: ["Personal", "Care"],
    descriptions: [
      "By pushing the envelope, our talented ",
      "perfumers from around the world have come ",
      "up with some of the most original and ",
      "uplifting scent combinations ever.",
      "Our perfumery expertise and the quality of",
      "all Luxeo fragrances are ensured by our",
      "talented and innovative perfumers, a wide ",
      "variety of hand-picked premium ingredients sourced",
      "from throughout the world, and state-of-the-art",
      "Luxeo technologies."
    ],
  },
  {
    id: "fineperfumery",
    video: fineperfumery,
    title: ["Fine", "Fragrances"],
    descriptions: [
      "Our extensive fragrance library allows us to",
      "tailor our solutions to meet the needs of niche ",
      "markets and consumer preferences for air care,",
      "laundry care, and other functional items.",
      "Our plans are grounded on client and consumer needs",
      "and market realities, but we always push the",
      "envelope to surprise and delight them.",
      "Cleaners for the Kitchen and Bathroom, as",
      "well as All- Purpose Cleaners, Fabric Softeners,",
      " Air Care Products, Laundry Detergents, and Dishwashers.",
    ],
  },
];

const CAROUSEL_DURATION = 900;
const CAROUSEL_EASING = easings.easeOutSine;
const SELECT_DURATION = 1200;
const SELECT_EASING = easings.easeOutSine;

export default function Landing({
  onAction,
  setLoaded,
  websiteLoading,
  showCover,
  setShowCover,
  selectedSlide,
  setSelectedSlide,
}) {
  const videoRef1 = useRef();
  const videoRef2 = useRef();
  const videoRef3 = useRef();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [detailSlide, setDetailSlide] = useState(false);
  const [indexDetail, setindexDetail] = useState(0);

  const [containerStyles, containerApi] = useSpring(
    () => ({
      from: {
        opacity: 0,
      },
    }),
    []
  );
  const [slide1Style, slide1Api] = useSpring(
    () => ({
      from: {
        zIndex: 0,
        transform: "translate(-130%, 0%) scale(0.8) rotateY(50deg)",
        opacity: 1,
        filter: "blur(0px) saturate(100%)",
      },
    }),
    []
  );
  const [slide2Style, slide2Api] = useSpring(
    () => ({
      from: {
        zIndex: 1,
        transform: "translate(0%, 0%) scale(1) rotateY(0deg)",
        opacity: 1,
        filter: "blur(0) saturate(100%)",
      },
    }),
    []
  );
  const [slide3Style, slide3Api] = useSpring(
    () => ({
      from: {
        zIndex: 0,
        transform: "translate(130%, 0%) scale(0.8) rotateY(-50deg)",
        opacity: 1,
        filter: "blur(0px) saturate(100%)",
      },
    }),
    []
  );

  const [arrowStyle, arrowApi] = useSpring(
    () => ({
      from: {
        opacity: 0,
      },
    }),
    []
  );

  const [backStyle, backApi] = useSpring(
    () => ({
      from: {
        transform: "translate(0%, 100%)",
        opacity: 0,
      },
    }),
    []
  );
  const [coverStyles, coverApi] = useSpring(
    () => ({
      from: {
        opacity: 1,
        transform: "translate(0%, 0%)",
      },
    }),
    []
  );
  const [exploreStyles, exploreApi] = useSpring(
    () => ({
      from: {
        transform: "translate(0%, 0%)",
        opacity: 1,
      },
      to: [
        {
          transform: "translate(0%, 50%)",
          opacity: 0.5,
        },
        {
          transform: "translate(0%, 0%)",
          opacity: 1,
        },
      ],
      config: {
        duration: 1700,
      },
      loop: true,
    }),
    []
  );
  const [unset, setUnset] = useState(true);
  const [slideStyles] = useState([slide1Style, slide2Style, slide3Style]);
  const [slideApis, setSlideApis] = useState([slide1Api, slide2Api, slide3Api]);

  const videoRefs = [videoRef1, videoRef2, videoRef3];

  useEffect(() => {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobileDevice) {

    } else {
      if (websiteLoading) return;
      videoRefs[0].current.playbackRate = 0.7;
      videoRefs[0].current?.pause();
      videoRefs[1].current.playbackRate = 0.7;
      videoRefs[1].current?.pause();
      videoRefs[2].current.playbackRate = 1;
      videoRefs[2].current?.pause();
      videoRefs[currentSlide].current?.play().catch((e) => {
        console.error(e);
      });
    }
    

  }, [websiteLoading, currentSlide]);

  useEffect(() => {
    const DURATION = 1700;
    if (!websiteLoading && !showCover) {
      containerApi.start({
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
        config: {
          duration: DURATION,
          easing: easings.easeInSine,
        },
        delay: 200,
      });
      slideApis[0].start({
        from: {
          transform: "translate(-130%, 200%) scale(0.8) rotateY(50deg)",
        },
        to: {
          transform: "translate(-130%, 0%) scale(0.8) rotateY(50deg)",
        },
        config: {
          duration: DURATION,
          easing: easings.easeInSine,
        },
        delay: 200,
      });
      slideApis[1].start({
        from: {
          transform: "translate(0%, 200%) scale(1) rotateY(0deg)",
        },
        to: {
          transform: "translate(0%, 0%) scale(1) rotateY(0deg)",
        },
        config: {
          duration: DURATION,
          easing: easings.easeInSine,
        },
      });
      slideApis[2].start({
        from: {
          transform: "translate(130%, 200%) scale(0.8) rotateY(-50deg)",
        },
        to: {
          transform: "translate(130%, 0%) scale(0.8) rotateY(-50deg)",
        },
        config: {
          duration: DURATION,
          easing: easings.easeInSine,
        },
        delay: 200,
      });
      arrowApi.start({
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
        config: {
          duration: DURATION,
          easing: easings.easeInSine,
        },
        delay: 200,
      });
    }
  }, [websiteLoading, showCover]);

  const onNext = () => {
    if (selectedSlide !== -1) return;
    onAction(CAROUSEL_DURATION);
    setCurrentSlide((currentSlide) =>
      currentSlide === 0 ? 2 : currentSlide - 1
    );
    slideApis[0].set({
      zIndex: 2,
    });
    slideApis[1].set({
      zIndex: 1,
    });
    slideApis[2].set({
      zIndex: 0,
    });

    slideApis[0].start({
      from: {
        transform: "translate(-130%, 0%) scale(0.8) rotateY(50deg)",
        opacity: 1,
        filter: "blur(0px) saturate(100%)",
      },
      to: {
        transform: "translate(0%, 0%) scale(1) rotateY(0deg)",
        opacity: 1,
        filter: "blur(0) saturate(100%)",
      },
      config: {
        duration: CAROUSEL_DURATION,
        easing: CAROUSEL_EASING,
      },
    });
    slideApis[1].start({
      from: {
        transform: "translate(0%, 0%) scale(1) rotateY(0deg)",
        opacity: 1,
        filter: "blur(0px) saturate(100%)",
      },
      to: {
        transform: "translate(130%, 0%) scale(0.8) rotateY(-50deg)",
        opacity: 1,
        filter: "blur(0px) saturate(100%)",
      },
      config: {
        duration: CAROUSEL_DURATION,
        easing: CAROUSEL_EASING,
      },
    });
    slideApis[2].start({
      from: {
        transform: "translate(130%, 0%) scale(0.8) rotateY(-50deg)",
      },
      to: {
        transform: "translate(-130%, 0%) scale(0.8) rotateY(50deg)",
      },
      config: {
        duration: CAROUSEL_DURATION,
        easing: CAROUSEL_EASING,
      },
    });

    setSlideApis([slideApis[2], slideApis[0], slideApis[1]]);
  };

  const onPrev = () => {
    if (selectedSlide !== -1) return;
    onAction(CAROUSEL_DURATION);
    setCurrentSlide((currentSlide) =>
      currentSlide === 2 ? 0 : currentSlide + 1
    );
    slideApis[0].set({
      zIndex: 0,
    });
    slideApis[1].set({
      zIndex: 1,
    });
    slideApis[2].set({
      zIndex: 2,
    });

    slideApis[0].start({
      from: {
        transform: "translate(-130%, 0%) scale(0.8) rotateY(50deg)",
      },
      to: {
        transform: "translate(130%, 0%) scale(0.8) rotateY(-50deg)",
      },
      config: {
        duration: CAROUSEL_DURATION,
        easing: CAROUSEL_EASING,
      },
    });
    slideApis[1].start({
      from: {
        transform: "translate(0%, 0%) scale(1) rotateY(0deg)",
        opacity: 1,
        filter: "blur(0px) saturate(100%)",
      },
      to: {
        transform: "translate(-130%, 0%) scale(0.8) rotateY(50deg)",
        opacity: 1,
        filter: "blur(0px) saturate(100%)",
      },
      config: {
        duration: CAROUSEL_DURATION,
        easing: CAROUSEL_EASING,
      },
    });
    slideApis[2].start({
      from: {
        transform: "translate(130%, 0%) scale(0.8) rotateY(-50deg)",
        opacity: 1,
        filter: "blur(0px) saturate(100%)",
      },
      to: {
        transform: "translate(0%, 0%) scale(1) rotateY(0deg)",
        opacity: 1,
        filter: "blur(0) saturate(100%)",
      },
      config: {
        duration: CAROUSEL_DURATION,
        easing: CAROUSEL_EASING,
      },
    });

    setSlideApis([slideApis[1], slideApis[2], slideApis[0]]);
  };

  const onSlideSelect = (id) => {
    if (selectedSlide !== -1) return;
    onAction(SELECT_DURATION);
    setUnset(false);
    setSelectedSlide(id);

    arrowApi.start({
      to: {
        opacity: 0,
      },
      config: {
        duration: SELECT_DURATION,
        easing: SELECT_EASING,
      },
    });

    backApi.start({
      to: {
        opacity: 1,
        transform: "translate(0%, 0%)",
      },
      config: {
        duration: SELECT_DURATION,
        easing: SELECT_EASING,
      },
    });

    slideApis[0].start({
      from: {
        transform: "translate(-130%, 0%) scale(0.8) rotate(0deg)",
      },
      to: {
        transform: "translate(-180%, 40%) scale(0.15) rotate(0deg)",
      },
      config: {
        duration: SELECT_DURATION,
        easing: SELECT_EASING,
      },
    });

    slideApis[2].start({
      from: {
        transform: "translate(130%, 0%) scale(0.8) rotate(0deg)",
      },
      to: {
        transform: "translate(-155%, 40%) scale(0.15) rotate(0deg)",
      },
      config: {
        duration: SELECT_DURATION,
        easing: SELECT_EASING,
      },
    });

    slideApis[1].start({
      from: {
        transform: "translate(0%, 0%) scale(1) rotate(0deg)",
      },
      to: {
        transform: "translate(100%, 0%) scale(1) rotate(0deg)",
      },
      config: {
        duration: SELECT_DURATION,
        easing: SELECT_EASING,
      },
    });
  };

  useEffect(() => {
    if (selectedSlide !== -1) return;
    setUnset(true);
    onAction(SELECT_DURATION);
    arrowApi.start({
      to: {
        opacity: 1,
      },
      config: {
        duration: SELECT_DURATION,
        easing: SELECT_EASING,
      },
    });

    backApi.start({
      to: {
        opacity: 0,
        transform: "translate(0%, 100%)",
      },
      config: {
        duration: SELECT_DURATION,
        easing: SELECT_EASING,
      },
    });

    slideApis[0].start({
      from: {
        transform: "translate(-180%, 40%) scale(0.2) rotateY(0deg)",
      },
      to: {
        transform: "translate(-130%, 0%) scale(0.8) rotateY(50deg)",
      },
      config: {
        duration: SELECT_DURATION,
        easing: SELECT_EASING,
      },
    });

    slideApis[2].start({
      from: {
        transform: "translate(-155%, 40%) scale(0.2) rotateY(0deg)",
      },
      to: {
        transform: "translate(130%, 0%) scale(0.8) rotateY(-50deg)",
      },
      config: {
        duration: SELECT_DURATION,
        easing: SELECT_EASING,
      },
    });

    slideApis[1].start({
      from: {
        transform: "translate(100%, 0%) scale(1) rotate(0deg)",
      },
      to: {
        transform: "translate(0%, 0%) scale(1) rotate(0deg)",
      },
      config: {
        duration: SELECT_DURATION,
        easing: SELECT_EASING,
      },
    });
  }, [selectedSlide]);

  const goBack = () => {
    setSelectedSlide(-1);
  };


 

const handleVideoClick = (index) => {
     setDetailSlide(true)
     setindexDetail(index)
  };
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const handleCancel = () => {
    setDetailSlide(false)
 };
  
  return (
    <Fragment>
      {isMobileDevice ?
        

        <ContainerMobile>
         {detailSlide ? <WAWSectiionHomeMobileDetail
            data={features[indexDetail]}
            setLoaded={setLoaded}
            // websiteLoading={websiteLoading}
            handleCancel={handleCancel}
          /> :
          <>
          <WAWSectiionHomeMobile
            data={features[0]}
            setLoaded={setLoaded}
            // websiteLoading={websiteLoading}
            handleVideoClick={()=>handleVideoClick(0) }
          />
          <WAWSectiionHomeMobile
            data={features[1]}
            flip
            setLoaded={setLoaded}
            // websiteLoading={websiteLoading}
            handleVideoClick={()=>handleVideoClick(1)}
          />
           <WAWSectiionHomeMobile
            data={features[2]}
            flip
            setLoaded={setLoaded}
            // websiteLoading={websiteLoading}
            handleVideoClick={()=>handleVideoClick(2)}
          /></> }
        </ContainerMobile>

       :
        <>
          <Container style={{ ...containerStyles }}>
            <Slides>
              { features && features.length > 0 && features.map((item, index) => (
                <SlideContainer
                  style={{ ...slideStyles[index] }}
                  selectable={currentSlide === index}
                  onClick={() => {
                    if (currentSlide === index) onSlideSelect(index);
                  }}>
                  <Slide
                    ref={videoRefs[index]}
                    loop
                    muted
                    playsinline
                    playbackspeed={1}
                    onLoadedData={() => setLoaded((loaded) => loaded + 1)}>
                    <source src={item.video} type="video/mp4" />
                  </Slide>
                  <SlideBrownOverlay selectable={currentSlide === index} />
                  <SlideGradientOverlay />
                </SlideContainer>
              ))}
            </Slides>

            {!websiteLoading && (
              <Titles
                unset={unset}
                selected={selectedSlide !== -1}
                data={features[currentSlide]}
              />
            )}

            <Descriptions
              animate
              data={selectedSlide === -1 ? null : features[selectedSlide]}
              unset={unset}
            />

            {selectedSlide !== -1 && (
              <GoBack cta style={{ ...backStyle }} onClick={goBack}>
                ⟵ Go Back
              </GoBack>
            )}

            <Buttons>
              <Button style={{ ...arrowStyle }} onClick={onNext}>
                <ButtonImage src={chevronLeft} />
              </Button>
              <Button style={{ ...arrowStyle }} onClick={onPrev}>
                <ButtonImage
                  src={chevronLeft}
                  style={{ transform: "rotateY(180deg)" }}
                />
              </Button>
            </Buttons>
          </Container>
          {showCover && (
            <Cover style={{ ...coverStyles }}>
              <Image src={image} />
              <ExploreContainer
                onClick={() => {
                  coverApi.start({
                    from: {
                      opacity: 1,
                      transform: "translate(0%, 0%)",
                    },
                    to: {
                      opacity: 0,
                      transform: "translate(0%, -20%)",
                    },
                    config: {
                      duration: 500,
                      easing: easings.easeInSine,
                    },
                  });
                  setTimeout(() => setShowCover(false), 500);
                }}>
                <Explore>EXPLORE</Explore>
                <AnimatedChevronDown
                  style={{ ...exploreStyles }}
                  color={theme.colors.primary}
                />
              </ExploreContainer>
            </Cover>
          )}
        </>
      }
    </Fragment>
  );
}
