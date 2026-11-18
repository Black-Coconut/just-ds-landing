import Landing from "@/components/Landing";
import { en } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(en);

export default function Page() {
  return <Landing t={en} />;
}
