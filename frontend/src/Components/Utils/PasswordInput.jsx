/* eslint-disable  */
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({
    id,
    name,
    value,
    onChange,
    showPassword,
    togglepasswordVisibility,
    placeholder,
    className,
}) => {
return(
<div className={`relative ${className}`}>
   <input
     type={showPassword ? "text" : "password"}
     id={id}
     name={name}
     value={value}
     onChange={onChange}
     className={`border rounded border-[#cfcdcd] focus:outline-none w-[29vw] px-3 py-2 mt-3`}
     placeholder={placeholder}
   />  
   {
    togglepasswordVisibility && (
        <button
          type="button"
          className="absolute right-0 bottom-3 mt-3 mr-4"
          onClick={togglePasswordVisibility}
        >
             {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
    )
   }
</div>
)
}

export default PasswordInput;