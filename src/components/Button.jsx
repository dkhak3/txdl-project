export default function Button({ children, onClick, className = "" }) {
  return (
    <button className={`app-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
