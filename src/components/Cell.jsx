import styles from "./Cell.module.css";
import { useState, useEffect, useContext, useRef } from "react";
import { CellContext } from "./Board";

export const Cell = ({ handleClick, bee }) => {
  const ref = useRef();

  // const { bee, cell, cells, i, j } = useContext(CellContext);
  // const [clicked, setClicked] = useState(false);

  const onClick = () => {
    handleClick(ref.current);
  };

  return (
    <div ref={ref} className={styles.cell} onClick={onClick}>
      {bee && <div className={styles.bee}></div>}
    </div>
    // cell && (
    //   <div
    //     className={`${styles.cell} ${clicked ? styles.clicked : ""}`}
    //     onClick={() => handleClick()}
    //   >
    //
    //   </div>
    // )
  );
};
