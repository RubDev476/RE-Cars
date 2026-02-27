import { Dispatch, SetStateAction } from "react";

export type Car = {
    id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    doors: number;
    color: string;
    transmission: string;
    urlImage: string;
}

export type MainKeyQueryParams = 'brand' | 'year' | 'doors' | 'transmission' | 'color';
export type AllKeyQueryParams = MainKeyQueryParams | 'keywords' | 'order';

export type TagParam = {
    key: MainKeyQueryParams | 'keywords';
    value: string;
}

type brand = {
    brand_id: number,
    name: string
}

export type FilterOptions = {
    brands: brand[];
    years: any;
    doors: any;
    //colors: string[];
    transmissions: any;
}

type Options<T> = {
    bool: boolean;
    set: Dispatch<SetStateAction<boolean>>;
    keyUI: string;
    options: T[];
}

export type AccordionOptions = {
    [keyAccordion: string]: Options<string | number>;
}

export type ModalProps = {
    createURL: (key: AllKeyQueryParams, value: string) => void;
    params: URLSearchParams;
    tagsParams: TagParam[];
}

export type SearchFiltersProps = {
    openMenu: boolean;
    currentOption: string;
    setCurrentOption: Dispatch<SetStateAction<string>>;
}

export type FiltersHeaderProps = {
    resetFilters: () => void;
    btnOrder: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
