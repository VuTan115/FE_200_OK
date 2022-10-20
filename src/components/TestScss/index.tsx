export interface ITestComponentProps {
  data: 'test';
}
import styles from './styles.module.scss';
export function TestComponent(props: ITestComponentProps) {
  return (
    <div>
      <h1 className={styles.test}>Test Component with sass</h1>
    </div>
  );
}
