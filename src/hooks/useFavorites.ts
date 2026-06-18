import { useState, useEffect, useCallback } from 'react';
import { useMemoizedFn, useEventListener } from 'ahooks';

const STORAGE_KEY = 'nianhua_favorites';

function readFavoritesFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

function writeFavoritesToStorage(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => readFavoritesFromStorage());

  useEffect(() => {
    writeFavoritesToStorage(favoriteIds);
  }, [favoriteIds]);

  const syncFromStorage = useCallback(() => {
    setFavoriteIds(readFavoritesFromStorage());
  }, []);

  useEventListener('storage', (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      syncFromStorage();
    }
  });

  const isFavorite = useMemoizedFn((id: string) => favoriteIds.includes(id));

  const toggleFavorite = useMemoizedFn((id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id],
    );
  });

  const addFavorite = useMemoizedFn((id: string) => {
    setFavoriteIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  });

  const removeFavorite = useMemoizedFn((id: string) => {
    setFavoriteIds((prev) => prev.filter((fid) => fid !== id));
  });

  return {
    favoriteIds,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
  };
}
