import React from "react";
import { ImageResponse } from "og_edge";
import { createClient } from "@supabase/supabase-js";
import { corsHeaders } from "../_shared/cors.ts";

const STORAGE_URL =
  "https://udizfftsmcgvomltkxyr.supabase.co/storage/v1/object/public/images/product-images";
const EMP_LOGO = `${STORAGE_URL}/logo/emp_logo.jpg`;
const date = new Date();
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export async function handler(req: Request) {
  const url = new URL(req.url);
  const title = url.searchParams.get("title");
  const imgUrl = url.searchParams.get("imgUrl");
  const description = url.searchParams.get("description");
  const price = url.searchParams.get("price");
  const size = url.searchParams.get("size");

  try {
    const supabaseAdminClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const generatedImage = new ImageResponse(
      (
        <>
          <div tw="flex h-full w-full flex-col items-start justify-start bg-white py-8">
            <div tw="flex w-full justify-between mb-8 px-8">
              <div tw="flex h-16 w-16">
                <img tw="h-full w-full object-contain" src={EMP_LOGO} />
              </div>
              <span tw="text-xl text-[#832e31]">
                {months[date.getMonth()]} {date.getDate()} |{" "}
                {date.getFullYear()}
              </span>
            </div>
            <div tw="mb-8 flex items-center justify-start w-[75vw] bg-[#e0948c] py-2 px-8 rounded-r-lg">
              <h2 tw="text-4xl font-bold text-[#832e31]">This Week Posts</h2>
            </div>
            <div tw="mb-8 flex px-8">
              <div tw="flex h-64 w-64">
                <img
                  tw="h-full w-full object-contain rounded-lg"
                  src={imgUrl!}
                />
              </div>
              <div tw="flex flex-col ml-8">
                <span tw="text-3xl mb-2">{title}</span>
                <p tw="mb-2">{description}</p>
                <div tw="flex flex-col text-xl mb-2">
                  <span tw="font-bold">Size</span>
                  <span>{size}</span>
                </div>
                <div tw="flex flex-col text-xl">
                  <span tw="font-bold">Price</span>
                  <span>{price} Birr</span>
                </div>
              </div>
            </div>
            <div tw="flex w-full items-center justify-center text-xl">
              <span>
                Powered By <span tw="text-[#832e31]">@Ethio_Market_Place</span>
              </span>
            </div>
          </div>
        </>
      ),
      {
        width: 600,
        height: 600,
        headers: {
          "content-type": "image/png",
          "cache-control":
            "public, max-age=3600, s-maxage=3600, no-transform, immutable",
          "cdn-cache-control": "max-age=3600",
        },
      }
    );

    const { error } = await supabaseAdminClient.storage
      .from("images")
      .upload(`product-images/${title}.png`, generatedImage.body!, {
        contentType: "image/png",
        cacheControl: "3600",
        upsert: true,
      });

    if (error) throw error;
    const supabaseUrl = supabaseAdminClient.storage
      .from("images")
      .getPublicUrl(`product-images/${title}.png`);
    return new Response(JSON.stringify({ imgUrl: supabaseUrl.data.publicUrl }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
}
