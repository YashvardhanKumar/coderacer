import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { NavBar } from "@/components/nav-bar"

// This is a mock data array. In a real application, you'd fetch this from an API or database.
const problems = [
  { id: 1, title: "Two Sum", difficulty: "Easy", createdAt: "2023-04-01" },
  { id: 2, title: "Add Two Numbers", difficulty: "Medium", createdAt: "2023-04-05" },
  { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", createdAt: "2023-04-10" },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-6">Your Problems</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problems.map((problem) => (
              <TableRow key={problem.id}>
                <TableCell>{problem.title}</TableCell>
                <TableCell>{problem.difficulty}</TableCell>
                <TableCell>{problem.createdAt}</TableCell>
                <TableCell>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/edit/${problem.id}`}>Edit</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  )
}

