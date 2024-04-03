import React, { useState, useRef, useEffect } from "react";
import Flipbook from "react-pageflip";
import "./flipBook.css";

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import {
  AiOutlineShareAlt,
  AiOutlineFullscreenExit,
  AiOutlineClose,
} from "react-icons/ai";
import { BsArrowsFullscreen } from "react-icons/bs";
import imageLinks from "../../public/image";

function ShowFlipBook({images}) {
  const [currentPage, setCurrentPage] = useState(0);
  const flipPageRef = useRef(null);

  const handle = useFullScreenHandle();
  const isFull = handle.active;
  const [flipWidth, setFlipWidth] = useState(350); // Default width
  const [flipHeight, setFlipHeight] = useState(500); // Default height
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [screenSize, setScreenSize] = useState();

  // Handle copying the current URL to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    });
  };

  const handleFullScreen = () => {
    if (isFull) {
      handle.exit();
    } else {
      handle.enter();
    }
  };

  // Adjust flipbook dimensions based on screen size
  useEffect(() => {
    const adjustFlipbookSize = () => {
      const screenWidth = window.innerWidth;
      setScreenSize(screenWidth);
      if (screenWidth < 480) {
        setFlipWidth(300);
        setFlipHeight(400);
      } else if (screenWidth < 768) {
        setFlipWidth(400);
        setFlipHeight(600);
      } else {
        setFlipWidth(isFullscreen ? 600 : 350);
        setFlipHeight(isFullscreen ? 800 : 500);
      }
    };

    window.addEventListener("resize", adjustFlipbookSize);
    adjustFlipbookSize();
    return () => window.removeEventListener("resize", adjustFlipbookSize);
  }, [isFullscreen]);

  console.log(screenSize);

  // Open a new window to share on social media
  const openNewWindow = (url) => {
    const width = 800,
      height = 700;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    window.open(
      url,
      "_blank",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  };

  // Enter fullscreen mode
  const enterFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error(
            `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
          );
        });
    }
  };

  // Exit fullscreen mode
  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch((err) => {
          console.error(
            `Error attempting to disable fullscreen mode: ${err.message} (${err.name})`
          );
        });
    }
  };

  // Adjust flipbook dimensions based on fullscreen state
  useEffect(() => {
    setFlipWidth(isFull ? 600 : 350);
    setFlipHeight(isFull ? 800 : 500);
  }, [isFull]);
  console.log(flipWidth);

  console.log("image",images)

  return (
    <div className="background-container">
      <FullScreen handle={handle}>
        <div className="">
          <div className="centered-container flex">
            <Flipbook
              key={isFull}
              ref={flipPageRef}
              showCover={screenSize < 768 ? false : true}
              width={flipWidth}
              height={flipHeight}
              currentPage={currentPage}
              onFlip={(newPage) => setCurrentPage(newPage.data)}
              mobileScrollSupport={true}
              flippingTime={1000}
              className="demo-book"
            >
             {imageLinks.map((imageLink, index) => (
    <div key={index} className="page">
        <img
            src={imageLink}
            alt={`Page ${index + 1}`}
            style={{ width: "100%", height: "100%" }}
        />
    </div>
))}

            </Flipbook>
          </div>
          <div className="bottom-container">
            <div className="flex">
              {showShareModal && (
                <div className="share-modal">
                  <div style={{ display: "flex" }}>
                    <button onClick={copyToClipboard}>
                      {copied ? "Copied!" : "Copy Link"}
                    </button>
                    <button
                      style={{ marginLeft: "auto" }}
                      onClick={() => setShowShareModal(false)}
                    >
                      <AiOutlineClose
                        size={screenSize < 478 ? "1.1rem" : "1.5rem"}
                      />
                    </button>
                  </div>
                  <p className="link">{window.location.href}</p>
                  <div className="social-icons">
                    <button
                      onClick={() => openNewWindow("https://www.facebook.com/")}
                    >
                      Facebook
                    </button>
                    <button
                      onClick={() => openNewWindow("https://www.linkedin.com/")}
                    >
                      LinkedIn
                    </button>
                    <button
                      onClick={() =>
                        openNewWindow("https://www.instagram.com/")
                      }
                    >
                      Instagram
                    </button>
                  </div>
                </div>
              )}
              <button onClick={() => setShowShareModal(!showShareModal)}>
                <AiOutlineShareAlt />
                <span>Share</span>
              </button>
            </div>
            <div className="flex" style={{ gap: ".5rem" }}>
              <button
                onClick={() => flipPageRef.current.pageFlip().flipPrev()}
                className="mr-auto page-nav-button"
                style={{ color: currentPage === 0 ? "gray" : "inherit" }} // Corrected style and condition
              >
                <IoIosArrowBack size={screenSize < 768 ? "1.1rem" : `2rem`} />
              </button>
              <p className="page-number">Page {currentPage + 1}</p>
              <button
                onClick={() => flipPageRef.current.pageFlip().flipNext()}
                className="ml-auto page-nav-button"
                style={{ color: currentPage === 5 ? "gray" : "inherit" }} // Add your condition for the last page
              >
                <MdNavigateNext size={screenSize < 768 ? "1.1rem" : `2rem`} />
              </button>
            </div>
            <div className="flex">
              <button onClick={handleFullScreen}>
                {isFullscreen ? (
                  <AiOutlineFullscreenExit />
                ) : (
                  <BsArrowsFullscreen />
                )}
              </button>
              <p onClick={handleFullScreen}>
                {isFullscreen ? "Zoom Out" : "Zoom In"}
              </p>
            </div>
          </div>
        </div>
      </FullScreen>
    </div>
  );
}

export default ShowFlipBook;