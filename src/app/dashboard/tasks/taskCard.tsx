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
import { Separator } from "@/components/ui/separator"
import { Doc } from "../../../../convex/_generated/dataModel"


export function TaskCard({Task}: {Task: Doc<"tasks">}) {
    return (
        <Card className="w-[350px]">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
                    <div>
                      <CardTitle>{Task.taskName}</CardTitle>
                      <CardDescription>{Task.taskCategory}</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <h2 className="text-xs">Progress</h2>
                    <span className="text-indigo-600 text-lg font-bold">{Task.workDone}%</span>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <div>
                    <h2 className="text-xs">Assigned</h2>
                    <span className="text-indigo-600 font-bold">{Task.assignedTo}</span>
                  </div>
                  <Separator orientation="vertical" />
                  <div>
                    <h2 className="text-xs">Due Date</h2>
                    <span className="text-indigo-600 font-bold">{Task.dueDate}</span>
                  </div>
                  <Separator orientation="vertical" />
                  <div>
                    <h2 className="text-xs">Priority</h2>
                    <span className="text-indigo-600 font-bold">{Task.priority}</span>
                  </div>
                </CardFooter>
              </Card>
    )
}