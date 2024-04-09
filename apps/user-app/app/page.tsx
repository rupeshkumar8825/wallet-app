import { PrismaClient } from "@repo/db/client";

const client = new PrismaClient();


export default function Page(){ 
  return (
    <>
      <div className="text-2xl">hi there from the user app built usign the nextjs and bunch other services for this purpose </div>
    </>
      );
}
