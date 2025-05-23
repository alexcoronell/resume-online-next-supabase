import styles from '@/styles/form-group.module.css'

export function InputFile() {
  return (
    <div className={styles.formgroupInput}>
        <label htmlFor="inputfile">
        Upload image
        </label>
            <input name="inputfile" type='file' id='inputfile' />
        <p className={styles.formgroupInput__message}>No file selected</p>
    </div>
  );
}