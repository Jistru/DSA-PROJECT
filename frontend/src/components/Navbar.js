import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import '../components/Styles/Navbar.css'
import { LuBicepsFlexed } from "react-icons/lu"

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1> <LuBicepsFlexed size={40} /> MuscleMate <LuBicepsFlexed className='biceps' size={40} /></h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span className='user'> {user.email} </span>
                            <button onClick={handleClick} >Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login"  > Login  </Link>
                            <Link to="/signup" > Signup </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar