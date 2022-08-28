import styles from "./Container.module.css";

type Props = {
  children?: React.ReactNode;
};

function Container(props: Props) {
  return <div className={styles.container}>{props.children}</div>;
}

export default Container;
