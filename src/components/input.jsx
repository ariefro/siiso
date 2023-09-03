function Input({ className, id, type, ...props }) {
  return (
    <input
      type={type}
      name={id}
      id={id}
      className={`${className} block mb-2 py-2.5 px-0 w-full text-sm text-tertiary bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer md:text-xl`}
      placeholder=' '
      required
      {...props}
    />
  );
}

export default Input;
