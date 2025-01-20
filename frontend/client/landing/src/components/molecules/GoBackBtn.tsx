"use client"

import { useRouter } from "next/navigation"
import { CloseIcon } from "../atoms/Icons"

const GoBackBtn = () => {

    const router = useRouter()

    const handleClose = () => {
        router.push("/")
    }
  return (
      <div onClick={handleClose} className="z-10 cursor-pointer absolute top-5 right-5 flex justify-center items-center p-1 bg-gray-500 bg-opacity-50 hover:bg-gray-700 hover:bg-opacity-90 rounded-lg">
          <CloseIcon className="w-5 h-5 text-red-500" />
      </div>
  )
}

export default GoBackBtn