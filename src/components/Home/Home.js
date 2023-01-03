import styles from "./Home.module.css";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* //<!--HOME PAGE--> */}
      <div className={styles["hero-section"]}>
        <div className={styles["home-slider"]}>
          <div className={styles["text-part"]}>
            <h1>Put your life in order</h1>
            <h2>
              Organize your daily task, short and long term GOALS with our App.
            </h2>
            <Link to="register">
              <button className={`btn ${styles.hero}`}>START NOW</button>
            </Link>
          </div>
          <div className={styles["image-part"]}>
            <img
              src={process.env.PUBLIC_URL + "/images/hero-img.jpg"}
              alt="hero"
            />
          </div>
        </div>
      </div>

      {/* <!--TOP VIDEOS ON TIME MANAGEMENT--> */}
      <div className={`main ${styles.videos}`}>
        <h2>Top Video on Time Management</h2>
        <div className={styles["video-cards"]}>
          <div className={styles["video-card"]}>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/iONDebHX9qk`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>
          <div className={styles["video-card"]}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/tQSKyvjsUuI"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>
          <div className={styles["video-card"]}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/K-ssUVyfn5g"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>
        </div>
      </div>

      {/* //TOP ARTICLES ON TIME MANAGEMENT */}
      <div className={`main ${styles.articles}`}>
        <h2>Top Articles on Time Management</h2>
        <div className={styles["article-cards"]}>
          <div className={styles["article-card"]}>
            <h3>Article 1</h3>
            <p>
              {" "}
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
              dicta voluptates obcaecati, sunt saepe sapiente quaerat iste hic
              minima eligendi, quia, nisi ratione architecto corrupti doloremque
              temporibus quo vitae commodi.
            </p>
            <button class="btn">Read More</button>
          </div>
          <div className={styles["article-card"]}>
            <h3>Article 2</h3>
            <p>
              {" "}
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
              dicta voluptates obcaecati, sunt saepe sapiente quaerat iste hic
              minima eligendi, quia, nisi ratione architecto corrupti doloremque
              temporibus quo vitae commodi.
            </p>
            <button class="btn">Read More</button>
          </div>
          <div className={styles["article-card"]}>
            <h3>Article 3</h3>
            <p>
              {" "}
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
              dicta voluptates obcaecati, sunt saepe sapiente quaerat iste hic
              minima eligendi, quia, nisi ratione architecto corrupti doloremque
              temporibus quo vitae commodi.
            </p>
            <button class="btn">Read More</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
