import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>

          <NavLink to="/Hyst" activeStyle>
          Historical lookup
          </NavLink>
          <NavLink to="/" activeStyle>
            Find your weather
          </NavLink>
          
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;