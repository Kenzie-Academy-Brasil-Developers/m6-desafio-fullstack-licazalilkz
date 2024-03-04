import { forwardRef } from 'react';
import styles from './style.module.scss';

export const Input = forwardRef(
  ({ nome, placeholder, type, required, ...rest }: any, ref) => {
    return (
      <>
        <div className={styles.content}>
          <label>{nome}</label>
          <input
            type={type}
            placeholder={placeholder}
            required={true}
            ref={ref}
            {...rest}
          />
        </div>
      </>
    );
  },
);
