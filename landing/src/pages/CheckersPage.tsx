import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, Trophy, Users, Clock, Star, Play } from 'lucide-react';

const CheckersPage: React.FC = () => {
  const tournaments = [
    {
      name: 'International Checkers Championship',
      prize: '$50,000',
      players: '1,834',
      startDate: '2024-02-14',
      status: 'upcoming'
    },
    {
      name: 'Speed Checkers Blitz',
      prize: '$15,000',
      players: '967',
      startDate: '2024-02-11',
      status: 'live'
    },
    {
      name: 'Weekend Warriors',
      prize: '$8,000',
      players: '543',
      startDate: '2024-02-17',
      status: 'upcoming'
    }
  ];

  const strategies = [
    {
      title: 'Control the Center',
      description: 'Dominate the center squares to limit your opponent\'s movement options.',
      icon: '🎯'
    },
    {
      title: 'King Safety',
      description: 'Protect your pieces while advancing strategically toward promotion.',
      icon: '👑'
    },
    {
      title: 'Force Trades',
      description: 'When ahead, trade pieces to simplify the position and secure victory.',
      icon: '⚔️'
    },
    {
      title: 'Tempo Control',
      description: 'Maintain initiative by forcing your opponent to respond to your moves.',
      icon: '⚡'
    }
  ];

  return (
    <>
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 bg-red-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl flex items-center justify-center">
                  <Shield className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-600 bg-clip-text text-transparent">
                Checkers Arena
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Master the classic game of strategy and tactics. Jump your way to victory in competitive checkers tournaments with real money prizes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Play Checkers Now
                </button>
                <button className="px-8 py-4 border-2 border-red-500 text-red-500 font-semibold rounded-lg hover:bg-red-500 hover:text-white transform hover:scale-105 transition-all duration-200">
                  Watch Tournaments
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Game Features */}
        <section className="py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">8,567 Players</h3>
                <p className="text-gray-400">Active checkers community worldwide</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">$500K+ Prizes</h3>
                <p className="text-gray-400">Total winnings distributed to players</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Fast Matches</h3>
                <p className="text-gray-400">Quick 10-15 minute games available</p>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Guide */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-red-400 to-orange-600 bg-clip-text text-transparent">
              Winning Strategies
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {strategies.map((strategy, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-red-500 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{strategy.icon}</div>
                    <h3 className="text-xl font-bold text-white">{strategy.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{strategy.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Active Tournaments */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-red-400 to-orange-600 bg-clip-text text-transparent">
              Checkers Tournaments
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tournaments.map((tournament, index) => (
                <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-red-500 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <Trophy className="w-8 h-8 text-red-500" />
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tournament.status === 'live' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                    }`}>
                      {tournament.status === 'live' ? 'Live Now' : 'Upcoming'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-white">{tournament.name}</h3>
                  
                  <div className="space-y-3 mb-6">
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
                      : 'bg-gradient-to-r from-red-500 to-orange-600 text-white hover:from-red-600 hover:to-orange-700'
                  }`}>
                    {tournament.status === 'live' ? 'Join Tournament' : 'Register Now'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Game Rules */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-600 bg-clip-text text-transparent">
                  Game Rules
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <p className="text-gray-300">Move your pieces diagonally forward on dark squares only</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <p className="text-gray-300">Jump over opponent pieces to capture them</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <p className="text-gray-300">Reach the opposite end to crown your piece as a King</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <p className="text-gray-300">Win by capturing all opponent pieces or blocking their moves</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold mb-6 text-white">Quick Start Guide</h3>
                <div className="space-y-4">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Beginner Level</h4>
                    <p className="text-gray-400 text-sm">Start with practice games to learn the basics</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Intermediate Level</h4>
                    <p className="text-gray-400 text-sm">Join low-stakes tournaments to build experience</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Expert Level</h4>
                    <p className="text-gray-400 text-sm">Compete in high-stakes championships</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CheckersPage;