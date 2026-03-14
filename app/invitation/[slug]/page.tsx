import { decodeData } from "@/lib/utils";
import InvitationTemplate from "@/components/InvitationTemplate";
import { notFound } from "next/navigation";

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = decodeData(slug);

  if (!data) {
    notFound();
  }

  return <InvitationTemplate data={data} />;
}
