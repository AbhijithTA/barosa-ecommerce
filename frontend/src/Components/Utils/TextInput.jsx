/*eslint-disable react/prop-types */
const TextInput = ({type, id, name, value, onChange, placeholder, readOnly}) => {
    return(
        <div>
        <input 
           type={type}
           id={id}
           name={name}
           value={value}
           onChange={onChange}
           placeholder={placeholder}
           readOnly={readOnly}
           className="border border-[#cfcdcd] focus:outline-black rounded w-[29vw] px-3 p-2 bg-white mt-3"
        />
        </div>
    );
};












    









export default TextInput;