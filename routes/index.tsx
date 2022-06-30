/** @jsx h */
import { FunctionComponent, h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { css } from 'twind/css'
import { tw } from "@twind";
import Title from "../islands/Title.tsx";


interface Data {
  chain: string[];
  first: string;
  second: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const firstWord = url.searchParams.get("first") || "";
    const secondWord = url.searchParams.get("second") || "";

    const chain = ["волк", "ворк", "ворд", "лорд", "лора", "нора"]
    return ctx.render({ chain: firstWord || secondWord ? chain : [],  first: firstWord, second: secondWord });
  },
};

const globalStyles = css({
  ':global': {
    body: {
      background: `repeating-linear-gradient(
        45deg,
        white,
        white 10px,
        rgb(71 154 101 / 15%) 10px,
        rgb(71 154 101 / 15%) 20px
      );`
    },
  },
})

const WordsList: FunctionComponent<{chain: string[]}> = ({ chain }) => <ul class={tw`flex gap-2`}>{
  chain.map((word, index) => (
    <li class={tw`flex gap-2`} key={word}>
      <div class={tw`bg-yellow-500 text-white rounded-lg px-4`} >{word}</div>
        {index !== chain.length - 1 && <p>
          &rarr;
        </p>}
    </li>
  ))
}</ul>


export default function Home({ data }: PageProps<Data>) {
  const { chain, first, second } = data;


  return (
    <div class={tw(globalStyles)}>
      <Title title={first || second ? `Duplex: ${first} &rarr; ${second}` : "Duplex"} />
      <div class={tw`shadow-lg p-8 bg-yellow-100 flex justify-center flex-col items-center gap-8 h-screen mx-auto max-w-screen-md`}>
        <div class={tw`flex flex-col items-center`}>
          <img
            class={tw`w-24 h-24`}
            src="/logo.svg"
            height="100px"
            alt="the fresh logo: a sliced lemon dripping with juice"
          />
          <h1 class={tw`text-xl font-bold`}>
            Duplex
          </h1>
        </div>
        <form class={tw`flex pb-8 flex-col gap-4 items-center`} action="">
          <div class={tw`flex flex-col`}>
            <label htmlFor="">First word</label>
            <input placeholder="Enter something" class={tw`py-2 px-4 rounded-lg text-stale-500`} type="text" name="first" value={first} />
          </div>
          <div class={tw`flex flex-col`}>
            <label htmlFor="">Second word</label>
            <input placeholder="Enter something" class={tw`py-2 px-4 rounded-lg text-stale-500`} type="text" name="second" value={second} />
          </div>
          <button
            type="submit"
            class={tw`px-2 w-full py-1 rounded-md hover:bg-purple-300 uppercase bg-purple-200`}
          >
            generate chain
          </button>
        </form>
        <WordsList chain={chain} />
      </div>
    </div>
  );
}
