import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { HistoryPage } from './pages/HistoryPage';
import { EditCardPage } from './pages/EditCardPage';
import { AddCardPage } from './pages/AddCardPage';
import { CashPage } from './pages/CashPage';
import { TransferPage } from './pages/TransferPage';
import { AboutPage } from './pages/AboutPage';
import { AboutPageForAdmin } from './pages/AboutPageForAdmin';
import { AuthPage } from './pages/AuthPage';
import { LoginPage } from './pages/LoginPage';
import { ProfileEditPage } from './pages/ProfileEditPage';
import { SupportPage } from './pages/SupportPage';
import { ForgotPinCode } from './pages/ForgotPinCodePage';
import { TransferToFriendPage } from './pages/TransferToFriendPage';

export function useRoutes(isLogin) {
    if (isLogin) {
        return (
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/card/:id' element={<HistoryPage />} />
                <Route path='/card/edit/:id' element={<EditCardPage />} />
                <Route path='/card/add' element={<AddCardPage />} />
                <Route path='/cash' element={<CashPage />} />
                <Route path='/transfer' element={<TransferPage />} />
                <Route path='/transfer-to-friend/:id' element={<TransferToFriendPage />} />
                <Route path='/edit/profile' element={<ProfileEditPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/support' element={<SupportPage />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/registration' element={<AuthPage />} />
            <Route path='/forgot' element={<ForgotPinCode />} />
            <Route path='/about' element={<AboutPageForAdmin />} />
            <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
    )
}
