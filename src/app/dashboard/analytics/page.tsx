"use client"
import Link from "next/link"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart";
import {
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
    Menu,
    Package2,
    Search,
    Users,
} from "lucide-react"
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SignedIn, SignedOut, SignInButton, SignOutButton, useOrganization, useSession, useUser } from "@clerk/nextjs";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const chartData = [
    { month: "January", Tasks: 11, Completed: 10 },
    { month: "February", Tasks: 221, Completed: 120  },
    { month: "March", Tasks: 311, Completed: 130 },
    { month: "April", Tasks: 121, Completed: 410  },
    { month: "May", Tasks: 131, Completed: 120  },
    { month: "June",Tasks: 121, Completed: 140  },
  ]
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

export default function Analytics() {
    const organization = useOrganization();
    const user = useUser()
    let orgId: string | undefined = undefined;
    if (organization.isLoaded && user.isLoaded) {
        orgId = organization.organization?.id ?? user.user?.id;
    }
    const Tasks = useQuery(api.tasks.getTasks, orgId ? { orgId } : 'skip')
    const createTask = useMutation(api.tasks.createTask)
    const session = useSession();
    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <Card x-chunk="dashboard-01-chunk-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Payment Received
                            </CardTitle>

                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-indigo-600">Rs 4,52,310.89</div>
                            <p className="text-xs text-muted-foreground">
                                Total payments: 08
                            </p>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Overall Progress
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-indigo-600">42 Percent %</div>
                            <p className="text-xs text-muted-foreground">
                                58% of work remaining
                            </p>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-2">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Estimated Completion </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-indigo-600">02 Sep 2024</div>
                            <p className="text-xs text-muted-foreground">
                                On-time
                            </p>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-3">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Assigned Engineers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-indigo-600">03</div>
                            <p className="text-xs text-muted-foreground">
                                Site Engineers
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <Card
                        className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                    >
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle className="text-indigo-600">Current Tasks</CardTitle>
                                <CardDescription>
                                    Recent and on-going tasks.
                                </CardDescription>
                            </div>

                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Task Detail</TableHead>
                                        <TableHead className="text-right">Progress</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Tasks?.map((Task) => {
                                        return <TableRow key={Task._id}>
                                            <TableCell>
                                                <div className="font-medium">{Task.taskName}</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    {Task.taskCategory}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">{Task.workDone}</TableCell>
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Task Completion</CardTitle>
                            <CardDescription>January - June 2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig}>
                                <BarChart accessibilityLayer data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="dashed" />}
                                    />
                                    <Bar dataKey="Tasks" fill="var(--color-desktop)" radius={4} />
                                    <Bar dataKey="Completed" fill="var(--color-mobile)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                            <div className="flex gap-2 font-medium leading-none">
                                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="leading-none text-muted-foreground">
                                Showing total visitors for the last 6 months
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </main>
        </div>
    )
}
