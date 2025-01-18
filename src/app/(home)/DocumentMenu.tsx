import { Button } from "@/components/ui/button"
import { ExternalLinkIcon, icons, MoreVertical, TrashIcon } from "lucide-react"
import { Id } from "../../../convex/_generated/dataModel"
import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { RemoveDialog } from "@/components/remove-dialog";

interface DocumentMenuProps {
    documentId : Id<"documents">;
    title : string;
    onNewTab : (id : Id<"documents">) => void
}
export const DocumentMenu =({documentId,title,onNewTab}:DocumentMenuProps) =>{
    return (<DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full" size="icon">
      <MoreVertical className="size-4"/>
   </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <RemoveDialog documentId={documentId}>
             <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>
                <TrashIcon className="size-4 mr-2"/>
                Remove
             </DropdownMenuItem>
            </RemoveDialog>
            <DropdownMenuItem onClick={() => onNewTab(documentId)}>\<ExternalLinkIcon className="size-4 mr-2"/>
                Open in new Tab
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
   
    )
}