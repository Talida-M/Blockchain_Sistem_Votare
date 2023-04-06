import styles from "../styles/Home.module.css";

function Candidates() {
  return (
    <>
      <div className={styles.table}>
        <table>
          <thead>
            <tr className={styles.tr}>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.tr1}>
              <td>1</td>
              <td>Shanti House</td>
            </tr>
            <tr className={styles.tr2}>
              <td>2</td>
              <td>Jyoti House</td>
            </tr>
            <tr className={styles.tr3}>
              <td>3</td>
              <td>Preeti House</td>
            </tr>
          </tbody>
        </table>

      </div>
    </>
  );
}

export default Candidates;
