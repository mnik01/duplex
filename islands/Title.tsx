/** @jsx h */
import { FunctionComponent, h } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";

interface TitleProps {
  title: string;
}

const Title: FunctionComponent<TitleProps> = ({ title }) => {
  useEffect(() => {
    if (IS_BROWSER) {
      document.title = title;
    }
  }, [])

  return <div/>
}

export default Title;
