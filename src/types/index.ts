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

type FilterOptionsItems = {
    id: number,
    value: string | number
}

export type FilterOptions = {
    brands: FilterOptionsItems[];
    years: FilterOptionsItems[];
    doors: FilterOptionsItems[];
    colors: FilterOptionsItems[];
    transmissions: FilterOptionsItems[];
}

//type Options<T> = {
type Options = {
    bool: boolean;
    set: Dispatch<SetStateAction<boolean>>;
    keyUI: string;
    options: FilterOptionsItems[];
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
