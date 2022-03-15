import React, {useCallback, useEffect, useState} from 'react'
import '../Style/Navbar.css'
import {debounce} from 'lodash'
export const Navbar = () => {
  let backgroundUrl="https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
 
  const [data, setData]=useState([])
  const [text, setText] =useState('')
  const [loading, setLoading]=useState(false)

  // Fetch data function for getting data
  const GetData=(event) => {
    setLoading(true)
    fetch(`https://swapi.dev/api/people/?search=${text}`).then(res => res.json()).then((json) => {
      setData(json.results);
      console.log(data)
    }).catch(err => {console.log(err)}).finally(setLoading(false))
  }

//  debaouncing to avoid unnecessary api calls
  const HandleText=debounce((word) => {
  setText(word)
  },300)

  useEffect(() => {
  GetData()
},[text])
  
  
  return (
      <>
    {/* container div */}
        <div style={{backgroundImage: `url(${backgroundUrl})`,}} className='Container' >


            {/* logo */}
            <div>
                <img src="https://media.gettyimages.com/photos/the-opening-title-from-the-star-wars-film-series-is-shown-on-screen-picture-id101271372?k=20&m=101271372&s=612x612&w=0&h=T_2lrDBMfjOHxH50x8HswzLbNOCRjqIbMtzFa25WI-8=" width={80} alt='starwars' className='NavbarImg'/>
            </div>


            {/* input and search div */}
            <div className='inputDiv' >
          <input type="text" name={'data'} placeholder="Search your favourate character"  value={text} onChange={(e)=>HandleText(e.target.value)} autoComplete='off'l />


                {/* button */}
                <button  onClick={()=>{GetData()}}>
                    {/* seach logo */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </button>


            </div>



            {/* last item */}
            <div className="NavbarThirdDiv">
                Rohit Baghel
            </div>

      </div>
    
{/* search input div */}
      <div  className='SearchResultDiv' >
      {data.map((e) => (
        <div>{text==='' ? data.length ===0: e.name}</div>
      ))}
     
      </div>
    
     
      </>
    )
}
