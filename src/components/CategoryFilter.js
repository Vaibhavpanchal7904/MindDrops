function CategoryFilter({ posts = [], setSelectedCategory }) {
  const categories = [...new Set(posts.map(post => post.category).filter(Boolean))];

  return (
    <select
      onChange={e => setSelectedCategory(e.target.value)}
      style={{
        padding: "6px 10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        backgroundColor: "#fff",
        cursor: "pointer",
        minWidth: "140px",
      }}
    >
      <option value="">All Categories</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
}

export default CategoryFilter;
