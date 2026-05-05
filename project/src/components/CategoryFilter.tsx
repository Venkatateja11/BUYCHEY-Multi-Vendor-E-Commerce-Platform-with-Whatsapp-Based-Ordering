interface Category {
  id: number;
  name: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
            selectedCategory === null
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.name)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center space-x-2 ${
              selectedCategory === category.name
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
