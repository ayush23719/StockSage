import React from "react";
import { Button } from "@carbon/react";
import "@material-tailwind/react";

function Home() {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-1 justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">StockSage</h1>
          <p className="text-xl mb-6">Your Intelligent Stock Advisor</p>
          <Button
            className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg"
            href="/analyse"
          >
            Search For Stocks &rarr;
          </Button>
        </div>
      </main>
    </div>
  );
}

export default Home;
