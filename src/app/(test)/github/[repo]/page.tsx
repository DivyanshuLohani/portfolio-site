import { redirect, RedirectType } from "next/navigation";

export default function Page({ params }: { params: { repo: string } }) {
  return redirect(`/api/github/${params.repo}`, RedirectType.replace);
}
