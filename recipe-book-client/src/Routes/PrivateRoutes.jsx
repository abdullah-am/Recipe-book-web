import React, {useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Loading from '../Components/Body/Loading';


const PrivateRoutes = ({children}) => {
    const {user,loading}=useContext(AuthContext);
    const location = useLocation();
    
    if(loading){
        return <Loading></Loading>;
    }
    
    if(!user){
        return <Navigate state={location?.pathname} to='/auth/login'></Navigate>
    }
    return children;
};

export default PrivateRoutes;