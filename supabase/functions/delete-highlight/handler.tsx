import React from "react";
import { createClient } from "@supabase/supabase-js";
import { corsHeaders } from "../_shared/cors.ts";

const STORAGE_URL =
  "https://udizfftsmcgvomltkxyr.supabase.co/storage/v1/object/public/images/product-images";

export async function handler(req: Request) {
  const url = new URL(req.url);
  const title = url.searchParams.get("title");

  try {
    const supabaseAdminClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data, error } = await supabaseAdminClient.storage
      .from("images")
      .remove(`product-images/${title}.png`);

    if (error) throw error;

    return new Response(JSON.stringify({ status: "deleted" }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
}
