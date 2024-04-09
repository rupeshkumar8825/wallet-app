// this is the hook to get or fetch the value of the balance from the central repository for this purpose 
// do note this we have made our own custom hooks just like we use the already built in hooks like the useEffect, useState and so on 

import { useRecoilValue } from "recoil"
import { balanceAtom } from "../atoms/balance"

export const useBalance = () => {
    const value = useRecoilValue(balanceAtom);
    return value;
}

