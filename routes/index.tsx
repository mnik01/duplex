/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { css } from 'twind/css'
import { Handlers, PageProps } from "$fresh/server.ts";

const NAMES = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank"];

interface Data {
  results: string[];
  first: string;
  second: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const firstWord = url.searchParams.get("first") || "";
    const secondWord = url.searchParams.get("second") || "";

    const results = NAMES.filter((name) => {
      if (!firstWord) return name.includes(secondWord);
      if (!secondWord) return name.includes(firstWord);

      return false;
    });
    return ctx.render({ results, first: firstWord, second: secondWord });
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


export default function Home({ data }: PageProps<Data>) {
  const { results, first, second } = data;

  return (
    <div class={tw(globalStyles)}>
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
            <input type="text" name="first" value={first} />
          </div>
          <div class={tw`flex flex-col`}>
            <label htmlFor="">Second word</label>
            <input type="text" name="second" value={second} />
          </div>
          <button
            type="submit"
            class={tw`px-2 w-full py-1 rounded-md hover:bg-purple-300 uppercase bg-purple-200`}
          >
            generate chain
          </button>
          <ul>
            {results.map((name) => <li key={name}>{name}</li>)}
          </ul>
        </form>
      </div>
    </div>
  );
}
