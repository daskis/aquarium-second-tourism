import styles from './layouts.module.scss';

/* eslint-disable-next-line */
export interface LayoutsProps {}

export function Layouts(props: LayoutsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Layouts!</h1>
    </div>
  );
}

export default Layouts;
