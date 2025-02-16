"use client"

import type React from "react"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateProblem() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [inputFormat, setInputFormat] = useState("")
  const [outputFormat, setOutputFormat] = useState("")
  const [sampleInput, setSampleInput] = useState("")
  const [sampleOutput, setSampleOutput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log({ title, description, difficulty, inputFormat, outputFormat, sampleInput, sampleOutput })
    // Reset form or redirect
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-6">Create New Problem</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select onValueChange={setDifficulty} required>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="inputFormat">Input Format</Label>
            <Textarea id="inputFormat" value={inputFormat} onChange={(e) => setInputFormat(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="outputFormat">Output Format</Label>
            <Textarea
              id="outputFormat"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="sampleInput">Sample Input</Label>
            <Textarea id="sampleInput" value={sampleInput} onChange={(e) => setSampleInput(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="sampleOutput">Sample Output</Label>
            <Textarea
              id="sampleOutput"
              value={sampleOutput}
              onChange={(e) => setSampleOutput(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Create Problem</Button>
        </form>
      </main>
    </div>
  )
}