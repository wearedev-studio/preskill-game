import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Crown, Trophy, Users, Clock, Star, Play } from 'lucide-react';

const ChessPage: React.FC = () => {
  const tournaments = [
    {
      name: 'Grand Master Championship',
      prize: '$100,000',
      players: '2,567',
      startDate: '2024-02-15',
      status: 'upcoming'
    },
    {
      name: 'Speed Chess Blitz',
      prize: '$25,000',
      players: '1,234',
      startDate: '2024-02-12',
      status: 'live'
    },
    {
      name: 'Weekly Chess Masters',
      prize: '$10,000',
      players: '856',
      startDate: '2024-02-18',
      status: 'upcoming'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Magnus_Carlsen_Pro', rating: 2847, winnings: '$45,230' },
    { rank: 2, name: 'ChessGrandmaster99', rating: 2834, winnings: '$38,450' },
    { rank: 3, name: 'QueenSacrifice', rating: 2821, winnings: '$32,100' },
    { rank: 4, name: 'KnightRider2024', rating: 2809, winnings: '$28,750' },
    { rank: 5, name: 'CheckmateKing', rating: 2798, winnings: '$25,600' }
  ];

  return (
    <>
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center">
                  <Crown className="w-10 h-10 text-black" />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Chess Masters
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                The ultimate test of strategic thinking. Compete against grandmasters and chess enthusiasts worldwide for substantial cash prizes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Play Chess Now
                </button>
                <button className="px-8 py-4 border-2 border-yellow-500 text-yellow-500 font-semibold rounded-lg hover:bg-yellow-500 hover:text-black transform hover:scale-105 transition-all duration-200">
                  Watch Live Games
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Game Stats */}
        <section className="py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">15,234</div>
                <div className="text-gray-400">Active Players</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">$2.5M</div>
                <div className="text-gray-400">Total Prizes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">1,567</div>
                <div className="text-gray-400">Daily Games</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-gray-400">Tournaments</div>
              </div>
            </div>
          </div>
        </section>

        {/* Active Tournaments */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Active Chess Tournaments
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tournaments.map((tournament, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tournament.status === 'live' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'
                    }`}>
                      {tournament.status === 'live' ? 'Live Now' : 'Upcoming'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-white">{tournament.name}</h3>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Prize Pool:</span>
                      <span className="text-green-400 font-semibold">{tournament.prize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Players:</span>
                      <span className="text-blue-400 font-semibold">{tournament.players}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Start Date:</span>
                      <span className="text-purple-400 font-semibold">{tournament.startDate}</span>
                    </div>
                  </div>
                  
                  <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                    tournament.status === 'live' 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700' 
                      : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-600 hover:to-yellow-700'
                  }`}>
                    {tournament.status === 'live' ? 'Join Now' : 'Register'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leaderboard */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Chess Leaderboard
            </h2>
            
            <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
              <div className="grid grid-cols-5 gap-4 p-6 border-b border-gray-700 bg-gray-800">
                <div className="font-semibold text-gray-300">Rank</div>
                <div className="font-semibold text-gray-300">Player</div>
                <div className="font-semibold text-gray-300">Rating</div>
                <div className="font-semibold text-gray-300">Winnings</div>
                <div className="font-semibold text-gray-300">Status</div>
              </div>
              
              {leaderboard.map((player) => (
                <div key={player.rank} className="grid grid-cols-5 gap-4 p-6 border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-yellow-400">#{player.rank}</span>
                    {player.rank <= 3 && <Star className="w-4 h-4 text-yellow-500" />}
                  </div>
                  <div className="font-semibold text-white">{player.name}</div>
                  <div className="text-blue-400 font-semibold">{player.rating}</div>
                  <div className="text-green-400 font-semibold">{player.winnings}</div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Online</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Play */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              How to Play Chess for Money
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Create Account</h3>
                <p className="text-gray-400">Sign up and verify your identity for secure gameplay</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Choose Match</h3>
                <p className="text-gray-400">Select from casual games or competitive tournaments</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Play & Win</h3>
                <p className="text-gray-400">Use your chess skills to outmaneuver opponents</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Claim Prize</h3>
                <p className="text-gray-400">Withdraw your winnings instantly to your account</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ChessPage;