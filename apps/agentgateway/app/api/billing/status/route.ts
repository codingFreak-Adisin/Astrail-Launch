import { NextResponse } from "next/server";
import { canResetBillingUsage, getBillingUsageSummary, resetBillingUsage } from "@/lib/billing/usage";
import { localDemoUserId } from "@/lib/local-demo";
import { hasServerSupabaseEnv } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!hasServerSupabaseEnv()) {
    const usage = await getBillingUsageSummary(localDemoUserId);
    return NextResponse.json({ usage, preview: true, canResetUsage: true });
  }

  let data;
  try {
    const supabase = createServerSupabaseClient();
    const result = await supabase.auth.getUser();
    data = result.data;
  } catch (error) {
    console.error("astrail.billing.status.auth_unavailable", {
      message: error instanceof Error ? error.message : "Unknown auth error",
    });

    return NextResponse.json(
      { error: "Billing usage is temporarily unavailable." },
      { status: 503 },
    );
  }

  if (!data.user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const usage = await getBillingUsageSummary(data.user.id);
  return NextResponse.json({ usage, canResetUsage: canResetBillingUsage(data.user.email) });
}

export async function POST(request: Request) {
  if (request.headers.get("x-astrail-reset-confirm") !== "reset-monthly-usage") {
    return NextResponse.json({ error: "Reset confirmation is required." }, { status: 400 });
  }

  if (!hasServerSupabaseEnv()) {
    const usage = await getBillingUsageSummary(localDemoUserId);
    return NextResponse.json({ usage, preview: true, canResetUsage: true });
  }

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  if (!canResetBillingUsage(data.user.email)) return NextResponse.json({ error: "Usage reset is not allowed for this account." }, { status: 403 });

  try {
    const usage = await resetBillingUsage(data.user.id);
    return NextResponse.json({ usage, canResetUsage: true });
  } catch {
    return NextResponse.json({ error: "Usage could not be reset." }, { status: 503 });
  }
}
