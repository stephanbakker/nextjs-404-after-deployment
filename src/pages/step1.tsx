import { AppProps } from "next/app";
import { ReactElement } from "react";
import { Navigation } from "@/components/Navigation";
import { GetServerSidePropsResult } from "next";

type Props = {
  content: string
}

export default function Step1({ content = 'hi!' }: Props): ReactElement {
  return (
    <main>
      <Navigation />
      <hr />
      <h1>Step 1</h1>
      <p>{ content }</p>
    </main>
  )
}

export async function getServerSideProps():Promise<GetServerSidePropsResult<Props>> {
  return {
    props: {
      content: 'Server fetched data here'
    }
  }
}