import  { useEffect } from "react";
// import Logo from "../assets/images/polarislogo.png";
// import { Pdf, Phone } from "../assets/svgs/Svg";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { Profile, Cart, Search } from "../assets/icons";

const Navbar = () => {
  useEffect(() => {
    const handleScroll = () => {
      // Add scroll handling logic if needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 w-full h-[65px] bg-white text-black shadow-md z-[1000]">
      <div className="flex items-center justify-between px-8 h-full">
        <div className="flex gap-10 w-2/5">
          <Link to="/" className="text-black text-sm">
            SHOP
          </Link>
          <Link to="/" className="text-black text-sm">
            ABOUT
          </Link>
          <Link to="/" className="text-black text-sm">
            BOOK AN APPOINTMENT
          </Link>
          <Link to="/" className="text-black text-sm">
            CONTACT
          </Link>
          <Link to="/" className="text-black text-sm ">
            MORE
          </Link>
        </div>

        <h2 className="text-2xl font-semibold">BAZORA</h2>

        <div className="flex items-center gap-5 w-2/5 justify-end">
          <Link to="/login">
            <Profile className="w-5 h-5" />
          </Link>
          <Link to="/contact">
            <Cart className="w-6 h-6" />
          </Link>
          <Link to="/contact">
            <Search className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
