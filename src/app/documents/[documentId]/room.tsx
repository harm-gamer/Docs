"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullscreenLoader } from "@/components/fullscreen-loader";
import { toast } from "sonner";
import { getUsers,getDocuments } from "./actions";

import { Id } from "../../../../convex/_generated/dataModel";
import { LEFT_MARGIN_DEFALUT, RIGHT_MARGIN_DEFALUT } from "@/constant/margin";

type User = {id : string; name : string; avatar : string; color : string}
export function Room({ children }: { children: ReactNode }) {
    const params = useParams();

    const [users,setUsers] = useState<User[]>([]);
      const fetchUsers = useMemo(() => async () => {
        try{
          const list  = await getUsers()
          setUsers(list)
        }catch{
          toast.error("Failed to fetch users")
        }
      },[])

      useEffect(() => {
        fetchUsers();
      },[fetchUsers])

  return (
    <LiveblocksProvider 
      throttle={16}
      authEndpoint={ async ()=>{
          const endpoint = "/api/liveblocks-auth";
          const room = params.documentId as string;
          const response = await fetch(endpoint, {
            method :"POST",
            body : JSON.stringify({room})
          })
          return await response.json()
      }}
      //@ts-ignore
      resolveUsers={({userIds}) => {
        return userIds.map((userId) => users.find((user) => user.id == userId)?? undefined )
      }}
      resolveMentionSuggestions={({text}) => {
        let filterUsers = users;

        if(text){
          filterUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }
        return filterUsers.map((user) => user.id)
      }}
      resolveRoomsInfo={async ({roomIds}) => {
        const documents = await getDocuments(roomIds as Id<"documents">[]);
        return documents.map((document) =>({
          id : document.id,
          name : document.name,
        }))
      }}
    >
      <RoomProvider id={params.documentId as string} initialStorage={{leftMargin : LEFT_MARGIN_DEFALUT,rightMargin : RIGHT_MARGIN_DEFALUT}}>
        <ClientSideSuspense fallback={<FullscreenLoader label="Room loading..."/>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}