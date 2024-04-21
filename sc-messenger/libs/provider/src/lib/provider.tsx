import styles from './provider.module.scss';

/* eslint-disable-next-line */
export interface ProviderProps {}

export function Provider(props: ProviderProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Provider!</h1>
    </div>
  );
}

export default Provider;
