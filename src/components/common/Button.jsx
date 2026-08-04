// src/components/common/Button.jsx

function Button({
  children,

  onClick,

  type = "button",

  variant = "primary",

  disabled = false,
}) {
  const variants = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white",

    success: "bg-green-600 hover:bg-green-700 text-white",

    secondary: "bg-blue-600 hover:bg-blue-700 text-white",

    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        
        rounded-2xl
        px-6
        py-4
        font-bold
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        
        ${disabled ? "cursor-not-allowed bg-gray-300 text-gray-500" : variants[variant]}
        
        `}
    >
      {children}
    </button>
  );
}

export default Button;
