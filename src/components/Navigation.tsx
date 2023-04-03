import { useRouter } from 'next/router'
import Link from "next/link";

export function Navigation() {
  const { replace} = useRouter()

  return (
    <>
      <h2>Using Link component</h2>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/step1">Step 1 (regular)</Link>
        <Link href="/step1" as="/">Step 1 (while stying on root /): FAILS if you are on /</Link>
        <Link href="/step2" as="/step1">Step 1 (while stying on root /): FAILS if you are on /step1</Link>
      </nav>
      <h2>Using router</h2>
      <nav>
        <button onClick={() => replace('/')}>Home</button>
        <button onClick={() => replace('/step1')}>Step 1 (regular)</button>
        <button onClick={() => replace('/step1', '/')}>Step 1 (while staying on root /): FAILS if your are on /</button>
        <button onClick={() => replace('/step2', '/step1')}>Step 2 (url: /step1): FAILS if you are on /step1</button>
      </nav>
    </>
  )
}