

import { Id } from "../../../../convex/_generated/dataModel";
import {preloadQuery} from "convex/nextjs"
import { Document } from "./document";
import { api } from "../../../../convex/_generated/api";
import { auth } from "@clerk/nextjs/server";

interface DocumentIdProps {
    params : Promise<{documentId : Id<"documents">}>
}
const DocumentIdPage = async ({params}:DocumentIdProps) => {
   
    const {documentId} = await params;
    console.log(documentId);
    const {getToken} = await auth();
    console.log(getToken);
    const token =await getToken({template : "convex"}) ?? undefined

    console.log(token)

    if(!token){
      throw new Error("Unauthorized");
    }

    const preloadedDocument = await preloadQuery(
      api.documents.getById,
      {id : documentId},
      {token}
    )
   
    if(!preloadedDocument){
      throw new Error("Document not found")
    }

    return <Document preloadedDocument={preloadedDocument}/>
}
 
export default DocumentIdPage;