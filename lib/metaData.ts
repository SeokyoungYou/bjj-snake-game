import { headers } from "next/headers";

export const getBaseUrl = async () => {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  return baseUrl;
};
