"use client"

import { Button } from '../ui/button'

const RightSide = () => {
  return (
      <div className="w-full md:w-1/3 p-6 rounded-lg shadow-lg bg-white bg-opacity-10">
          <h2 className="text-white text-lg font-bold mb-4">Information</h2>
          <p className="text-white text-sm mb-4">
              Access the website via cryptowallet dapp browser (Trust Wallet or Metamask) or with their extension installed.
          </p>
          <div className="w-full h-32 bg-red-500 rounded-lg mb-4"></div>
          <Button variant="link" className="text-blue-500 font-semibold underline">
              Learn all about the Nestage platform
          </Button>
      </div>
  )
}

export default RightSide