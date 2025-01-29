"use client"

import { Children, useState } from "react";
import { Id } from "../../convex/_generated/dataModel"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface RemoveDialogProps{
    documentId : Id<"documents">;
    children : React.ReactNode;

}

export const RemoveDialog = ({documentId,children}: RemoveDialogProps) =>{
   const router = useRouter()
    const remove = useMutation(api.documents.removeId)
    const [isRemoving,setIsRemoving] = useState(false)
return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
            <AlertDialogHeader>
<AlertDialogTitle>Are you sure</AlertDialogTitle>
<AlertDialogDescription>
    this will permanently delete your document
</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                     disabled={isRemoving}
                     onClick={(e) =>{
                        e.stopPropagation();
                        setIsRemoving(true);
                        remove({id : documentId})
                        .catch(() =>toast.error("Something went wrong"))
                        .then(() => {toast.success("Document removed")
                            router.push("/")}
                    )
                        .finally(() => setIsRemoving(false))
                     }}
                    >
                        delete
                    </AlertDialogAction>
                </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
)
}