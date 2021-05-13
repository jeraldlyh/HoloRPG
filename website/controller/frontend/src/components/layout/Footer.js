import React from "react"

export default function Footer() {

    return (
        <footer>
            <div className="container fixed bottom-0 bg-black w-full mx-auto px-6 pt-5 pb-5">
                <div className="flex justify-center items-center">
                    <div className="text-center">
                        <h5 className="font-bold mb-4">SOCIALS</h5>
                        <ul className="mb-2">
                            <li className="mt-2">
                                <a href="https://www.linkedin.com/in/jerald-lim-79aa58109/" className=" hover:underline hover:text-gray-800">
                                <i className="fa fa-linkedin" style={{fontSize : "20px"}}></i>
                                </a>
                            </li>
                            <li className="mt-2">
                                <a href="https://github.com/jeraldlyh" className="hover:underline hover:text-gray-800">
                                    <i className="fa fa-github" style={{fontSize : "20px"}}></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
