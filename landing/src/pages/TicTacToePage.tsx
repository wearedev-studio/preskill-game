import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Grid3X3, Trophy, Users, Clock, Zap, Play, Target } from 'lucide-react';

const TicTacToePage: React.FC = () => {
  const tournaments = [
    {
      name: 'Lightning Tic-Tac-Toe Blitz',
      prize: '$10,000',
      players: '3,456',
      startDate: '2024-02-12',
      status: 'live'
    },
    {
      name: 'Speed Masters Tournament',
      prize: '$5,000',
      players: '2,134',
      startDate: '2024-02-15',
      status: 'upcoming'
    },
    {
      name: 'Weekend Warriors Cup',
      prize: '$3,000',
      players: '1,789',
      startDate: '2024-02-17',
      status: 'upcoming'
    }
  ];

  const gameVariants = [
    {
      name: 'Classic 3x3',
      description: 'Traditional tic-tac-toe on a 3x3 grid',
      difficulty: 'Beginner',
      prize: '$100-$500'
    },
    {
      name: 'Ultimate Tic-Tac-Toe',
      description: '9 mini-grids within a larger 3x3 grid',
      difficulty: 'Advanced',
      prize: '$500-$2000'
    },
    {
      name: 'Speed Rounds',
      description: 'Quick 30-second decision matches',
      difficulty: 'Intermediate',
      prize: '$200-$1000'
    },
    {
      name: '3D Tic-Tac-Toe',
      description: 'Multi-dimensional strategic gameplay',
      difficulty: 'Expert',
      prize: '$1000-$5000'
    }
  ];

  return (
    <>
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 bg-green-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-cyan-600 rounded-2xl flex items-center justify-center">
                  <Grid3X3 className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-cyan-600 bg-clip-text text-transparent">
                Tic-Tac-Toe Arena
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Simple to learn, challenging to master. Compete in lightning-fast matches and prove your strategic thinking in this classic game.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Quick Match
                </button>
                <button className="px-8 py-4 border-2 border-green-500 text-green-500 font-semibold rounded-lg hover:bg-green-500 hover:text-white transform hover:scale-105 transition-all duration-200">
                  Join Tournament
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
                <div className="text-4xl font-bold text-green-400 mb-2">12,445</div>
                <div className="text-gray-400">Active Players</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">30 sec</div>
                <div className="text-gray-400">Average Game</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">$250K</div>
                <div className="text-gray-400">Monthly Prizes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-gray-400">Instant Matches</div>
              </div>
            </div>
          </div>
        </section>

        {/* Game Variants */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-green-400 to-cyan-600 bg-clip-text text-transparent">
              Game Variants
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {gameVariants.map((variant, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{variant.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      variant.difficulty === 'Beginner' ? 'bg-green-500 text-white' :
                      variant.difficulty === 'Intermediate' ? 'bg-yellow-500 text-black' :
                      variant.difficulty === 'Advanced' ? 'bg-orange-500 text-white' :
                      'bg-red-500 text-white'
                    }`}>
                      {variant.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{variant.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500">Prize Range:</span>
                      <div className="text-green-400 font-semibold">{variant.prize}</div>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-cyan-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-cyan-700 transition-all duration-200">
                      Play Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Active Tournaments */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-green-400 to-cyan-600 bg-clip-text text-transparent">
              Live Tournaments
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tournaments.map((tournament, index) => (
                <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <Trophy className="w-8 h-8 text-green-500" />
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tournament.status === 'live' ? 'bg-green-500 text-white' : 'bg-cyan-500 text-white'
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
                      : 'bg-gradient-to-r from-green-500 to-cyan-600 text-white hover:from-green-600 hover:to-cyan-700'
                  }`}>
                    {tournament.status === 'live' ? 'Join Now' : 'Register'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategy & Tips */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-cyan-600 bg-clip-text text-transparent">
                  Winning Strategies
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">Control the Center</h3>
                      <p className="text-gray-400">The center square gives you the most winning opportunities. Secure it early when possible.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">Block Opponent</h3>
                      <p className="text-gray-400">If you can't win immediately, focus on blocking your opponent's winning moves.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">Think Fast</h3>
                      <p className="text-gray-400">In speed tournaments, quick decision-making is crucial. Practice pattern recognition.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold mb-6 text-white">Quick Facts</h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="font-semibold text-white">Perfect Information Game</span>
                    </div>
                    <p className="text-gray-400 text-sm">No hidden information - pure strategy and psychology</p>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="font-semibold text-white">Optimal Play Exists</span>
                    </div>
                    <p className="text-gray-400 text-sm">With perfect play, the first player can always force a draw</p>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="font-semibold text-white">Lightning Fast</span>
                    </div>
                    <p className="text-gray-400 text-sm">Games typically last 30 seconds to 2 minutes</p>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="font-semibold text-white">High Volume</span>
                    </div>
                    <p className="text-gray-400 text-sm">Play hundreds of games per hour in tournaments</p>
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

export default TicTacToePage;