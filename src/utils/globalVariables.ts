import { MainKeyQueryParams } from "@/types";

export const mainKeyQueryParams: MainKeyQueryParams[] = ['brand', 'year', 'doors', 'transmission', 'color'];

export const apiUrl: string | undefined = process.env.NEXT_PUBLIC_API;

//================================ main page
export const headquarters = [
    {
        name: "RE AUTOS CDMX",
        addres: "Carr Amomolulco Ocoyoacac, Estado de México, 52740."
    },
    {
        name: "RE AUTOS Monterrey",
        addres: "AV Sin nombre 9087, Guadalupe, Monterrey, 52740"
    },
    {
        name: "RE AUTOS Mérida",
        addres: "Periferico Norte, No.73, Francisco de Montejo, 52740."
    },
    {
        name: "RE AUTOS Guadalajara",
        addres: "Cristobal Colón 6013, San Pedro Tlaquepaque, Jalisco, 45601."
    },
]

//filtersheader component
export const orderOptions = ['Mayor precio', 'Menor precio', 'Más antiguos', 'Más recientes'];

//foooter component
export const socialIcons = ['facebook', 'instagram', 'youtube', 'twitter', 'pinterest', 'linkedin', 'tiktok'];

//searchfilterscont component
export const optionsKey = {
    keyBrand: {
        engName: 'brands',
        spaName: 'marca'
    },
    keyYear: {
        engName: 'years',
        spaName: 'año'
    },
    keyDoors: {
        engName: 'doors',
        spaName: 'puertas'
    },
    keyTransmission: {
        engName: 'transmissions',
        spaName: 'transmision'
    }
}

export const optionsType = Object.values(optionsKey);