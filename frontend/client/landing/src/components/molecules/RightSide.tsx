"use client"

import {Button} from '../ui/button'

const RightSide = () => {
    return (
        <div className="w-full md:w-1/3 p-6 rounded-lg shadow-lg bg-white bg-opacity-10">
            <h2 className="text-white text-lg font-bold mb-4">Information</h2>
            <p className="text-white text-sm mb-4">
                Access the website via cryptowallet dapp browser (Trust Wallet or Metamask) or with their extension
                installed.
            </p>
            <div className="w-full h-32 rounded-lg mb-4">
                <iframe
                    width="100%"
                    height="130px"
                    src="https://www.youtube.com/embed/etJ5JDVNnxw?controls=0&modestbranding=1&showinfo=0&rel=0"
                    title="Learn about Nestage"
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>

            <Button variant="link" className="text-blue-500 font-semibold underline">
                <a href="https://youtube.com/shorts/etJ5JDVNnxw?si=CPkAj3Vzm4F3EhT-" target="_blank">Learn all about the
                    Nestage platform</a>
            </Button>
        </div>
    )
}

export default RightSide