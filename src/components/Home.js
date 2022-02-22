import React from 'react'

import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const Home = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/protected");
      };

    return (
        <div className="maintop">
                <button className="buttonhome" onClick={handleLogout}>
                protected
                </button>
        </div>


    )
}

export default Home