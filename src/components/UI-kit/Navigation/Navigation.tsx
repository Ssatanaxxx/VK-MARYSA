"use client";
import styles from "./Navigation.module.css";
import IconSearch from "../../../../public/search-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChangeEvent, useState, useRef, useEffect } from "react";
import { useMovies } from "@/hooks/useIMovie";
import SearchDropdown from "@/components/UI-kit/SearchDropdown/SearchDropdown";

export const Navigation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathName = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);

  const {
    data: searchResults,
    isLoading: isSearching,
    error,
  } = useMovies(
    {
      limit: 5,
      title: searchQuery,
    },
    {
      enabled: searchQuery.length > 2,
      staleTime: 1000 * 60,
    }
  );

  // ПРОСТАЯ ОТЛАДКА
  console.log("🔍 SEARCH:", {
    query: searchQuery,
    results: searchResults?.length || 0,
    loading: isSearching,
    error: error?.message,
  });

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    setIsDropdownOpen(value.length > 2);
  };

  const handleFocus = () => {
    setIsDropdownOpen(searchQuery.length > 0);
  };

  const handleBlur = () => {
    setTimeout(() => setIsDropdownOpen(false), 300);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link
            href="/"
            className={`${styles.navLink} ${
              pathName === "/" ? styles.navLinkActive : ""
            }`}
          >
            Главная
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            href="/genres"
            className={`${styles.navLink} ${
              pathName === "/genres" ? styles.navLinkActive : ""
            }`}
          >
            Жанры
          </Link>
        </li>
        <li className={styles.navItem}>
          <div className={styles.searchContainer} ref={searchRef}>
            <div className={styles.searchInputWrapper}>
              <Image
                src={IconSearch}
                width={24}
                height={24}
                className={styles.searchIcon}
                alt="Поиск"
              />
              <input
                id="search"
                name="search"
                className={styles.searchInput}
                type="search"
                placeholder="Поиск фильмов..."
                value={searchQuery}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleSearch}
                aria-label="Поиск фильмов"
              />
            </div>

            {/* ПРОСТОЕ УСЛОВИЕ */}
            {isDropdownOpen && searchQuery.length > 0 && (
              <SearchDropdown
                movies={searchResults || []}
                isLoading={isSearching}
                onItemClick={() => setIsDropdownOpen(false)}
              />
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
