import styles from './page.module.css'
import Link from 'next/link'

export type Post = {
    id: number
    userId: number
    title: string
    body: string
}

export default async function Home() {
    const data: Post[] = await fetch(
        'https://cloudflare-worker-t1.hello-test-workers.workers.dev/',
        {
            cache: 'force-cache',
        }
    ).then((res) => res.json())

    return (
        <main className={styles.main}>
            {data.map((post) => (
                <Link
                    href={`/post/${post.id}`}
                    key={post.id}
                    className={styles.post}
                >
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </Link>
            ))}
        </main>
    )
}
