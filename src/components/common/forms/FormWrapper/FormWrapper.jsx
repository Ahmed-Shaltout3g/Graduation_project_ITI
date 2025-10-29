import React from "react";
import styles from "./FormWrapper.module.css";

const FormWrapper = ({ title, children, onSubmit }) => {
    return (
        <div className={styles.wrapper}>
            <form onSubmit={onSubmit} className={styles.form}>
                <h1 className={styles.title}>{title}</h1>
                {children}
            </form>
        </div>
    );
};

export default FormWrapper;
