"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import styles from "./SettingsAccount.module.css";

export default function SettingsAccount() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getInitials = () => {
    if (!user) return "";
    const firstInitial = user.name?.[0] || "";
    const lastInitial = user.surname?.[0] || "";
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  return (
    <div className={styles.settingsContent}>
      <div className={styles.infoUser}>
        <div className={styles.userProfile}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarCircle}>
              <span className={styles.avatarInitials}>{getInitials()}</span>
            </div>
            <div className={styles.nameSection}>
              <span className={styles.nameLabel}>Имя Фамилия</span>
              <h2 className={styles.information}>
                {user?.name} {user?.surname}
              </h2>
            </div>
          </div>
        </div>
        <div className={styles.userProfile}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarCircle}>
              <span className={styles.avatarEmaiIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={styles.emailSvg}
                >
                  <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z" />
                </svg>
              </span>
            </div>
            <div className={styles.nameSection}>
              <span className={styles.nameLabel}>Электронная почта</span>
              <h2 className={styles.information}>{user?.email}</h2>
            </div>
          </div>
        </div>
      </div>

      <button className={styles.logoutButton} onClick={handleLogout}>
        Выйти из аккаунта
      </button>
    </div>
  );
}
