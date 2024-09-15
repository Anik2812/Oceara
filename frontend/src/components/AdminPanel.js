import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const AdminPanel = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [unverifiedActivities, setUnverifiedActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnverifiedActivities = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get('/api/admin/unverified', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUnverifiedActivities(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching unverified activities:', error);
        setLoading(false);
      }
    };

    fetchUnverifiedActivities();
  }, [getAccessTokenSilently]);

  const handleVerify = async (activityId) => {
    try {
      const token = await getAccessTokenSilently();
      await axios.post(`/api/admin/verify/${activityId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Remove the verified activity from the list
      setUnverifiedActivities(unverifiedActivities.filter(activity => activity._id !== activityId));
    } catch (error) {
      console.error('Error verifying activity:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-panel">
      <h1 className="text-3xl font-bold text-ocean-blue mb-8">Admin Panel</h1>
      <div className="card">
        <h2 className="text-2xl font-semibold mb-4">Unverified Activities</h2>
        {unverifiedActivities.length === 0 ? (
          <p>No unverified activities at the moment.</p>
        ) : (
          <ul className="space-y-4">
            {unverifiedActivities.map((activity) => (
              <li key={activity._id} className="bg-gray-100 p-4 rounded-lg">
                <p><strong>User:</strong> {activity.userId.name}</p>
                <p><strong>Type:</strong> {activity.type}</p>
                <p><strong>Amount:</strong> {activity.amount}</p>
                <p><strong>Date:</strong> {new Date(activity.timestamp).toLocaleString()}</p>
                {activity.mediaUrl && (
                  <img src={activity.mediaUrl} alt="Activity proof" className="mt-2 max-w-xs rounded-lg" />
                )}
                <button
                  onClick={() => handleVerify(activity._id)}
                  className="mt-2 btn btn-primary"
                >
                  Verify Activity
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;