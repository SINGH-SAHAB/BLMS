import React, { useEffect } from "react";
import styles from "./homelogin.module.css";
import Link from "next/link";
//import { useRouter } from "next/router";

const Home = () => {
  


  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>DashBoard</h1>
      <div className={styles.boxContainer}>
        <div className={styles.row}>
          <Link href="/profile" passHref>
            <div className={styles.box}>
              <span className={styles.boxIcon}>👤</span>
              <span className={styles.boxText}>Profile</span>
            </div>
          </Link>
          <Link href="/test-series" passHref>
            <div className={styles.box}>
              <span className={styles.boxIcon}>📚</span>
              <span className={styles.boxText}>Test Series</span>
            </div>
          </Link>
          <Link href="/live-class" passHref>
            <div className={styles.box}>
              <span className={styles.boxIcon}>🎥</span>
              <span className={styles.boxText}>Live Class</span>
            </div>
          </Link>
        </div>
        <div className={styles.row}>
          <Link href="/course" passHref>
            <div className={styles.box}>
              <span className={styles.boxIcon}>📖</span>
              <span className={styles.boxText}>Course</span>
            </div>
          </Link>
          <Link href="/doubt" passHref>
            <div className={styles.box}>
              <span className={styles.boxIcon}>❓</span>
              <span className={styles.boxText}>Doubt</span>
            </div>
          </Link>
          <Link href="/notes" passHref>
            <div className={styles.box}>
              <span className={styles.boxIcon}>📝</span>
              <span className={styles.boxText}>Notes</span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
