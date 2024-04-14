import React from 'react';
import { Button } from '../ui/button';
import styles from './style.module.css';

interface TButtonProps {
  /*
   * Button name
   */
  name: string;
}

export const ButtonAnimated: React.FC<TButtonProps> = ({ name }) => {
  return <button className={`${styles.button} cursor-none`}>{name}</button>;
};
