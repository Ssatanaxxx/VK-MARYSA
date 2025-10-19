"use client";
import styles from "./Navigation.module.css";
import Image from "next/image";
import IconSearch from "../../../../public/search-icon.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useMovies } from "@/hooks/useIMovie";
import SearchDropdown from "@/components/UI-kit/SearchDropdown/SearchDropdown";

export const Navigation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const pathName = usePathname();
  const [focusState, setFocusState] = useState(false);

  const { data: searchResults, isLoading: isSearching } = useMovies(
    {
      count: "5",
      title: searchQuery,
    },
    {
      enabled: searchQuery.length > 2,
      staleTime: 1000 * 60,
    }
  );

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFocus = () => {
    setFocusState(true);
  };

  const handleBlur = () => {
    // Добавляем задержку чтобы клик по дропдауну успел сработать
    setTimeout(() => {
      setFocusState(false);
      setSearchQuery("");
    }, 200);
  };

  return (
    <>
      <ul className={`${styles.header__list} list-reset`}>
        <li className={styles.header__listItem}>
          <Link
            href="/"
            className={`${styles.navLink} ${pathName === "/" ? "active" : ""}`}
          >
            Главная
          </Link>
        </li>
        <li className={styles.header__listItem}>
          <Link
            href="/genres"
            className={`${styles.navLink} ${
              pathName === "/genres" ? "active" : ""
            }`}
          >
            Жанры
          </Link>
        </li>
        <li className={styles.header__listItem}>
          <div className={styles.listItem__search}>
            <Image
              src={IconSearch}
              width={24}
              height={24}
              className={styles.listItem__searchIcon}
              alt="Поиск"
            />
            <input
              id="search"
              name="search"
              className={styles.search__input}
              type="search"
              placeholder="Поиск"
              value={searchQuery}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleSearch}
            />
            {focusState && searchQuery.length > 0 && (
              <SearchDropdown
                movies={searchResults || []}
                isLoading={isSearching}
              />
            )}
          </div>
        </li>
      </ul>
    </>
  );
};

export default Navigation;
