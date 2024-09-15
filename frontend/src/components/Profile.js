import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile">
      <h1 className="text-3xl font-bold text-ocean-blue mb-8">Your Profile</h1>
      
      <div className="card">
        <div className="flex items-center mb-6">
          <img src={user.picture} alt={user.name} className="w-24 h-24 rounded-full mr-6" />
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Your Impact</h3>
            <p><span className="font-bold text-coral">158 kg</span> of waste collected</p>
            <p><span className="font-bold text-seagreen">42</span> trees planted</p>
            <p><span className="font-bold text-ocean-blue">1,250</span> points earned</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Badges Earned</h3>
            <div className="flex space-x-4">
              <div className="text-center">
                <img src="/images/beach-cleanup-badge.svg" alt="Beach Cleanup Badge" className="w-16 h-16 mb-2" />
                <p className="text-sm">Beach Cleaner</p>
              </div>
              <div className="text-center">
                <img src="/images/tree-planter-badge.svg" alt="Tree Planter Badge" className="w-16 h-16 mb-2" />
                <p className="text-sm">Tree Planter</p>
              </div>
              <div className="text-center">
                <img src="/images/recycling-master-badge.svg" alt="Recycling Master Badge" className="w-16 h-16 mb-2" />
                <p className="text-sm">Recycling Master</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;