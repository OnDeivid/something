import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

export default function FirstTry() {
  const [votes, setVotes] = useState({ heroesCount: 0, goatCount: 0 });
  useEffect(() => { }, [votes.heroesCount, votes.goatCount])
  useEffect(() => {

    fetch('http://localhost:3000/get')
      .then(res => res.json()).then(({ count }) => setVotes(count));
    const pusher = new Pusher('ef16c9fb0777ee3b1eef', {
      cluster: 'eu',
      useTLS: true,
    });

    const channel = pusher.subscribe('chat-channel');


    channel.bind('heroesCountIncrease', (data) => {
      setVotes(data);
    });

    channel.bind('goatCountIncrease', (data) => {
      setVotes(data);

    });

    // update(channel, 'heroesCountIncrease')

  }, []);

  function update(channel, name) {
    channel.bind(name, (data) => {
      setVotes(data.count);
    });
    console.log(votes.goatCount)

  }

  const sendVote = async (name) => {
    await fetch(`http://localhost:3000/vote/${name}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  };
  return (
    <div className='flex justify-center w-full h-screen'>
      <div className='border-2 flex flex-col items-center justify-center w-1/3 h-2/4 m-2'>
        <h1 className='uppercase'>Vote Count: {votes.heroesCount}</h1>
        <button className='bg-slate-500 h-10 p-2 self-center' onClick={() => { sendVote('heroes') }}>
          Increase Vote
        </button>
      </div>

      <div className='border-2 flex flex-col items-center justify-center w-1/3 h-2/4 m-2'>
        <h1 className='uppercase'>Vote Count: {votes.goatCount}</h1>
        <button className='bg-slate-500 h-10 p-2 self-center' onClick={() => { sendVote('goat') }}>
          Increase Vote
        </button>
      </div>
    </div>
  );
}
