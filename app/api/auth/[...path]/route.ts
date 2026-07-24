import { getNeonAuth } from "@/lib/neon/server";

export const dynamic = "force-dynamic";
export const { GET, POST, PUT, DELETE, PATCH } = getNeonAuth().handler();
