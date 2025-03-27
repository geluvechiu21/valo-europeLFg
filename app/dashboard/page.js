"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://107.174.35.18:3001/auth/me")
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch user:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-white mt-10">Loading...</p>;
  if (!user) return <p className="text-center text-red-400 mt-10">User not logged in</p>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="bg-neutral-900 rounded-xl p-8 shadow-xl w-[90%] md:w-[500px] text-center">
        <img
          src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`}
          alt="avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold">{user.username}#{user.discriminator}</h1>
        <p className="text-gray-400">{user.email}</p>
        <p className="text-sm mt-4">ValorantEurope.gg - Dashboard</p>
      </div>
    </div>
  );
}
