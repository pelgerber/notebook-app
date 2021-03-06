import Head from 'next/head';
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import NoteFooter from './footer';
import NoteNavbar from './navbar';


export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <NoteNavbar />
            <Head>
                <title>Notebook-App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>{children}</main>
            <NoteFooter />
        </div>
    );
}
