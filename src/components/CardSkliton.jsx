

const CardSkliton = () => {
  return (
    <>
       <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <div className="rounded-t-lg w-full h-48 bg-gray-300 animate-pulse"></div>
        <div className="p-4">
            <div className="flex items-center mb-2">
                <i className="fas fa-star text-yellow-500"></i>
                <i className="fas fa-star text-gray-300"></i>
                <i className="fas fa-star text-gray-300"></i>
                <i className="fas fa-star text-gray-300"></i>
                <i className="fas fa-star text-gray-300"></i>
            </div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-4 animate-pulse"></div>
            <div className="h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md animate-pulse"></div>
        </div>
    </div>


    </>
  )
}

export default CardSkliton
