import { dbConnection } from "@/db/db";

export const revalidate = 60;

export async function GET() {
    const queries = [
        dbConnection.query("SELECT brand_id AS id, name AS value FROM brands ORDER BY name"),
        dbConnection.query("SELECT id, year AS value FROM getYears ORDER BY year"),
        dbConnection.query("SELECT id, doors AS value FROM getDoors ORDER BY doors"),
        dbConnection.query("SELECT transmission_id AS id, type AS value FROM transmissions ORDER BY type"),
        dbConnection.query("SELECT color_id AS id, name AS value FROM colors ORDER BY name"),
    ];

    const results = await Promise.allSettled(queries);

    const [brandsResult, yearsResult, doorsResult, transmissionsResult, colorsResult] = results;

    const brands = brandsResult.status === "fulfilled" ? brandsResult.value[0] : [];
    const years = yearsResult.status === "fulfilled" ? yearsResult.value[0] : [];
    const doors = doorsResult.status === "fulfilled" ? doorsResult.value[0] : [];
    const transmissions = transmissionsResult.status === "fulfilled" ? transmissionsResult.value[0] : [];
    const colors = colorsResult.status === "fulfilled" ? colorsResult.value[0] : [];

    return Response.json({
        brands,
        years,
        doors,
        transmissions,
        colors
    });
}
