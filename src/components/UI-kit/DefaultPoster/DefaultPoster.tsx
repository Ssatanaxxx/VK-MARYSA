import Image from "next/image"
import styles from "./DefaultPoster.module.css"
import defaultPoster from "../../../assets/default-poster.png"
export const DefaultPoster = () => {
    return (
            <Image src={defaultPoster} className={`${styles.defaultPoster} img`} width={224} height={336} alt="Logo VK Marysa" />
    )
}