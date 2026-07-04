import { Button } from "../components/reusableComponents/Button";

export function ErrorFallback({ error, resetErrorBoundary }) {
  console.error(error);
  return (
    <div className="bg-black h-screen w-full flex gap-12 flex-col justify-center items-center text-white">
      <h2>Something went wrong</h2>

      <Button
        fnc={resetErrorBoundary}
        content="Try Again"
        background="bg-red-600"
      />
    </div>
  );
}
