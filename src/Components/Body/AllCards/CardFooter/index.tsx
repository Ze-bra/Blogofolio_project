import React, { useState } from "react";
import styles from "./styles.module.scss";
import { CardFooterType } from '../../../../types/cardFooterType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown, faThumbsUp, faBookmark } from '@fortawesome/free-regular-svg-icons';


const CardFooter = (props: CardFooterType) => {
  const [cardFooter, setValue] = useState(props)

  const likeOnClick = () => {
    setValue(x => Object.assign({},
      x,
      { likes: x.likes + 1 }))
  }

  const dislikeOnClick = () => {
    setValue(x => Object.assign({},
      x,
      { dislikes: x.dislikes + 1 }))
  }

  return (
    <footer className={styles.cardFooter}>
      <div>
        <div className={styles.cardFooterControl}>
          <FontAwesomeIcon icon={faThumbsUp} onClick={likeOnClick} />
          <span>{cardFooter.likes}</span>
        </div>
        <div className={styles.cardFooterControl}>
          <FontAwesomeIcon icon={faThumbsDown} onClick={dislikeOnClick} />
          <span>{cardFooter.dislikes}</span>
        </div>
      </div>
      <div>
        <div className={styles.cardFooterControl}>
          <FontAwesomeIcon icon={faBookmark} />
        </div>
        <div className={styles.cardFooterControl}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </div>
      </div>
    </footer>
  );
}

export default CardFooter;
