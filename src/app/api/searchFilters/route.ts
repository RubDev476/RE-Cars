import { dbConnection } from "@/db/db";

export const revalidate = 60;

/*export async function GET() {
    const [brands] = await dbConnection.query('SELECT * FROM brands order by name');
    const [years] = await dbConnection.query('SELECT * FROM getYears order by year');
    const [doors] = await dbConnection.query('SELECT * FROM getDoors order by doors');
    const [transmissions] = await dbConnection.query('SELECT * FROM transmissions order by type');

    return Response.json({
        brands,
        years,
        doors,
        transmissions
    });
}*/

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
