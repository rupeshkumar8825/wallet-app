import { atom } from "recoil";

interface IOnRampTxns {
    id : Number, 
    status : String, 
    provider : String, 
    amount : Number, 
    startTime : String, 
    userId : Number
}
// this is the atom related to onramptransactions that we fetch from the backend for this purpose 
export const onRampTxnsAtom = atom<IOnRampTxns[]>({
    key : "onRampTxns",
    default : []
});