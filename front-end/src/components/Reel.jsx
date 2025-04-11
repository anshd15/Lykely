import axios from "axios";
import { toast } from "react-hot-toast";
import ViralToggle from "./ViralAction";
import { FiHeart, FiSend, FiZap } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { FaHeart, FaChevronUp } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import { ethers } from "ethers";

const Reel = ({
  media,
  title,
  description,
  likes,
  shares,
  likedOrNot,
  id,
  activeReel,
  setActiveReel,
  type,
  creator_wallet,
}) => {
  const [liked, setLiked] = useState(likedOrNot || false);
  const [likesCount, setLikesCount] = useState(likes);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const videoRef = useRef(null);
  const isActive = activeReel === id;
  const { user } = useAuth();

  const handleLike = async () => {
    if (liked) {
      toast.error("You have already liked this post");
      return;
    }

    try {
      await axios.post(
        import.meta.env.VITE_SERVER_URL + `/api/memes/like/${id}`,
        {
          email: localStorage.getItem("email"),
        }
      );
      setLikesCount((prev) => prev + 1);
      setLiked(true);
    } catch (error) {
      console.error("Error liking the post:", error);
      toast.error("Failed to like the post");
    }
  };

  const togglePlayPause = () => {
    if (!isActive) {
      setActiveReel(id);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play();
        videoRef.current.muted = false;
      } else {
        videoRef.current.pause();
        videoRef.current.muted = true;
      }
    }
  }, [isActive]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (videoRef.current) {
            videoRef.current.play();
            videoRef.current.muted = false;
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.muted = true;
          }
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleSupport = async () => {
    try {
      if (!window.lukso) {
        toast.error("Please install the LUKSO UP extension.");
        return;
      }
      const amount = prompt("Enter the amount of LYX you want to send:");
      const provider = new ethers.BrowserProvider(window.lukso);
      const signer = await provider.getSigner();
      await signer.sendTransaction({
        to: creator_wallet,
        value: ethers.parseEther(amount),
      });
      toast.success("Transaction successful!");
    } catch (error) {
      toast.error("Transaction failed!");
      console.log("Error sending transaction:", error);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/reel/${id}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="relative rounded-none border-s border-e border-[#ffffff1f] flex flex-col h-[90vh] w-[30vw] max-sm:w-[100vw] ">
      <ViralToggle memeId={id} />
     

      <div className="flex flex-col  h-[76vh] w-[100vw] sm:w-full overflow-hidden items-center justify-center">
        {type === "video" ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover "
            src={media}
            autoPlay={isActive}
            loop
            playsInline
            onClick={togglePlayPause}
            muted={!isActive}
          />
        ) : (
          <img
            className="w-full h-full object-scale-down  "
            src={media}
            alt="Meme"
          />
        )}
      </div>

      <div
        className={`mb-[-4px] z-30 ease-in-out ${
          drawerOpen ? "h-min" : "h-[7vh]"
        } border border-white/10  bg-white/5 overflow-hidden backdrop-blur-lg shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-300 text-white p-4 flex-col flex absolute bottom-0 left-0 w-full rounded-t-3xl`}
      >
        <div className="absolute top-[40%] right-0 w-[600px] h-[200px] bg-purple-600 opacity-50 rounded-full blur-[140px] z-0" />
        <div className="absolute top-0 left-0 w-[600px] h-[200px] bg-purple-600 opacity-50 rounded-full blur-[140px] z-0" />

        <div className="relative  z-10">
          <h1
            className={`text-lg font-semibold text-white primary-font mb-2 ${
              drawerOpen ? "absolute mt-1 top-2" : "relative truncate"
            }`}
          >
            {title}
          </h1>

          <p
            className={`text-sm text-white z-10 transition-all duration-300 ease-in-out ${
              drawerOpen
                ? "h-[80%] mt-10 mb-4 overflow-auto"
                : "h-0 overflow-hidden"
            }`}
          >
            {description}
          </p>
        </div>

        <div
          className={`absolute left-1/2 transform -translate-x-1/2 z-10 ${
            drawerOpen ? "bottom-2" : "sm:bottom-6 bottom-9"
          }`}
        >
          <button
            onClick={toggleDrawer}
            className="bg-transparent text-lukso rounded-full"
          >
            <FaChevronUp
              size={20}
              className={`transform transition-transform duration-300 ${
                drawerOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* <ViralToggle memeId={id} /> */}

      <div className="absolute bottom-16 p-2 right-4 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center">
          <button onClick={handleLike}>
            {liked ? (
              <FaHeart size={30} color="red" />
            ) : (
              <FiHeart size={30} color="white" />
            )}
          </button>
          <span className="text-xs text-slate-300 mt-2">{likesCount}</span>
        </div>

        <div className="flex flex-col items-center">
          <button className="text-white" onClick={handleShare}>
            <FiSend size={28} />
          </button>
          <span className="text-xs text-white mt-1"> Share</span>
        </div>

        <div onClick={handleSupport} className="flex flex-col items-center">
          <button className="text-white rotate-[15deg] ">
            <FiZap size={28} />
          </button>
          <span className="text-xs text-white mt-1 mb-2">{shares} Boost</span>
        </div>
      </div>
    </div>
  );
};

export default Reel;
