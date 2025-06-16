// import React, { useRef, useEffect, useContext } from "react";
// import { Container, Row, Button } from "reactstrap";
// import { NavLink, Link, useNavigate } from "react-router-dom";

// import logo from "../../assets/images/logo.png";
// import "./header.css";

// import { AuthContext } from "../../context/AuthContext";

// const nav__links = [
//   {
//     path: "/home",
//     display: "Home",
//   },
//   {
//     path: "/tours",
//     display: "Tours",
//   },
//   {
//     path: "/about",
//     display: "About",
//   },
// ];

// const Header = () => {
//   const headerRef = useRef(null);
//   const navigate = useNavigate();
//   const { user, dispatch } = useContext(AuthContext);

//   const logout = () => {
//     dispatch({ type: "LOGOUT" });
//     navigate("/");
//   };

//   const stickyHeaderFunc = () => {
//     window.addEventListener("scroll", () => {
//       if (
//         document.body.scrollTop > 80 ||
//         document.documentElement.scrollTop > 80
//       ) {
//         headerRef.current.classList.add("sticky__header");
//       } else {
//         headerRef.current.classList.remove("sticky__header");
//       }
//     });
//   };

//   useEffect(() => {
//     stickyHeaderFunc();
//     return () => window.removeEventListener("scroll", stickyHeaderFunc);
//   }, []);

//   return (
//     <header className="header" ref={headerRef}>
//       <Container>
//         <Row>
//           <div className="nav__wrapper d-flex align-items-center justify-content-between">
//             {/* --logo-- */}
//             <div className="logo">
//               <img src={logo} alt="Logo" />
//             </div>
//             {/* --logo end-- */}

//             {/* --menu start-- */}
//             <div className="navigation">
//               <ul className="menu d-flex align-items-center gap-5">
//                 {/* If admin, show only Dashboard */}
//                 {user?.role === "admin" ? (
//                   <li className="nav__item">
//                     <NavLink
//                       to="/admin/dashboard"
//                       className={(navClass) =>
//                         navClass.isActive ? "active__link" : ""
//                       }
//                     >
//                       Dashboard
//                     </NavLink>
//                   </li>
//                 ) : (
//                   // Show default nav links for other users
//                   nav__links.map((item, index) => (
//                     <li className="nav__item" key={index}>
//                       <NavLink
//                         to={item.path}
//                         className={(navClass) =>
//                           navClass.isActive ? "active__link" : ""
//                         }
//                       >
//                         {item.display}
//                       </NavLink>
//                     </li>
//                   ))
//                 )}
//               </ul>
//             </div>
//             {/* --menu end-- */}

//             <div className="nav__right d-flex align-items-center gap-4">
//               <div className="nav__btns d-flex align-items-center gap-4">
//                 {user ? (
//                   <>
//                     <h5 className="mb-0">{user.username}</h5>
//                     <Button className="btn btn-dark" onClick={logout}>
//                       Logout
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Button className="btn secondary__btn">
//                       <Link to="/login">Login</Link>
//                     </Button>
//                     <Button className="btn primary__btn">
//                       <Link to="/register">Register</Link>
//                     </Button>
//                   </>
//                 )}
//               </div>

//               <span className="moblie__menu">
//                 <i className="ri-menu-line"></i>
//               </span>
//             </div>
//           </div>
//         </Row>
//       </Container>
//     </header>
//   );
// };

// export default Header;

import React, { useRef, useEffect, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import "./header.css";

import { AuthContext } from "../../context/AuthContext";

const userNavLinks = [
  { path: "/home", display: "Home" },
  { path: "/tours", display: "Tours" },
  { path: "/about", display: "About" },
];

const adminNavLinks = [
  {path: "/admin/dashboard", display: "Dashboard"},
  { path: "/create-tour", display: "Create Tour" },
  { path: "/update-tour", display: "Update Tour" },
  { path: "/admin/bookings", display: "Bookings" },
];

const Header = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  // Choose nav links based on role
  const navLinksToDisplay =
    user?.role === "admin" ? adminNavLinks : userNavLinks;

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* --logo-- */}
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            {/* --logo end-- */}

            {/* --menu start-- */}
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {navLinksToDisplay.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* --menu end-- */}

            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">
                {user ? (
                  <>
                    <h5 className="mb-0">{user.username}</h5>
                    <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary__btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>

              <span className="moblie__menu">
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
