import React from 'react'
import AuthScreen from '../components/AuthScreen';
import HomeScreen from '../components/HomeScreen';
import { useAuthStore } from '../store/authUser';

const HomePage = () => {
  const {user}= useAuthStore()

  return (
    <>
      {user ? <HomeScreen /> : <AuthScreen />}
    </>
  )
}

export default HomePage
