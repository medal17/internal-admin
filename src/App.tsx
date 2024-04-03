import { useState, useLayoutEffect, useEffect } from 'react'

import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import { ToastContainer } from 'react-toastify'
// import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { ClientJS } from 'clientjs'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import ErrorBoundary from './routes/ErrorBoundary'
import { ConfigProvider } from 'antd'

const queryClient = new QueryClient()

export function App() {
  const client = new ClientJS()

  useLayoutEffect(() => {
    if (localStorage.getItem('clientId') === null) {
      const clientId = client.getFingerprint().toString();
      localStorage.setItem('clientId', clientId)
      window.location.reload()
    }
  }, [])


  // alert(localStorage.getItem('clientId'))
  return (
    <div className='overflow-x-hidden'>
      <ConfigProvider
      theme={{
        components: {
          InputNumber: {
            fontSize:10,
            colorBgBase:'red'
          },
          Slider: {
            handleColor:'#0F4C5C',
            borderRadius:50,
            handleSize:20,
            handleSizeHover:20,
            handleActiveColor:'#0F4C5C', 
            handleLineWidth:2
          }
        }
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <RouterProvider router={router} />
          <ToastContainer theme="light" className={''} />
        </ErrorBoundary>
      </QueryClientProvider>
      </ConfigProvider>
    </div>
  )
}


