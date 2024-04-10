// this is the page where we will be handling the routes that is get and post request routes related to the user for this purpose 

import { NextResponse } from "next/server";

export const GET = async () => {
    const data = {
        name : "rupesh", 
        age : 23
    };
    return NextResponse.json({data});
}