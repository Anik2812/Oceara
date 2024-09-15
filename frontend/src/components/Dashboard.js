import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Camera, Leaf, Coins } from 'lucide-react';

// Simple Alert component
const Alert = ({ title, description }) => (
  <div className="fixed bottom-4 right-4 w-64 bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
    <p className="font-bold">{title}</p>
    <p>{description}</p>
  </div>
);

const Dashboard = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [userData, setUserData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [Coinss, setCoinss] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          // Use the token to fetch user data from your API
          await fetchUserData(token);
          await fetchUserActivities(token);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Failed to load user data. Please try again later.');
        }
      }
    };

    fetchData();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  const fetchUserData = async (token) => {
    // Replace with actual API call
    setUserData({
      name: user.name,
      wasteCleaned: 150,
      treesPlanted: 10,
      Coinss: 500
    });
    setCoinss(500);
  };

  const fetchUserActivities = async (token) => {
    // Replace with actual API call
    setActivities([
      { date: '2023-01-01', amount: 5, type: 'Waste Cleaned' },
      { date: '2023-01-15', amount: 1, type: 'Tree Planted' },
      { date: '2023-02-01', amount: 8, type: 'Waste Cleaned' },
      { date: '2023-02-15', amount: 2, type: 'Tree Planted' },
      { date: '2023-03-01', amount: 10, type: 'Waste Cleaned' },
    ]);
  };

  const handlePhotoUpload = (event) => {
    // Implement actual photo upload logic here
    setTimeout(() => {
      setUserData(prev => ({
        ...prev,
        wasteCleaned: prev.wasteCleaned + 1,
        Coinss: prev.Coinss + 10
      }));
      setCoinss(prev => prev + 10);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }, 1000);
  };

  const handleTreePlanted = () => {
    // Implement actual tree planting logic here
    setTimeout(() => {
      setUserData(prev => ({
        ...prev,
        treesPlanted: prev.treesPlanted + 1,
        Coinss: prev.Coinss + 50
      }));
      setCoinss(prev => prev + 50);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }, 1000);
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (!isAuthenticated) {
    return <div className="text-center mt-8">Please log in to view your dashboard.</div>;
  }

  if (!userData) {
    return <div className="text-center mt-8">No user data available. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Welcome to Your Oceara Dashboard, {userData.name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Your Impact</h2>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-4xl font-bold text-red-500">{userData.wasteCleaned} kg</p>
              <p className="text-gray-600">Waste Collected</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-500">{userData.treesPlanted}</p>
              <p className="text-gray-600">Trees Planted</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Upload Activity</h2>
          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="photo-upload" className="bg-blue-500 text-white px-6 py-3 rounded-md cursor-pointer flex items-center justify-center text-lg">
                <Camera className="mr-2" />
                Upload Litter Photo
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>
            <button
              onClick={handleTreePlanted}
              className="bg-green-500 text-white px-6 py-3 rounded-md flex items-center justify-center text-lg"
            >
              <Leaf className="mr-2" />
              Record Tree Planted
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Your Rewards</h2>
          <div className="flex items-center justify-center">
            <Coins className="text-yellow-500 mr-2" size={48} />
            <p className="text-4xl font-bold">{Coinss}</p>
          </div>
          <p className="text-center text-gray-600 mt-2">Coinss Earned</p>
          <button className="bg-purple-500 text-white px-6 py-3 rounded-md w-full mt-6 text-lg">Redeem Rewards</button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Your Activity</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={activities}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#3B82F6" name="Activity Amount" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {showAlert && (
        <Alert 
          title="Success!"
          description="Activity recorded. Coinss added to your account."
        />
      )}
    </div>
  );
};

export default Dashboard;