
import React, {  useEffect, useState } from 'react'
import { createContext } from 'react'
import requests from "./../apis/posts/requests"
export let SearchContext=createContext(0)


const SearchContextProvider = (props) => {
    const [title, settitle] = useState("")
    const [search,setsearch] = useState([])
  let SearchField =async(title)=>{
  
  
    let  data  = await requests.searchpost(title);

    setsearch(data);
  };
  
  let clearData =()=>{
  
    setsearch([]);
    settitle("")
  
  }
  
  useEffect(()=>{
  
    SearchField(title);
  
    
  
  },[title])
  
  
  
  
  return <SearchContext.Provider value={{search,clearData,title,settitle}}>

{props.children}
  </SearchContext.Provider>
}

export default SearchContextProvider