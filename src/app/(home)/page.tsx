import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
    Click <Link href="/documents/123"> <span className="text-blue-500 underline">&nbsp;here&nbsp;</span></Link>
    to the document id
    </div>
  );
}
