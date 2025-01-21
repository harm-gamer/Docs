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
import { getUsers } from "./actions";

type User = {id : string; name : string; avatar : string}
export function Room({ children }: { children: ReactNode }) {
    const params = useParams();

    const [users,setUsers] = useState<User[]>([]);
      const fetchUsers = useMemo(() => async () => {
        try{
          const list  = await getUsers()
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
      authEndpoint="/api/liveblocks-auth"
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
      resolveRoomsInfo={() => []}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<FullscreenLoader label="Room loading..."/>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}