import TaskList from "@/src/components/TaskList";

export default function Page() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">My Day</h1>
      <p className="text-gray-400 mb-6">Tuesday, November 11</p>
      <TaskList />
    </section>
  );
}
