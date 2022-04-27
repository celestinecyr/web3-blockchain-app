import { useState } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

import logo from '../../images/logo.png'

//functional component:
const NavbarItem = ({ title, classProps }) => {
  return(
    <li className={`mx-4 cursor curspr-pointer ${classProps}`}>{title}</li>
      //* ^ dynamic block |  mx-4 means margin on a horizontal axis
  );
}

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);    //not turned on initially (mobile device)

  return (
    <nav className='w-full flex md:justify-center justify-between items-center p-4'>          
    {/* on medium devices, the justify is going to be center */}
      <div className='md:flex-[0.5] flex-initial justify-center items-center'>
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
        {["Markets", "Exchange", "Tutorials", "Wallet"].map((item, index) => (
            <NavbarItem key={item + index} title={item}/>
        ))}
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">Login</li>
      </ul>
      <div className='flex relative'>
        {toggleMenu
          //if turned on
          ? <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)}/>
          //else
          :<HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)}/>
        }

        {toggleMenu && (
          // content here only shows if toggleMenu = true
          <ul className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'
          >
            <li className='text-xl w-full my-2'> <AiOutlineClose onClick={() => setToggleMenu(false)} /> </li>
            {["Markets", "Exchange", "Tutorials", "Wallet"].map((item, index) => (
            <NavbarItem key={item + index} title={item} classProps="my-2 text-lg"/>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;