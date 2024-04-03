import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Upload from '../upload/Upload';
// import FlipBook from '../flipbook/Flipbook';

import ShowFlipBook from '../flipbook/ShowFlipbook';
import Card from '../component/Card';
import { MdArticle } from "react-icons/md";
import { BsFillPostageHeartFill } from "react-icons/bs";
import { FaLink } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { GrFormView } from "react-icons/gr";
import { CgSoftwareUpload } from "react-icons/cg";
import { ImEmbed2 } from "react-icons/im";
import { HiOutlineDotsVertical } from "react-icons/hi";
const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Upload/>,
  // }, 
  {
    path: "/",
    element: <ShowFlipBook />,
  },
]);

const Show = () => {
  return (
    <div className='bg-gray-100 w-[100%] h-[100vh] m-0 flex-row' >
      <div className='w-[100%] h-[60%] bg-gray-100 '>
        <RouterProvider router={router} />

      </div>
      <div className='mt-[5px] h-[10%] '>
        <div className='flex spa'>
          <div className='border-solid border-2 w-[30%] border-black rounded-sm flex justify-start sm:text-xs md:text-sm lg:text-base px-2 '>
            <FaLink />
            <p><a href='https://wmhindia.com/'>https://wmhindia.com/</a></p>
            <p className='mx-[20px]'>Copy Fulscreen Link</p>
            <RiArrowDropDownLine />
          </div>
          {/* right end */}
          <div className='flex justify-end gap-1 sm:text-xs md:text-sm lg:text-base' >
            <button className='border-solid border-2 flex'>
              <GrFormView />
              <p>View Post</p>
            </button>
            <button className='border-solid border-2 flex'>
              <CgSoftwareUpload />
              <p>Re-Upload</p>
            </button>
            <button className='border-solid border-2 flex bg-gray-900 text-white'>
              <ImEmbed2 />
              <p>Embed</p>
            </button>
            <button className='border-solid border-2 flex'>
              <HiOutlineDotsVertical />
            </button>
          </div>
        </div>
        <div>
          <h3 className='font-semibold'>Media created from this document</h3>
        </div>
        <div className='flex gap-5 justify-start mb-1'>
          <button className='bg-violet-300 flex '>
            <MdArticle />
            <p className='text-xs'>article</p>
          </button>
          <button className='bg-violet-200 flex '>
            <BsFillPostageHeartFill />
            <p className='text-xs'>Social Post</p>
          </button>
        </div>
      </div>
      <div className=' h-[30%] '>
        <Card />

      </div>

    </div>
  )
}

export default Show