function SearchBar({ setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search posts..."
      onChange={e => setSearchTerm(e.target.value)}
      style={{
        padding: "10px 15px",
        width: "220px",
        borderRadius: "8px",
        border: "1.8px solid #3498db",
        fontSize: "16px",
        outline: "none",
        transition: "border-color 0.3s ease",
        boxShadow: "0 2px 6px rgba(52, 152, 219, 0.15)",
        marginBottom: "10px",
        color: "#2c3e50",
      }}
      onFocus={e => (e.target.style.borderColor = "#2980b9")}
      onBlur={e => (e.target.style.borderColor = "#3498db")}
    />
  );
}

export default SearchBar;
