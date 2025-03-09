import { redirect, RedirectType } from "next/navigation";

export default function page() {
  return redirect("/api/github", RedirectType.replace);
}
