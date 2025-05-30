import React from 'react'

const MatchCard = ({ match }) => {

  const parsedDate = new Date(`${match.date} ${match.time}`);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className='bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition-transform'>
      <div className='flex justify-between items-center mb-2'>
        <h2 className='text-xl font-semibold text-gray-800'>
          {match.homeTeam} vs {match.awayTeam}
        </h2>
        <span className='text-indigo-600 font-medium'>{match.league}</span>
      </div>
      <p className='text-gray-600'>
        {parsedDate.toString() === 'Invalid Date'
          ? `${match.date} at ${match.time}`
          : parsedDate.toLocaleDateString('en-US', options) + ' at ' + parsedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  )
}

export default MatchCard;
