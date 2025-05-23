import styles from '@/styles/form-group.module.css'

interface InputFileProps {
  classes?: string;
}


export function InputFile({classes}: InputFileProps) {
  return (
    <div className={`${styles.formgroupInput} ${classes}`.trim()}>
        <label htmlFor="inputfile">
        Upload image
        </label>
            <input name="inputfile" type='file' id='inputfile' />
        <p className={styles.formgroupInput__message}>No file selected</p>
    </div>
  );
}