import React, { useState } from 'react';
import {
  Search,
  Trophy,
  ImagePlus,
  TrendingUp,
  Heart,
  LucideXCircle,
  CheckCircle2Icon,
} from 'lucide-react';
import { MemesGrid } from '../components/MemeGrid';
import { BetsGrid } from '../components/BetsGrid';

const dummyData = {
  username: 'lolcatz',
  totalBetsWon: 3,
  totalBetsLost: 1,
  totalAmount: 1800,
  memesPosted: 4,
  memes: [
    {
      id: 1,
      title: 'Web3 Problems',
      likes: 234,
      date: '2024-01-28',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrSHffAqYqYsZhUL2N4-AUiXQaqF_j0i4DgQ&s',
    },
    {
      id: 2,
      title: 'Bear Market Vibes',
      likes: 120,
      date: '2024-02-10',
      image:
        'https://i.kym-cdn.com/entries/icons/mobile/000/046/023/cover1.jpg',
    },
  ],
  bets: [
    {
      id: 1,
      amount: 100,
      choice: 'viral',
      status: 'won',
      date: '2024-01-25',
      memeTitle: 'Web3 Problems',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrSHffAqYqYsZhUL2N4-AUiXQaqF_j0i4DgQ&s',
    },
    {
      id: 2,
      amount: 75,
      choice: 'non-viral',
      status: 'lost',
      date: '2024-01-20',
      memeTitle: 'MemeCoin Madness',
      image:
        'https://pbs.twimg.com/media/EX4CyEzWsAIbzLn.jpg',
    },
  ],
};

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('memes');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [betStatusFilter, setBetStatusFilter] = useState('all');

  const filteredMemes = dummyData.memes
    .filter((meme) =>
      meme.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (activeFilter === 'latest') return new Date(b.date) - new Date(a.date);
      if (activeFilter === 'oldest') return new Date(a.date) - new Date(b.date);
      return 0;
    });

  const filteredBets = dummyData.bets
    .filter(
      (bet) =>
        bet.memeTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (betStatusFilter === 'all' || bet.status === betStatusFilter)
    )
    .sort((a, b) => {
      if (activeFilter === 'latest') return new Date(b.date) - new Date(a.date);
      if (activeFilter === 'oldest') return new Date(a.date) - new Date(b.date);
      return 0;
    });

  return (
    <div className="h-[90vh] overflow-scroll hide-scrollbar bg-black text-white p-6">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">
          Welcome, <span className="text-[#FE005B] italic">{dummyData.username}</span>
        </h1>

        <div className="bg-[#111111] rounded-2xl p-6 flex justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[#FE005B]" />
            <p className="text-xl font-semibold text-[#FE005B]">${dummyData.totalAmount}</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2Icon className="w-6 h-6 text-green-400" />
            <p className="text-green-400 text-xl">{dummyData.totalBetsWon} Won</p>
          </div>
          <div className="flex items-center gap-2">
            <LucideXCircle className="w-6 h-6 text-red-400" />
            <p className="text-red-400 text-xl">{dummyData.totalBetsLost} Lost</p>
          </div>
          <div className="flex items-center gap-2">
            <ImagePlus className="w-6 h-6 text-blue-400" />
            <p className="text-blue-400 text-xl">{dummyData.memesPosted} Memes</p>
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

        {activeTab === 'memes' ? (
          <div className="flex gap-2">
            {['all', 'latest', 'oldest'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl capitalize transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-[#FE005B] text-black'
                    : 'bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex gap-2">
            {['all', 'won', 'lost'].map((status) => (
              <button
                key={status}
                onClick={() => setBetStatusFilter(status)}
                className={`px-4 py-2 rounded-xl capitalize transition-all duration-200 ${
                  betStatusFilter === status
                    ? 'bg-[#FE005B] text-black'
                    : 'bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]'
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
          onClick={() => setActiveTab('memes')}
          className={`flex items-center px-4 py-2 font-medium transition-colors rounded-xl ${
            activeTab === 'memes'
              ? 'text-black bg-[#FE005B]'
              : 'text-white bg-[#2a2a2a] hover:bg-[#3a3a3a]'
          }`}
        >
          <ImagePlus className="w-4 h-4 mr-2" />
          My Memes
        </button>
        <button
          onClick={() => setActiveTab('bets')}
          className={`flex items-center px-4 py-2 font-medium transition-colors rounded-xl ${
            activeTab === 'bets'
              ? 'text-black bg-[#FE005B]'
              : 'text-white bg-[#2a2a2a] hover:bg-[#3a3a3a]'
          }`}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          My Bets
        </button>
      </div>

      {activeTab === 'memes' ? (
        <MemesGrid memes={filteredMemes} />
      ) : (
        <BetsGrid bets={filteredBets} />
      )}
    </div>
  );
};

export default UserDashboard;
