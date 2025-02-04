import styles from "@/styles/preloader.module.css";

const Preloader = () => {
  return (
    <div className="absolute left-0 top-0 z-[999] flex h-screen w-screen items-center justify-center bg-black text-white">
      <p className={styles.glitch} data-text="Loading...">
        Loading...
      </p>
    </div>
  );
};

export default Preloader;
