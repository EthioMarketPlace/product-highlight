import React from "react";
import { ImageResponse } from "og_edge";
import { createClient } from "@supabase/supabase-js";
import { corsHeaders } from "../_shared/cors.ts";

const STORAGE_URL =
  "https://udizfftsmcgvomltkxyr.supabase.co/storage/v1/object/public/images/product-images";
const EMP_LOGO = `${STORAGE_URL}/logo/emp_logo.png`;
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
  const { title, description, imgUrl } = await req.json();

  try {
    const supabaseAdminClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const generatedImage = new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            height: "100%",
            width: "100%",
            paddingTop: "4rem",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginBottom: "4rem",
              paddingLeft: "4rem",
              paddingRight: "4rem",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "8rem",
                width: "16rem",
              }}
            >
              <img
                style={{
                  height: "100%",
                  width: "100%",
                }}
                src={EMP_LOGO}
              />
            </div>
            <p
              style={{
                fontSize: 45,
                color: "#832e31",
              }}
            >
              {months[date.getMonth()]} {date.getDate()} | {date.getFullYear()}
            </p>
          </div>
          <div
            style={{
              marginBottom: "4rem",
              display: "flex",
              width: "75vw",
              backgroundColor: "#e0948c",
              padding: "3rem",
              borderRadius: "0 1rem 1rem 0",
            }}
          >
            <p
              style={{
                fontSize: 60,
                marginLeft: "1rem",
                color: "#832e31",
                fontWeight: 700,
              }}
            >
              <strong>Daily Product Highlights</strong>
            </p>
          </div>
          <div
            style={{
              marginBottom: "4rem",
              display: "flex",
              paddingLeft: "4rem",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "32rem",
                width: "32rem",
              }}
            >
              <img
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "1rem",
                }}
                src={imgUrl!}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontStyle: "normal",
                color: "black",
                marginLeft: "4rem",
                width: "490px",
                whiteSpace: "pre-wrap",
              }}
            >
              <p
                style={{
                  fontSize: 60,
                  marginBottom: "2rem",
                  fontWeight: 700,
                }}
              >
                <strong>{title}</strong>
              </p>
              <p
                style={{
                  fontSize: 30,
                }}
              >
                {description}
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 33.75,
            }}
          >
            <span>
              Powered By{" "}
              <span
                style={{
                  color: "#832e31",
                }}
              >
                @Ethio_Market_Place
              </span>
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 1200,
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
