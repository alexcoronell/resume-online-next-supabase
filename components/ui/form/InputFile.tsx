'use client';
import styles from '@/styles/form-group.module.css';

interface InputFileProps {
  titleInputFileButton?: string;
  classes?: string;
  imageFilename?: string | null;
  disabled?: boolean;
  removeImage?: () => void;
}

export function InputFile({
  titleInputFileButton = 'Upload image',
  classes,
  imageFilename,
  disabled = false,
}: InputFileProps) {
  return (
    <div className={`${styles.formgroupInput} ${classes}`.trim()}>
      {!disabled && imageFilename ? (
        <button type='button'>Remove Image</button>
      ) : (
        <>
          <label htmlFor='inputfile'>{titleInputFileButton}</label>
          <input
            name='inputfile'
            type='file'
            id='inputfile'
            disabled={disabled}
          />
        </>
      )}
      <p className={styles.formgroupInput__message}>
        {imageFilename ? imageFilename : 'No file selected'}
      </p>
    </div>
  );
}
