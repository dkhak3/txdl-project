export default function Button({
  children,
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        app-button
        ${className}
        ${disabled ? "button-disabled" : ""}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
