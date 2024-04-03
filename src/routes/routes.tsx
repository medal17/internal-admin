import React from 'react'
import { createHashRouter } from 'react-router-dom'
import { HomeLayout } from '../layouts/HomeLayout'
import { Login } from '../pages/authentication/login'
import { ChangePassword } from '../pages/authentication/changePassword'
import { ForgotPassword } from '../pages/authentication/forgotPassword'
import { ChangeNewPassword } from '../pages/authentication/changeNewPassword'
import { PasswordOTP } from '../pages/authentication/passwordOTP'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Wallet } from '../pages/dashboard/wallet/wallet'
import { Settings } from '../pages/dashboard/settings/settings'
import { Profile } from '../pages/dashboard/profile/profile'
import { VerifyLoginOTP } from '../pages/authentication/verifyLoginOTP'
import { Dashboard } from '../pages/dashboard/dashboard'
import { FirstTimeOTP } from '../pages/authentication/firstTimeOTP'
import { GeneralErrorPage } from '../shared/error/404-error-page'
import { Users } from '../pages/dashboard/users'
import { ViewUser } from '../pages/dashboard/users/ViewUser'
import { LoanManagement } from '../pages/dashboard/loan-management/LoanManagement'
import { AuditLog } from '../pages/dashboard/audit-log/AuditLog'
import { UserAdminTable } from '../pages/dashboard/user-admin/components/UserAdminTable'
import { LenderManagement } from '../pages/dashboard/lender-management/LenderManagement'
import { AddLender } from '../pages/dashboard/lender-management/AddLender'
import { ViewLenders } from '../pages/dashboard/lender-management/ViewLenders'

export const router = createHashRouter([
    {
      path: '/',
      element: <HomeLayout />,
      errorElement:<GeneralErrorPage/>,
      children: [
        { path: '/', index: true, element: <Login /> },
        { path: '/login', index: true, element: <Login /> },
        { path: '/change-password', index: true, element: <ChangePassword /> },
        { path: '/forgot-password', index: true, element: <ForgotPassword /> },
        { path: '/password-otp', index: true, element: <PasswordOTP /> },
        { path: '/password-change', index: true, element: <ChangeNewPassword /> },
        { path: '/verify-login', index: true, element: <VerifyLoginOTP /> },
        { path: '/first-timer', index: true, element: <FirstTimeOTP /> },

      ]
    },

    {
      path: '/',
      element: <DashboardLayout />,
      errorElement:<GeneralErrorPage/>,
      children: [
        { path: '/dashboard', index: true, element: <Dashboard /> },
        { path: '/dashboard/wallet', index: true, element: <Wallet /> },
        { path: '/dashboard/profile', index: true, element: <Profile /> },
        { path: '/dashboard/settings', index: true, element: <Settings /> },
        { path: '/dashboard/users', index: true, element: <Users /> },
        { path: '/dashboard/users/view', index: true, element: <ViewUser /> },
        { path: '/dashboard/loan-management', index: true, element: <LoanManagement /> },
        { path: '/dashboard/audit-log', index: true, element: <AuditLog /> },
        { path: '/dashboard/user-admin', index: true, element: <UserAdminTable /> },
        { path: '/dashboard/lenders-management', index: true, element: <LenderManagement /> },
        { path: '/dashboard/lenders-management/add', index: true, element: <AddLender /> },
        { path: '/dashboard/lenders-management/view', index: true, element: <ViewLenders /> },
      ]
    }
])
