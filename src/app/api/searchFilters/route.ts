import { dbConnection } from "@/db/db";

export const revalidate = 60;

export async function GET() {
    const queries = [
        dbConnection.query("SELECT * FROM brands ORDER BY name"),
        dbConnection.query("SELECT * FROM getYears ORDER BY year"),
        dbConnection.query("SELECT * FROM getDoors ORDER BY doors"),
        dbConnection.query("SELECT * FROM transmissions ORDER BY type"),
    ];

    const results = await Promise.allSettled(queries);

    const [brandsResult, yearsResult, doorsResult, transmissionsResult] = results;

    const brands = brandsResult.status === "fulfilled" ? brandsResult.value[0] : [];
    const years = yearsResult.status === "fulfilled" ? yearsResult.value[0] : [];
    const doors = doorsResult.status === "fulfilled" ? doorsResult.value[0] : [];
    const transmissions = transmissionsResult.status === "fulfilled" ? transmissionsResult.value[0] : [];

    return Response.json({
        brands,
        years,
        doors,
        transmissions,
    });
}
