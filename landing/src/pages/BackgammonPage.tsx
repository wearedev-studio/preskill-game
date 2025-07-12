import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Dice6, Trophy, Users, Clock, Star, Play, Target } from 'lucide-react';

const BackgammonPage: React.FC = () => {
  const tournaments = [
    {
      name: 'World Backgammon Series',
      prize: '$75,000',
      players: '1,456',
      startDate: '2024-02-16',
      status: 'upcoming'
    },
    {
      name: 'Mediterranean Masters',
      prize: '$30,000',
      players: '892',
      startDate: '2024-02-13',
      status: 'live'
    },
    {
      name: 'Speed Backgammon Cup',
      prize: '$12,000',
      players: '634',
      startDate: '2024-02-19',
      status: 'upcoming'
    }
  ];

  const gameFeatures = [
    {
      icon: Dice6,
      title: 'Dice Strategy',
      description: 'Master probability and risk management with every roll',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Target,
      title: 'Tactical Play',
      description: 'Balance offense and defense in this ancient game',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Clock,
      title: 'Quick Matches',
      description: 'Fast-paced games that test your decision-making',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Trophy,
      title: 'Big Rewards',
      description: 'Substantial prize pools for skilled players',
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  return (
    <>
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 bg-purple-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Dice6 className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
                Backgammon Masters
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                The perfect blend of strategy and luck. Roll the dice and race your checkers home in this 5,000-year-old game of skill.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Play Backgammon
                </button>
                <button className="px-8 py-4 border-2 border-purple-500 text-purple-500 font-semibold rounded-lg hover:bg-purple-500 hover:text-white transform hover:scale-105 transition-all duration-200">
                  Learn Rules
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Game Features */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
              Why Play Backgammon?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {gameFeatures.map((feature, index) => (
                <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Game Statistics */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">6,892</div>
                <div className="text-gray-400">Active Players</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">$1.2M</div>
                <div className="text-gray-400">Total Prizes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">892</div>
                <div className="text-gray-400">Daily Matches</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">5000+</div>
                <div className="text-gray-400">Years Old</div>
              </div>
            </div>
          </div>
        </section>

        {/* Active Tournaments */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
              Backgammon Tournaments
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tournaments.map((tournament, index) => (
                <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <Trophy className="w-8 h-8 text-purple-500" />
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tournament.status === 'live' ? 'bg-green-500 text-white' : 'bg-purple-500 text-white'
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
                      : 'bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700'
                  }`}>
                    {tournament.status === 'live' ? 'Join Now' : 'Register'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategy Tips */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
                  Master the Game
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-3 text-white">Opening Strategy</h3>
                    <p className="text-gray-400">Control key points early in the game to limit your opponent's movement and create strong positions.</p>
                  </div>
                  
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-3 text-white">Doubling Cube</h3>
                    <p className="text-gray-400">Master the doubling cube to maximize winnings when ahead and minimize losses when behind.</p>
                  </div>
                  
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-3 text-white">Endgame Technique</h3>
                    <p className="text-gray-400">Perfect your bearing off technique to secure victories in close endgame positions.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold mb-6 text-white">Game Basics</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Setup</h4>
                      <p className="text-gray-400 text-sm">Each player starts with 15 checkers arranged on specific points</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Movement</h4>
                      <p className="text-gray-400 text-sm">Roll two dice and move checkers according to the numbers shown</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Objective</h4>
                      <p className="text-gray-400 text-sm">Race all your checkers to your home board and bear them off</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Victory</h4>
                      <p className="text-gray-400 text-sm">First player to bear off all checkers wins the game</p>
                    </div>
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

export default BackgammonPage;