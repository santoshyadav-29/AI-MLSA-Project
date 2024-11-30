import { atom } from "jotai";

const authAtom = atom<
  { loggedIn: false; user: null } | { loggedIn: true; user: User }
>({ loggedIn: false, user: null });

export default authAtom;
