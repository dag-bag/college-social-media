import { Dialog } from "@headlessui/react"
import { useState } from "react"
import { FaImages } from "react-icons/fa"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { toast } from 'react-toastify';
import PostContent from "../post-input/post-content"
import usePostInput from "../post-input/use-post-input"
import PostFileInput from "../post-input/post-file-input"
const PostInputNew = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { data: session } = useSession();
    const me = session?.user!;


    const addPostCallback = () => {
        toast('Your post was added successfully', {
            type: 'success',
        });
    };

    const {
        handleFormSubmit,
        getRootProps,
        isImageDragged,
        register,
        setValue,
        control,
        openFilePicker,
        finalUploadProgress,
        isSubmitButtonEnabled,
        errors,
        content,
        getInputProps,
        isUploading,
    } = usePostInput({ submitCallback: addPostCallback });

    return (
        <>


            <Dialog className={'bg-black bg-opacity-50 w-full h-full fixed top-0 left-0 z-50 flex items-center justify-center'} open={isOpen} onClose={() => setIsOpen(false)}>
                <Dialog.Panel >

                    <form onSubmit={handleFormSubmit}>
                        <div className='bg-white w-[95vw] mx-auto rounded-md grid p-3' >






                            <header className="flex gap-2 border-b border-gray-100">

                                <div>
                                    <Image
                                        src={me.image || '/images/avatar-fallback.svg'}
                                        width="40"
                                        height="40"
                                        layout="fixed"
                                        alt=""
                                        className="rounded-full"
                                        objectFit="cover"
                                    />
                                </div>

                                <div>
                                    <h3 className="font-bold">{me.name}</h3>
                                    <h3 className="text-sm text-gray-500 ">@{me.id}</h3>

                                </div>

                            </header>

                            <main className="mt-2">

                                <PostContent
                                    content={content}
                                    register={register}
                                    disabled={isUploading}
                                />


                                {finalUploadProgress !== 0 && (
                                    <div className="w-full h-1 rounded-sm overflow-hidden my-2">
                                        <div
                                            className="bg-blue-500 w-full h-full"
                                            style={{
                                                transform: `translateX(-${100 - finalUploadProgress}%)`,
                                            }}
                                        />
                                    </div>
                                )}

                                <PostFileInput
                                    openFilePicker={openFilePicker}
                                    control={control}
                                    setValue={setValue}
                                    disabled={isUploading}
                                />

                                <input {...getInputProps()} />



                                <div className="grid grid-cols-2 gap-5 bg-gray-100 px-3 py-2 rounded-full mb-2">
                                    <label htmlFor="visiblity" className=" font-bold">Visiblity</label>
                                    <select id="visiblity" name="visiblity" className=" bg-transparent"  >
                                        <option className="capitalize" value="everyone">everyone</option>
                                        <option className="capitalize" value="only me">only me</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-5 bg-gray-100 px-3 py-2 rounded-full mb-2">
                                    <label htmlFor="post-on" className=" font-bold">Post in </label>
                                    <select id="post-on" name="post-on" className=" bg-transparent"  >
                                        {['FCB', 'chinese community', 'ramen lovers', 'gadjets', 'sport', 'entertaiment'].map((opt) => <option className="capitalize" value={opt}>{opt}</option>)}
                                    </select>
                                </div>


                            </main>
                            <footer>
                                <button
                                    type="submit"
                                    disabled={!isSubmitButtonEnabled}
                                    className="w-full bg-purple-0 text-white rounded-full p-1.5"
                                >
                                    Share
                                </button>
                            </footer>

                        </div>
                    </form>

                </Dialog.Panel>
            </Dialog>













            <button onClick={() => { setIsOpen(true) }} className="w-full border-2 border-purple-0 rounded-full  grid grid-cols-[50px_auto_60px] items-center py-1 bg-gray-100  ">

                <button className="flex items-center justify-center">
                    <Image
                        src={me.image || '/images/avatar-fallback.svg'}
                        width="35"
                        height="35"
                        layout="fixed"
                        alt=""
                        className="rounded-full"
                        objectFit="cover"
                    />
                </button>

                <p className=" text-purple-0 font-bold   ">What is on your mind?</p>

                <button className="flex items-center justify-center">
                    <FaImages className=" stroke-red-400" size={20} />
                </button>


            </button>

        </>
    )
}


export default PostInputNew
