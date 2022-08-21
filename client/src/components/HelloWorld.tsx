import { trpc } from "../utils/trpc";

export default function HelloWorld() {
  const { data, isLoading } = trpc.useQuery(["tutorial.list"]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
