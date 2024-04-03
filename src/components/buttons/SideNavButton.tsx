import { Link, useLocation } from 'react-router-dom';

export interface sideNavBUttonModel {
    label:string;
    sub?:string,
    route:string;
    icon:any;
    activeIcon?:any;
    clickAction?:Function,
    otherTargets?:string[] | undefined
}

export const SideNavButton = (props:sideNavBUttonModel) => {
    const {label, route}=props;
    const location = useLocation();
    const activeStyle = 'w-11/12 flex align-middle text-sm cursor-pointer bg-gradient-to-r bg-[#0F4C5C] text-white py-3 mx-auto px-3 rounded-md font-semibold'
    const inActiveStyle = `w-11/12  flex align-middle cursor-pointer text-sm ${props.label==='Logout' ?'text-white':'text-white'} py-3 mx-auto px-3 text-darkGrey`
    return (
    props.label!=='Dashboard' ?
   <Link to={route} onClick={()=>props.clickAction&&props.clickAction()} style={{fontWeight:'500'}} className={location.pathname===props.route || location.pathname.includes(props.route)?activeStyle: inActiveStyle}>
        <div className='h-fit my-auto mr-2'>{location.pathname===props.route || location.pathname.includes(props.route)|| props.otherTargets?.includes(location.pathname)?props.activeIcon:props.icon}</div>
        <div className='my-auto'>
          {label}
          {props?.sub&&<p className='text-darkGrey  font-semibold mt-0.5'>{props?.sub}</p>}
        </div>
    </Link>
   :<Link to={route} style={{fontWeight:'500'}} className={location.pathname===props.route ||props.otherTargets?.includes(location.pathname) ?activeStyle: inActiveStyle}>
        <div className='h-fit my-auto mr-2'>{location.pathname===props.route?props.activeIcon:props.icon}</div>
        <div className='my-auto'>
          {label}
          {props?.sub&&<p>{props?.sub}</p>}
        </div>
    </Link>
  )
}

export const MobileSideNavButton = (props:sideNavBUttonModel) => {
    const {label, route}=props;
    const location = useLocation();
    let activeStyle = 'w-11/12 flex align-middle text-xs cursor-pointer text-primary-light py-1 mx-auto px-3 font-poppins font-extrabold rounded-md '
    let inActiveStyle = 'w-11/12 flex align-middle cursor-pointer text-xs text-primary-dark py-1 mx-auto px-3 font-medium'
 
    return (
    <Link to={route} onClick={props.clickAction&&props.clickAction()} style={{fontWeight:'500'}} className={location.pathname===props.route?activeStyle: inActiveStyle}>
        <div className='h-fit my-auto mr-2 text-sm'>{props.icon}</div>
        <span className='text-xs'>{label}</span>
    </Link>
  )
}
