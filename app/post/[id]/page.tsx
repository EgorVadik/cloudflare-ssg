import { Post } from '@/app/page'
import styles from '@/app/page.module.css'
import Link from 'next/link'

export async function generateStaticParams() {
    const data: Post[] = await fetch(
        'https://cloudflare-worker-t1.hello-test-workers.workers.dev/',
        {
            cache: 'force-cache',
        }
    ).then((res) => res.json())
    return data.map((post) => ({
        id: post.id.toString(),
    }))
}

export default async function page({
    params: { id },
}: {
    params: { id: string }
}) {
    const post: Post = await fetch(
        `https://cloudflare-worker-t1.hello-test-workers.workers.dev/${id}`,
        {
            cache: 'force-cache',
        }
    ).then((res) => res.json())

    return (
        <main
            className={styles.main}
            style={{
                justifyContent: 'center',
            }}
        >
            <Link href='/'>Back</Link>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </main>
    )
}
