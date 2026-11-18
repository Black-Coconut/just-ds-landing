import Landing from "@/components/Landing";
import { ko } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(ko);

export default function Page() {
  return <Landing t={ko} />;
}
