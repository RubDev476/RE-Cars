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

type year = {
    id: number,
    year: number
}

type door = {
    id: number,
    doors: number
}

type transmission = {
    transmission_id: number,
    type: string
}

export type FilterOptions = {
    brands: brand[];
    years: year[];
    doors: door[];
    //colors: string[];
    transmissions: transmission[];
}

//type Options<T> = {
type Options = {
    bool: boolean;
    set: Dispatch<SetStateAction<boolean>>;
    keyUI: string;
    options: brand[] | year[] | door[] | transmission[];
}

export type AccordionOptions = {
    //[keyAccordion: string]: Options<string | number>;
    [keyAccordion: string]: Options;
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
