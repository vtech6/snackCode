import React, { useState, useRef, useEffect } from "react";
import styles from "../../styles/matrix.module.css";
const Matrix = () => {
  const characters =
    "アイウエオカキクケコサシスセソナニヌネノタチツテトラリルレロ";

  const [columnCount, setColumnCount] = useState();
  const [runMatrix, setrunMatrix] = useState(false);

  useEffect(() => {
    setColumnCount(window.innerWidth / 40);
  }, []);

  const scrambleAray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  const generateColumns = () => {
    var columns = [];
    for (var i = 0; i < columnCount; i++) {
      columns.push(i);
    }
    scrambleAray(columns);
    return columns;
  };
  const generateArray = () => {
    const arr = [];
    for (var i = 0; i < characters.length - 1; i++) {
      arr.push(Math.floor(Math.random() * characters.length));
    }
    return arr;
  };

  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <text
          onClick={() => setrunMatrix((prev) => !prev)}
          className={styles.buttonText}
        >
          {runMatrix == false ? `Start` : `Stop`}
        </text>
      </div>
      {columnCount &&
        generateColumns().map((column, columnIndex) => {
          return (
            <div key={columnIndex}>
              {generateArray().map((character, rowIndex) => {
                const charIndex = Math.floor(Math.random() * characters.length);
                const timer = (column + 1) * 300 + (rowIndex + 1) * 100;
                const newCharacter = characters[charIndex];
                return (
                  <Character
                    character={newCharacter}
                    timer={timer}
                    charIndex={rowIndex}
                    runMatrix={runMatrix}
                    key={rowIndex}
                  />
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

const Character = ({ character, timer, charIndex, runMatrix }) => {
  const animationDuration = 500;
  const [showChar, setShowChar] = useState();

  const timeoutClearer = useRef();

  const timeout = (timer) => {
    return new Promise((resolve) => {
      timeoutClearer.current = setTimeout(resolve, timer);
    });
  };

  const showEffect = async (timer) => {
    setShowChar(false);
    await timeout(timer);
    return setShowChar(true);
  };
  const hideEffect = async () => {
    await timeout(animationDuration);
    return setShowChar(false);
  };
  const generateEffect = (timer) => {
    showEffect(timer).then(() => {
      hideEffect().then(() => generateEffect(animationDuration));
    });
  };

  useEffect(() => {
    if (runMatrix == false) {
      clearTimeout(timeoutClearer.current);
      setShowChar(false);
    }
    if (runMatrix == true) {
      generateEffect(timer);
    }
  }, [runMatrix]);
  return (
    <div>
      {showChar ? (
        <text className={styles.characterActive}>{character}</text>
      ) : (
        <text className={styles.characterInactive}>{character}</text>
      )}
    </div>
  );
};

export default Matrix;
