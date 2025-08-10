import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CircleCheckBigIcon } from "lucide-react"

const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    acceptance: "48%",
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    acceptance: "39%",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    acceptance: "33%",
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    acceptance: "35%",
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    acceptance: "32%",
  },
]

export function ProblemList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead className="text-right">Acceptance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {problems.map((problem) => (
          <TableRow key={problem.id}>
            <TableCell><CircleCheckBigIcon color="green"/></TableCell>
            <TableCell>
              <Link href={`/problems/${problem.id}`} className="hover:underline">
                {problem.title}
              </Link>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  problem.difficulty === "Easy"
                    ? "success"
                    : problem.difficulty === "Medium"
                      ? "warning"
                      : "destructive"
                }
              >
                {problem.difficulty}
              </Badge>
            </TableCell>
            <TableCell className="text-right">{problem.acceptance}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

