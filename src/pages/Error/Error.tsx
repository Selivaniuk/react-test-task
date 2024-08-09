import styles from "./Error.module.scss";

interface Props {
  message: string;
}
const ErrorPage: React.FC<Props> = ({ message }) => {
  return (
    <div className={styles.page}>
      <p>Error: {message}</p>
    </div>
  );
};

export default ErrorPage;
