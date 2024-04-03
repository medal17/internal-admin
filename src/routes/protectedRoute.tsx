import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'


function Protected(props:{ isSignedIn:boolean, children:any }) {
 
  if (!localStorage.getItem('token')||localStorage.getItem('token').length<200
  ) {
    return <Navigate to="/" replace />
  }
  return props.children
}
export default Protected