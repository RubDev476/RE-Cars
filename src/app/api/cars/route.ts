import { NextRequest } from "next/server";
//import { NextResponse } from "next/server";

import { dbConnection } from "@/db/db";

export const revalidate = 60;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const brandParams = searchParams.get('brand');
    const yearParams = searchParams.get('year');
    const doorsParams = searchParams.get('doors');
    const transmissionParams = searchParams.get('transmission');
    const colorParams = searchParams.get('color');

    const keywords = searchParams.get('keywords');
    const order = searchParams.get('order');

    if (keywords) {
        const extract = keywords.split('-');

        console.log(extract)
    }

    let brandValues = brandParams?.replaceAll('-', ',');
    let brandIds = "";

    let transmissionValues = transmissionParams?.replaceAll('-', ',');
    let transmissionIds = "";

    let colorValues = colorParams?.replaceAll('-', ',');
    let colorIds = "";

    const doorsValues = doorsParams?.replaceAll('-', ',');
    const yearsValues = yearParams?.replaceAll('-', ',');

    if (brandValues) {
        const [rows]: any = await dbConnection.query(`SELECT brand_id AS id FROM brands WHERE FIND_IN_SET(LOWER(Name), LOWER('${brandValues}'));`);

        //rows: [ { id: 2 }, { id: 5 }, { id: 3 }, { id: 4 } ]
        brandIds = rows.map((r: any) => r.id).join(",");
    }

    if (transmissionValues) {
        const [rows]: any = await dbConnection.query(`SELECT transmission_id AS id FROM transmissions WHERE FIND_IN_SET(LOWER(type), LOWER('${transmissionValues}'));`);

        transmissionIds = rows.map((r: any) => r.id).join(",");
    }

    if (colorValues) {
        const [rows]: any = await dbConnection.query(`SELECT color_id AS id FROM colors WHERE FIND_IN_SET(LOWER(name), LOWER('${colorValues}'));`);

        colorIds = rows.map((r: any) => r.id).join(",");
    }

    const [rows]: any = await dbConnection.query(`call filter_cars("${colorIds}", "${brandIds}", "${doorsValues ?? ""}", "",  "${transmissionIds}", "${yearsValues ?? ""}", "${order ?? ""}")`);

    return Response.json(rows[0]);
}
