import styles from './navbar-link.module.scss';

/* eslint-disable-next-line */
export interface NavbarLinkProps {}

export function NavbarLink(props: NavbarLinkProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to NavbarLink!</h1>
    </div>
  );
}

export default NavbarLink;
