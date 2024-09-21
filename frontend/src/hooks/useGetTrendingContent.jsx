import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useContentStore } from '../store/content';

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null)
  const {contentType}= useContentStore()

  useEffect(() => {
    const getTrendingContent= async () => {
        const response=  await axios.get(`/api/v1/${contentType}/trending`)
        setTrendingContent(response.data.content)
    }
    getTrendingContent()
  }, [contentType])

  return {trendingContent};
  
}

export default useGetTrendingContent;