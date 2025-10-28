import { NavLink } from 'react-router-dom';
import './Navigation.css';

function NavBar() {
  return (
    <nav>
      {/* NavLink tự động thêm class 'active' nếu đường dẫn khớp */}
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        end
      >
        Home
      </NavLink>

      <NavLink
        to="/san-pham"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        Products
      </NavLink>

      <NavLink
        to="/lien-he"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        About
      </NavLink>
    </nav>
  );
}

export default NavBar;
