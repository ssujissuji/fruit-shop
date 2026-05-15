import { useMemo } from 'react';

function useProductFilter(products, activeCategory, searchQuery) {
  return useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((p) => {
      const matchCategory =
        activeCategory === '전체' || p.category === activeCategory;

      const matchQuery =
        query === '' ||
        p.name.toLowerCase().includes(query) ||
        p.englishName.toLowerCase().includes(query);

      return matchCategory && matchQuery;
    });
  }, [products, activeCategory, searchQuery]);
}

export default useProductFilter;
