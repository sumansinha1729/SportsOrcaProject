import React, { useEffect, useState } from 'react';
import MatchCard from './components/MatchCard'

const App = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch('http://localhost:3002/api/matches');
        const data = await res.json();

        if (res.ok) {
          setMatches(data.matches);
        } else {
          setError(data.error || 'Something went wrong');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <div className="p-6 text-lg">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <>
      <div className='text-5xl pl-10 mt-8 text-blue-500 mb-3'>
        Upcoming Basketball Matches
      </div>
      <hr/>
      <div className='p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
         {matches.length === 0 ? (
        <p>No matches found for today.</p>
      ) : (
        matches.map((match, index) => (
          <MatchCard key={index} match={match} />
        ))
      )}
      </div>
   
    </>
  );
};

export default App;
