import React from 'react'
import './side-menu.scss'

export const WalletSidebar = (props:{show:boolean, widget:JSX.Element}) => {
  return (
    props.show?
    <div style={{zIndex:'9991'}} className={`fixed overflow-hidden left-0 top-0 rignt-0 w-full bg-black bg-opacity-50 h-screen`}>
        <div className={` w-4/12 ml-auto ${props.show?'selected':'dissmiss'} h-screen bg-white`}>
            {props.widget}
        </div>

    </div>:<></>
  )
}
