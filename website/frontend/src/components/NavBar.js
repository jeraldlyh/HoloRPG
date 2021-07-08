import React from "react"

export default function NavBar() {

    return (
        <div class="relative min-h-screen flex">
            
            {/* sidebar */}
            <div class="bg-gray-900 text-blue-100 w-24 space-y-6 py-7 px-2 h-full fixed">
                
                {/* logo */}
                <a href="#" class="text-white block items-center px-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 items-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
                </a>
                <hr class="items-center text-center px-4 bg-gray-500 w-4/5"></hr>


                {/* nav */}
                <nav>
                    <a href="" class="block items-center py-7 px-4 rounded transition duration-200 hover:bg-purple-600 hover:text-white"> <svg xmlns="http://www.w3.org/2000/svg" class="items-center h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
</svg></a>
                    <a href="" class="block items-center py-7 px-4 rounded transition duration-200 hover:bg-purple-600 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" class="items-center h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
</svg></a>
                    <a href="" class="block items-center py-7 px-4 rounded transition duration-200 hover:bg-purple-600 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" class="items-center h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
  <path d="M13 7H7v6h6V7z" />
  <path fill-rule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clip-rule="evenodd" />
</svg></a>
                    <a href="" class="block items-center py-7 px-4 rounded transition duration-200 hover:bg-purple-600 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" class="items-center h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
</svg></a>
                    <a href="" class="block items-center py-7 px-4 rounded transition duration-200 hover:bg-purple-600 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" class="items-center h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
</svg></a>
                    <a href="" class="block items-center py-7 px-4 rounded transition duration-200 hover:bg-purple-600 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" class="items-center h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
</svg></a>
                    
                </nav>
            </div>
            
            {/* content */}
            <div class="flex-1 p-10 text-2x1 font-bold">
               help i cannot align this shit
            </div>
        </div>
    )
}
