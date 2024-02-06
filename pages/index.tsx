import Head from "next/head";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Home = () => {
  const handleClick = (arg: string) => {
    toast.success(`Suzan Bulbul toast mesajı! ${arg}`);
  };

  return (
    <div className="app">
      <Head>
        <title>Holiday App</title>
      </Head>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-blue-500">
          Merhaba, Tailwind CSS!
        </h1>
        <p className="text-lg text-center text-gray-700 mt-4">
          Bu bir Tailwind CSS örneğidir.
        </p>
        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleClick("ts ile çalışıyorum")}
          >
            Butona Tıkla
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
