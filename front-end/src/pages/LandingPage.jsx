import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles, Flame } from "lucide-react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

const features = [
  [
    "Empowering Meme Creators",
    "Lykley celebrates creativity by allowing meme and reel creators to earn $LYK tokens when their content goes viral. No more likes without reward—your cultural impact now holds real value.",
  ],
  [
    "Gamified Virality Prediction",
    "Step into a prediction arena where users forecast which memes will blow up next and earn $LYK, and turn your meme sense into a strategy game.",
  ],
  //   [
  //     "Virality-Backed Value Creation",
  //     "Going viral isn't the end—it’s the beginning. Each viral post becomes a micro-asset in the Lykley ecosystem, rewarding its creator and fueling community-led value.",
  //   ],
  [
    "Trustfull & Transparent Mechanics",
    "All predictions, votes, and rewards are immutably recorded on the Lukso blockchain. No middlemen, no manipulation—just a secure system users can trust.",
  ],
  [
    "Powering the Meme Economy",
    "Lykley goes beyond entertainment by transforming meme culture into a decentralized economy. It’s a platform where creators, predictors, and fans grow together.",
  ],
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ParallaxProvider>
      <div className="w-full overflow-x-hidden mt-[-10vh] text-white relative">
        <div className="absolute top-[70px] left-[-200px] w-[400px] h-[500px] bg-lukso opacity-30 rounded-full blur-3xl  z-40" />
        <div className="absolute top-[270px] left-[400px] w-[400px] h-[200px] bg-[#c437c1] opacity-40 rounded-full blur-[120px]  z-40" />

        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6 }}
          style={{
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.05)",
          }}
          className="z-50 fixed top-6 mx-auto left-0 right-0 w-[90vw] max-w-[600px]
    px-4 py-2 md:px-6 md:py-3 rounded-full
    bg-white/10 backdrop-blur-xl
    flex items-center justify-between text-sm text-white font-medium"
        >
          <a
            href="#"
            className="text-lg sm:text-2xl flex items-end font-extrabold bg-gradient-to-r from-white via-lukso to-purple-500 bg-clip-text text-transparent drop-shadow-sm"
          >
            <img src="/logo.png" className="w-[40px] h-[35px] mr-2" />
            <span className="sm:mt-[2px] mt-[5px]">Lykley</span>
          </a>

          <nav className="hidden sm:flex space-x-4 sm:space-x-6 text-white/80">
            <a
              href="#features"
              className="hover:text-white transition-all duration-300"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-white transition-all duration-300"
            >
              How it Works
            </a>
            <a
              href="#join"
              className="hover:text-white transition-all duration-300"
            >
              Get Started
            </a>
          </nav>

          <div className="sm:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute top-[60px] right-4 w-48 bg-white/10 backdrop-blur-md rounded-xl p-4 text-white space-y-3 shadow-xl z-50 border border-white/20">
              <a
                href="#features"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-white/90"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-white/90"
              >
                How it Works
              </a>
              <a
                href="#join"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-white/90"
              >
                Join Beta
              </a>
            </div>
          )}
        </motion.header>

        {/* Hero Section */}
        <section className="w-full relative min-h-screen max-sm:pt-[15vh] bg-black overflow-hidden flex flex-col sm:justify-center items-start ">
          <div className="absolute max-sm:bottom-0 right-0 w-screen  h-[60vh] sm:w-[50vw] sm:h-screen overflow-hidden ">
            <Spline scene="https://prod.spline.design/QsNh7QWHRlvhNwlu/scene.splinecode" />
          </div>
          <Parallax speed={-10}>
            <h1 className="text-5xl md:text-7xl font-extrabold ml-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-lukso to-purple-500 drop-shadow-lg pb-3">
              Predict Meme Virality.
            </h1>
          </Parallax>
          <Parallax speed={-5}>
            <p className="text-lg sm:mt-12 md:text-xl z-30 ml-6 mr-6 text-white/80 mt-6 max-w-2xl">
              Vote with your vibes. Earn $LYK if your prediction hits. Join the
              Web3 meme movement powered by Lukso.
            </p>
          </Parallax>
          <div className="mt-10 ml-11 z-30">
            <Link to="/home">
              <Button className="bg-[#c81672]" variant="primary" icon={Flame}>
                Get Started
              </Button>
            </Link>
          </div>
        </section>

        {/* Trending Memes */}
        {/* <section
        id="features"
        className="w-full flex flex-col items-center px-6 md:px-20 py-24 bg-white/5 backdrop-blur-xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          🔥 Trending Memes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-screen-xl w-full">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-card p-6 rounded-2xl bg-white/10 backdrop-blur-md hover:scale-[1.03] transition duration-300 shadow-lg flex flex-col items-center"
            >
              <div className="w-full aspect-video bg-gradient-to-br from-purple-500 via-lukso to-yellow-300 rounded-lg mb-4 animate-gradient-x" />
              <p className="text-white/90 font-medium mb-3">Meme #{i}</p>
              <Button variant="secondary" className="w-full">
                Predict 🔮
              </Button>
            </div>
          ))}
        </div>
      </section> */}

        {/* Features Section */}
        <section
          id="features"
          className="relative w-full min-h-screen flex flex-col items-center px-6 md:px-20 py-32 bg-black text-white"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl font-extrabold mb-20 text-center bg-gradient-to-r from-lukso to-purple-300 bg-clip-text text-transparent"
          >
            Features
          </motion.h2>

          <div className="flex flex-col gap-20 max-w-6xl w-full z-10">
            {features.map(([title, desc], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className={`relative px-10 py-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] transition-all duration-300 md:w-[85%] ${
                  i % 2 === 0 ? "md:self-start" : "md:self-end"
                }`}
              >
                <h3 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-lukso to-purple-300 bg-clip-text text-transparent">
                  {title}
                </h3>
                <p className="text-lg leading-relaxed text-white/70">{desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="absolute top-[30%] left-[50%] w-[600px] h-[400px] bg-purple-600 opacity-40 rounded-full blur-[140px] z-0" />
          <div className="absolute top-[60%] left-[10%] w-[600px] h-[400px] bg-purple-600 opacity-40 rounded-full blur-[140px] z-0" />
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="relative w-full min-h-screen flex flex-col items-center px-6 md:px-20 py-32 bg-black text-white"
        >
          <div className="absolute inset-0 z-0 opacity-10 overflow-hidden">
            <img
              src="/ab.jpg"
              draggable="false"
              className="w-full h-full object-cover blur-[2px]"
            />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl font-extrabold mb-20 text-center bg-gradient-to-r from-lukso to-purple-300 bg-clip-text text-transparent z-10"
          >
            ✨ How It Works
          </motion.h2>

          <div className="flex flex-col md:flex-row gap-10 z-10 max-w-6xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-1 px-10 py-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] transition-all duration-300"
            >
              <h3 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-lukso to-purple-300 bg-clip-text text-transparent">
                Our Virality Algorithm
              </h3>
              <p className="text-lg leading-relaxed text-white/70">
                To be added.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex-1 px-10 py-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] transition-all duration-300"
            >
              <h3 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-purple-300 to-lukso bg-clip-text text-transparent">
                Our Reward Algorithm
              </h3>
              <p className="text-lg leading-relaxed text-white/70">
                When a meme goes viral, the prediction pool is distributed among
                all correct voters and the original content creator, each
                receiving a share of the $LYK rewards. A small portion is
                retained by the platform as a service fee to support ongoing
                development and growth.
              </p>
            </motion.div>
          </div>

          <div className="absolute top-[40%] left-[50%] w-[600px] h-[400px] bg-purple-600 opacity-40 rounded-full blur-[140px] z-0" />
          <div className="absolute top-[40%] left-[10%] w-[600px] h-[400px] bg-purple-600 opacity-40 rounded-full blur-[140px] z-0" />
        </section>

        <section
          id="join"
          className="w-full min-h-[40vh] flex flex-col justify-center items-center px-6 md:px-20 py-10 text-center bg-black backdrop-blur-md"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Be Part of the Memevolution
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl">
            The internet’s future runs on memes. Your prediction = your power.
          </p>
          <Link to="/home">
            <Button variant="primary">Get Started</Button>
          </Link>
        </section>

        {/* Footer */}
        <footer className="pb-6 text-center bg-black text-white/40 text-sm">
          © 2025 Lykley • Built with ❤️ on Lukso
        </footer>
      </div>
    </ParallaxProvider>
  );
}
