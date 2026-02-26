import { NextRequest } from "next/server";

import { CARS_DB } from "@/db/cars";
import { mainKeyQueryParams } from "@/utils/globalVariables";
import { orderF } from "@/store/utilities";

import type { Car, MainKeyQueryParams } from "@/types";
//import { NextResponse } from "next/server";

import { dbConnection } from "@/db/db";

export const revalidate = 60;

export async function GET() {
  const [rows] = await dbConnection.query('SELECT * FROM brands order by name');
  return Response.json(rows);
}
