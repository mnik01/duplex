/** @jsx h */
import { FunctionComponent, h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";

const Button: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    (document.getElementById('duplex-form') as HTMLFormElement).submit()
    setIsLoading(true)
  }


  return (
    <button
      type="submit"
      disabled={isLoading}
      onClick={handleSubmit}
      class={tw`px-2 w-full py-1 rounded-md hover:bg-purple-300 uppercase bg-purple-200 ${isLoading ? 'opacity-50 cursor-not-allowed flex justify-center' : ''}`}
    >
      {isLoading ? (
        <img
          src="/loader.png"
          class={tw`h-5 w-5 animate-spin`}
        />
      ) : 'generate chain'}
    </button>
  )
}
export default Button;
