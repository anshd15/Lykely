import React, { useEffect, useState } from "react";
import {
  Search,
  Trophy,
  ImagePlus,
  TrendingUp,
  Heart,
  LucideXCircle,
  CheckCircle2Icon,
  CopyIcon,
} from "lucide-react";
import { MemesGrid } from "../components/MemeGrid";
import { BetsGrid } from "../components/BetsGrid";
import axios from "axios";
import toast from "react-hot-toast";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("memes");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [betStatusFilter, setBetStatusFilter] = useState("all");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/api/users/get",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserData(response.data.user);
      console.log(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMemes = userData?.createdMemes
    .filter((meme) =>
      meme.title?.toLowerCase().includes(searchQuery?.toLowerCase())
    )
    .sort((a, b) => {
      if (activeFilter === "latest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (activeFilter === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  const filteredBets = userData?.bets
    .filter(
      (bet) =>
        bet.memeTitle?.toLowerCase().includes(searchQuery?.toLowerCase()) &&
        (betStatusFilter === "all" || bet.status === betStatusFilter)
    )
    .sort((a, b) => {
      if (activeFilter === "latest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (activeFilter === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white">Loading...</p>
      </div>
    );
  }
  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Wallet Address Copied to clipboard!");
    });
  };
  return (
    <div className="h-[90vh] overflow-scroll hide-scrollbar bg-black text-white p-6">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">
          Welcome,{" "}
          <span className="text-[#FE005B] italic">{userData?.username}</span>
        </h1>
        <button
          className="text-[#FE005B] text-xl flex justify-start items-center gap-2 mb-4 cursor-pointer"
          onClick={() => handleCopyToClipboard(userData?.walletAddress)}
        >
          {userData?.walletAddress.slice(0, 6)}.....
          {userData?.walletAddress.slice(-4)}
          <CopyIcon className="w-5" />
        </button>
        <div className="bg-[#111111] rounded-2xl p-6 flex justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[#FE005B]" />
            <p className="text-xl font-semibold text-[#FE005B]">
              ${userData?.totalAmount || 0}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2Icon className="w-6 h-6 text-green-400" />
            <p className="text-green-400 text-xl">
              {userData?.totalBetsWon || 0} Won
            </p>
          </div>
          <div className="flex items-center gap-2">
            <LucideXCircle className="w-6 h-6 text-red-400" />
            <p className="text-red-400 text-xl">
              {userData?.totalBetsLost || 0} Lost
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ImagePlus className="w-6 h-6 text-blue-400" />
            <p className="text-blue-400 text-xl">
              {userData?.memesPosted || 0} Memes
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            className="w-full px-10 py-2 bg-[#111111] border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-[#FE005B] outline-none"
            placeholder="Search memes or bets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {activeTab === "memes" ? (
          <div className="flex gap-2">
            {["all", "latest", "oldest"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl capitalize transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-[#FE005B] text-black"
                    : "bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex gap-2">
            {["all", "won", "lost"].map((status) => (
              <button
                key={status}
                onClick={() => setBetStatusFilter(status)}
                className={`px-4 py-2 rounded-xl capitalize transition-all duration-200 ${
                  betStatusFilter === status
                    ? "bg-[#FE005B] text-black"
                    : "bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex mb-6 gap-2">
        <button
          onClick={() => setActiveTab("memes")}
          className={`flex items-center px-4 py-2 font-medium transition-colors rounded-xl ${
            activeTab === "memes"
              ? "text-black bg-[#FE005B]"
              : "text-white bg-[#2a2a2a] hover:bg-[#3a3a3a]"
          }`}
        >
          <ImagePlus className="w-4 h-4 mr-2" />
          My Memes
        </button>
        <button
          onClick={() => setActiveTab("bets")}
          className={`flex items-center px-4 py-2 font-medium transition-colors rounded-xl ${
            activeTab === "bets"
              ? "text-black bg-[#FE005B]"
              : "text-white bg-[#2a2a2a] hover:bg-[#3a3a3a]"
          }`}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          My Bets
        </button>
      </div>

      {activeTab === "memes" ? (
        <MemesGrid memes={filteredMemes} />
      ) : (
        <BetsGrid bets={filteredBets} />
      )}
    </div>
  );
};

export default UserDashboard;
