import { trpc } from "../utils/trpc";

export default function HelloWorld() {
  const { data, isLoading } = trpc.useQuery(["helloWorld", { name: "Fa" }]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <p>{data?.message}</p>
    </div>
  );
}
