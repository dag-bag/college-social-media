
import { FaUserAlt, FaImages } from "react-icons/fa"

const PostInputNew = () => {
    return (
        <button className="w-full border-2 border-purple-0 rounded-full  grid grid-cols-[50px_auto_60px] items-center py-2.5 bg-gray-100  ">

            <button className="flex items-center justify-center">
                <FaUserAlt className="stroke-primary-0" size={16} />
            </button>

            <p className=" text-purple-0 font-[500] ">What is on your mind?</p>

            <button className="flex items-center justify-center">
                <FaImages className="stroke-primary-0" size={20} />
            </button>


        </button>
    )
}


export default PostInputNew
