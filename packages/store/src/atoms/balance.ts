// this is the atom for the balance related where we will be storing into the central state management for  this purpose 

import { atom } from "recoil";

export const balanceAtom = atom<number>({
    key : "balance",
    default : 0,
})