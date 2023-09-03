function Label({ id, children }) {
  return (
    <label
      htmlFor={id}
      className='peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 md:text-base'
    >
      {children}
    </label>
  );
}

export default Label;
