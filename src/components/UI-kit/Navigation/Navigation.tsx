"use client";
import styles from "./Navigation.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChangeEvent, useState, useRef, useEffect } from "react";
import { useMovies } from "@/hooks/useIMovie";
import SearchDropdown from "@/components/UI-kit/SearchDropdown/SearchDropdown";

import IconSearch from "@/../public/search-icon.svg";
import IconGenre from "@/../public/genres.svg";

export const Navigation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathName = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: searchResults, isLoading: isSearching } = useMovies(
    {
      limit: 5,
      title: searchQuery,
    },
    {
      enabled: searchQuery.length > 2,
      staleTime: 1000 * 60,
    }
  );

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
            className={`${styles.navLink} ${styles.navLink__main} ${
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
          <Image
            width={24}
            height={24}
            className={styles.navLink__Icon}
            src={IconGenre}
            alt={"Иконка жанров"}
          ></Image>
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
