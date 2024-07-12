"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { DatePickerWithRange } from "./DatePickerWithRange"
import { useOrganization, useSession } from "@clerk/nextjs"
import { Progress } from "@radix-ui/react-progress"
import { useQuery, useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Textarea } from "./ui/textarea"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreateTaskDialog } from "@/components/CreateTaskDialog";

const formSchema = z.object({
  taskName: z.string().min(1).max(50),
  Category: z.string().min(1).max(50),
  dueDate: z.string().min(1).max(50),
  AssignTo: z.string().min(1).max(50),
  Remarks: z.string().min(1).max(50),
})


export function CardWithForm() {
  const { organization } = useOrganization();
  const DefaultSelects = useQuery(api.defaultSelects.defaultSelects);

  const Tasks = useQuery(api.tasks.getTasks, organization?.id ? { orgId: organization.id } : 'skip');
  const createTask = useMutation(api.tasks.createTask);
  const session = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: "",
    },
  })


  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!organization) return;
            createTask({
              orgId: organization?.id,
              taskName: values.taskName,
              taskCategory: values.Category,
              dueDate: values.dueDate,
              workDone: 0,
              skilledWorkers: 0,
              unSkilledWorkers: 0,
              assignedTo: values.AssignTo,
              priority: 'High',
              remarks: values.Remarks,
            })
    console.log(values)
  }

  return (
    <Card className="w-[350px] border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-indigo-600 font-bold">Create Task</CardTitle>
        <CardDescription>Create new task in one-click.</CardDescription>
      </CardHeader>
      <CardContent className="border-none">


        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>


            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="taskName"
                  render={({ field }) => (
                    <><FormLabel>Task Name</FormLabel><FormControl>
                      <Input placeholder="Name of the task" {...field} />
                    </FormControl></>
                  )}
                />
              </div>


              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="Category"
                  render={({ field }) => {
                    return (
                      <><FormLabel htmlFor="Category">Category</FormLabel><Select onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}>
                        <SelectTrigger id="Category">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {DefaultSelects?.map((Category) => {
                            return <SelectItem key={Category._id} value={Category.taskCategory}>{Category.taskCategory}</SelectItem>
                          })}

                        </SelectContent>
                      </Select></>
                    );
                  }}
                />
              </div>


              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <><FormLabel>Due Date</FormLabel><FormControl>
                      <Input placeholder="Enter due date" {...field} />
                    </FormControl></>
                  )}
                />
              </div>


              <div className="flex flex-col space-y-1.5">
                <FormLabel htmlFor="Assign To">Assign To</FormLabel>
                <FormField
                  control={form.control}
                  name="AssignTo"
                  render={({ field }) => {
                    return (
                      <Select onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}>
                        <FormControl>
                          <SelectTrigger id="Assign To">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent position="popper">
                          
                          <SelectItem value={'Electrical Team'}>Electrical Team</SelectItem>
                          <SelectItem value={'Construction Team'}>Construction Team</SelectItem>
                          <SelectItem value={'Painting Team'}>Painting Team</SelectItem>
                          <SelectItem value={'Labors'}>Labors</SelectItem>
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="Remarks"
                  render={({ field }) => (
                    <><FormLabel>Remarks</FormLabel><FormControl>
                      <Textarea placeholder="Add remarks" {...field} />
                    </FormControl></>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 mt-6 self-">Create</Button>
            </div>
          </form>
        </Form>
      </CardContent>
  
    </Card>
  )
}
