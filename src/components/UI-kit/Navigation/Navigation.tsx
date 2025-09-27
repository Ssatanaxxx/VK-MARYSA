"use client";
import styles from "./Navigation.module.css";
import Image from "next/image";
import IconSearch from "../../../../public/search-icon.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { IMovie } from "../../../types/Movie";
import Api from "../../../api/api";
import SearchDropdown from "@/components/UI-kit/SearchDropdown/SearchDropdown";

export const Navigation = () => {
  const [data, setData] = useState<IMovie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const pathName = usePathname();
  const [focusState, setFocusState] = useState(false);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const sendSearchQuery = useCallback(
    async (searchQuery: string): Promise<void> => {
      try {
        const data = await Api.getMovies("5", searchQuery);
        setData(data);
      } catch (error) {
        console.error("Search error:", error);
        setData([]);
      }
    },
    []
  );

  useEffect(() => {
    sendSearchQuery(searchQuery);
  }, [searchQuery, sendSearchQuery]);
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
              onFocus={() => setFocusState(true)}
              onBlur={() => {
                setFocusState(false);
                setSearchQuery("");
              }}
              onChange={handleSearch}
            ></input>
            {focusState && <SearchDropdown movies={data} />}
          </div>
        </li>
      </ul>
    </>
  );
};

export default Navigation;
