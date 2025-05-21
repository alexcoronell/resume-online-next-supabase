import styles from '@/styles/form-group.module.css';

export function Select() {
  return (
    <div className={styles.formgroup}>
      <label htmlFor='items'>
        <select name='items' id='items'>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
        <span>Items per page</span>
      </label>
    </div>
  );
  <p className={`text-xs absolute text-red`}>Error Message</p>;
}
