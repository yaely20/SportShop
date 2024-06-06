import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./managerNavBar.scss";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AllProduct from './features/product/allProduct';
import AddUpdateProduct from './features/product/addUpdateProduct';
import AllOrder from './features/order/allOrder';
import ShoppingCart from './features/order/shoppingCart';
import { useDispatch, useSelector } from "react-redux";
import { logout } from './features/user/userSlice';
import SingleOrder from './features/order/singleOrder';
import AllUser from "./features/user/allUser";
import CompleteOrder from './features/order/completeOrder';
import logo from './images/logo.png';
import Badge from '@mui/joy/Badge';
import Home from './home';
import About from './about'; 
function NavBar() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const cartItems = useSelector((state) => state.order.carts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [activeComponent, setActiveComponent] = useState('Home');
  const [activeLink, setActiveLink] = useState('Home');
  const [pro, setPro] = useState(null);
  const [ord, setOrd] = useState(null);
  const [cart1,setCart1]=useState(null);

  const handleClick = () => setClick(!click);

  const updatePro = (p) => {
    setPro(p);
    setActiveComponent('updateProduct');
    setActiveLink('updateProduct');
  }
  const returnToOrder = (p) => {
    setCart1(p);
    setActiveComponent('Orders');
    setActiveLink('Orders');
  }
  const returnToShop = () => {
    setActiveLink('AllProducts');
    setActiveComponent('AllProducts');
  }
  const updateOrder = (p) => {
    setOrd(p);
    setActiveComponent('oneOrder');
    setActiveLink('oneOrder');
  }
  const completeOrder = () => {
    setActiveComponent('completeOrder');
    setActiveLink('completeOrder');
  }
  const returnto = () => {
    setActiveComponent('AllProducts');
    setActiveLink('AllProducts');
  }
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Home':
        return <Home allProduct={returnToShop} />;
      case 'AllProducts':
        return currentUser && currentUser.id === 0 ? <AllProduct updatePro={updatePro} /> : <AllProduct />;
      case 'AddNewProduct':
        return <AddUpdateProduct returnto={returnToShop} />;
      case 'Orders':
        return <AllOrder updateOrder={updateOrder} />;
      case 'updateProduct':
        return <AddUpdateProduct p={pro} returnto={returnto} />;
      case 'oneOrder':
        return <SingleOrder p={ord}  allOrder={returnToOrder}/>;
      case 'cart':
        return <ShoppingCart returnToShop={returnToShop} completeOrder={completeOrder} />;
      case 'users':
        return <AllUser />;
      case 'completeOrder':
        return <CompleteOrder allProduct={returnToShop} />;
      case 'About':
        return <About />; 
      default:
        return <AllProduct />;
    }
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/sign-in');
  };

  return (
    <>
      <div className="aaa">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo" onClick={() => {
              setActiveComponent('Home');
              setActiveLink('Home');
            }}>
              <img src={logo} alt="logo" />
            </div>

            <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className={`nav-item ${activeLink === 'About' ? 'active' : ''}`}>
                <div
                  className="nav-links"
                  onClick={() => {
                    handleClick();
                    setActiveComponent('About');
                    setActiveLink('About');
                  }}
                >
                  About
                </div>
              </li>

              <li className={`nav-item ${activeLink === 'AllProducts' ? 'active' : ''}`}>
                <div
                  className="nav-links"
                  onClick={() => {
                    handleClick();
                    setActiveComponent('AllProducts');
                    setActiveLink('AllProducts');
                  }}
                >
                  All products
                </div>
              </li>

              {currentUser && currentUser.id === 0 && (
                <>
                  <li className={`nav-item ${activeLink === 'AddNewProduct' ? 'active' : ''}`}>
                    <div
                      className="nav-links"
                      onClick={() => {
                        handleClick();
                        setActiveComponent('AddNewProduct');
                        setActiveLink('AddNewProduct');
                      }}
                    >
                      Add new product
                    </div>
                  </li>
                  <li className={`nav-item ${activeLink === 'Users' ? 'active' : ''}`}>
                    <div
                      className="nav-links"
                      onClick={() => {
                        handleClick();
                        setActiveComponent('users');
                        setActiveLink('users');
                      }}
                    >
                      Users
                    </div>
                  </li>
                </>
              )}

              <li className={`nav-item ${activeLink === 'Orders' ? 'active' : ''}`}>
                <div
                  className="nav-links"
                  onClick={() => {
                    handleClick();
                    setActiveComponent('Orders');
                    setActiveLink('Orders');
                  }}
                >
                  Orders
                </div>
              </li>

              {currentUser && currentUser.id !== 0 && (
                <li className={`nav-item ${activeLink === 'cart' ? 'active' : ''}`}>
                  <div
                    className="nav-links"
                    onClick={() => {
                      handleClick();
                      setActiveComponent('cart');
                      setActiveLink('cart');
                    }}
                  >
                    <Badge badgeContent={cartItems.length} showZero={false} sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '0.8rem',
                        backgroundColor: '#c41c1c',
                        color: 'white',
                      },
                    }}>
                      <ShoppingCartOutlinedIcon />
                    </Badge>
                  </div>
                </li>
              )}

              <li className={`nav-item ${activeLink === 'Logout' ? 'active' : ''}`}>
                <div
                  className="nav-links"
                  onClick={async () => {
                    handleClick();
                    if (currentUser) {
                      await handleLogout();
                    } else {
                      navigate('/sign-in');
                    }
                  }}
                >
                  {currentUser ? <LogoutOutlinedIcon /> : <LoginOutlinedIcon />}
                </div>
              </li>
            </ul>
            <div className="nav-icon" onClick={handleClick}>
              {click ? (
                <span className="icon">
                  <HamburgetMenuClose />
                </span>
              ) : (
                <span className="icon">
                  <HamburgetMenuOpen />
                </span>
              )}
            </div>
          </div>
        </nav>
        <div className="content">
          {renderComponent()}
        </div>
      </div>
    </>
  );
}

export default NavBar;
