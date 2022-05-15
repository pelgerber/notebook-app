import styles from './footer.module.css'
import Image from 'next/image';

export default function NoteFooter() {
    return (
        <footer className={styles.footer}>
            <a>
                Created by{' '}
                <span className={styles.logo}>
                    <Image src="/logo.svg" alt="My Notebook" width={20} height={20} />
                </span>
            </a>
        </footer>
    );
}