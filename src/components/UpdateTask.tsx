import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "./ui/slider"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"

export function UpdateTask() {
  return (
    <Card className="w-max border-none bg-none shadow-none">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-purple-700 font-bold">Electrical Wiring</CardTitle>
          <CardDescription>Electrical</CardDescription>
        </div>
        <div>
          <HoverCard>
            <HoverCardTrigger>
              <h2 className="text-xs">Due Date</h2>
              <span className="text-violet-600 font-bold">02, Dec</span>
            </HoverCardTrigger>
            <HoverCardContent className="text-xs w-fit">
              Task deadline <span className="text-purple-600 font-bold">02-Dec-2024.</span>
            </HoverCardContent>
          </HoverCard>

        </div>
      </CardHeader>
      <CardContent className="flex flex-row gap-6">
        <form>
          <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Taskname">Work Done</Label>
              <div className="p-1 flex gap-2 items-center">
                <Slider defaultValue={[33]} max={100} step={1} id="Slider" />
                <Input id="name" placeholder="33%" className="w-14 h-8 text-purple-600 placeholder-purple-600 text-center font-bold border-none bg-slate-100" />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <div className="p-1 flex gap-2 items-center">
                <div>
                <Label htmlFor="Taskname">Skilled Workers</Label>
              <Input id="name" type="number" placeholder="00" className="text-purple-600 text-center font-bold bg-slate-100" />
              </div>
              <div>
              <Label htmlFor="Taskname">Unskilled Workers</Label>
                <Input id="name" type="number" placeholder="00" className="text-purple-600 text-center font-bold bg-slate-100" />
              </div>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Tasktype">Upload Picture</Label>
              <Input id="Picture" type="file" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Remarks">Remarks</Label>
              <textarea className="border rounded-md"/>
            </div>
          </div>
        </form>
        
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="text-red-600" >Delete</Button>
        <Button className="text-white bg-purple-700">Update</Button>
      </CardFooter>
    </Card>
  )
}