import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo_la.png';

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth'); 
    navigate('/'); 
  };

  return (
    <nav className="bg-black">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <img src={logo} className="h-8" alt="LA PaintBall" />
        
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            
            <li>
              <Link to="#" className="text-white hover:text-primary duration-150">Administradores</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="text-white hover:text-primary duration-150">
                Sair do sistema
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;