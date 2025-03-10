import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

export default function FirstTry() {
  const [votes, setVotes] = useState({ heroesCount: 0, goatCount: 0 });

  useEffect(() => {
    const pusher = new Pusher('825cb99923b8b343513f', {
      cluster: 'eu',
      useTLS: true,
    });

    const channel = pusher.subscribe('chat-channel');

    channel.bind('heroesCountIncrease', (data) => {
      console.log(data)
      setVotes((prev) => ({ ...prev, ...data }));
    });

    channel.bind('goatCountIncrease', (data) => {
      console.log(data)
      setVotes((prev) => ({ ...prev, ...data }));
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []); // No unnecessary re-subscribing

  const sendVote = async (name) => {
    try {
      await fetch(`https://something-gilt.vercel.app/vote/${name}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className='flex justify-center w-full h-screen'>
      <div className='border-2 flex flex-col items-center justify-center w-1/3 h-2/4 m-2'>
        <h1 className='uppercase'>Vote Count: {votes.heroesCount}</h1>
        <button className='bg-slate-500 h-10 p-2 self-center' onClick={() => sendVote('heroes')}>
          Increase Vote
        </button>
      </div>

      <div className='border-2 flex flex-col items-center justify-center w-1/3 h-2/4 m-2'>
        <h1 className='uppercase'>Vote Count: {votes.goatCount}</h1>
        <button className='bg-slate-500 h-10 p-2 self-center' onClick={() => sendVote('goat')}>
          Increase Vote
        </button>
      </div>
    </div>
  );
}
