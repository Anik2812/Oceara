import React from 'react';

const LeaderBoard = () => {
  // Mock data for the leaderboard
  const leaderboardData = [
    { rank: 1, name: 'Jane Doe', points: 1250, wasteCleaned: 320, treesPlanted: 85 },
    { rank: 2, name: 'John Smith', points: 1100, wasteCleaned: 280, treesPlanted: 75 },
    { rank: 3, name: 'Alice Johnson', points: 950, wasteCleaned: 240, treesPlanted: 65 },
    { rank: 4, name: 'Bob Williams', points: 800, wasteCleaned: 200, treesPlanted: 55 },
    { rank: 5, name: 'Emma Brown', points: 750, wasteCleaned: 190, treesPlanted: 50 },
  ];

  return (
    <div className="leaderboard">
      <h1 className="text-3xl font-bold text-ocean-blue mb-8">Leaderboard</h1>
      
      <div className="card overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-ocean-blue text-white">
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Points</th>
              <th className="px-4 py-2">Waste Cleaned (kg)</th>
              <th className="px-4 py-2">Trees Planted</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user) => (
              <tr key={user.rank} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2 text-center">{user.rank}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2 text-center font-bold text-ocean-blue">{user.points}</td>
                <td className="px-4 py-2 text-center text-coral">{user.wasteCleaned}</td>
                <td className="px-4 py-2 text-center text-seagreen">{user.treesPlanted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;