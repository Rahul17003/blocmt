import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CardWithForm } from "./CardWithForm"
import { Button } from "./ui/button"

export function CreateTaskPopover() {
    return (
        <Popover>
            <PopoverTrigger><Button className="bg-indigo-600 hover:bg-indigo-700">Create Task</Button></PopoverTrigger>
            <PopoverContent className="w-max border-none shadow-none"><CardWithForm/></PopoverContent>
        </Popover>
    )
}