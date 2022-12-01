import { Route, redirect, useNavigate } from "react-router-dom";



const ProtectedRoute = ({isAuth, children}) => (
    
    <Route>{isAuth ? children : redirect('/login')}</Route>
)

export default ProtectedRoute