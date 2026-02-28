'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";

import { SearchFiltersProps } from "@/types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDown, faAngleUp, faAngleRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import { useCarsSelectors } from "@/hooks/useCarsSelectors";

import { optionsType, optionsKey } from "@/utils/globalVariables";

import { Skeleton, Searcher } from '@/components';
import type { FilterOptions } from "@/types";

export default function SearchFiltersCont({ openMenu, currentOption, setCurrentOption }: SearchFiltersProps) {
    const pathname = usePathname();

    const { fetchStatus, filterOptions } = useCarsSelectors();

    return (
        <div className={`search-filters-container ${pathname !== '/' ? 'none' : 'items-between'}`} >
            <div className={`search-container ${openMenu ? 'none' : 'block'}`}>
                <Searcher />
            </div>

            <div className={`filter-header-container ${openMenu ? 'block' : 'none'} p-family`}>
                {fetchStatus === 'loading' && (
                    <>
                        <Skeleton type="header" />
                        <Skeleton type="header" />
                        <Skeleton type="header" />
                        <Skeleton type="header" />
                        <Skeleton type="header" />
                    </>
                )}

                {fetchStatus === 'completed' && (
                    <>
                        <p className="color-4">Filtrar por:</p>
                        
                        {optionsType.map((option) => {
                            const { engName, spaName } = option as { engName: keyof FilterOptions; spaName: string };
                            const arr = filterOptions[engName];

                            if (arr.length > 0) {
                                return <button
                                    className={`btn-filter ${'test-' + spaName} capitalize pointer ${currentOption === spaName ? 'color-1' : 'color-4'}`}
                                    onClick={() => currentOption === spaName ? setCurrentOption('') : setCurrentOption(spaName)}
                                    key={spaName}
                                >
                                    {spaName}
                                    <FontAwesomeIcon icon={faAngleRight} className='icon-filter color-1 icon-mobile' /> <FontAwesomeIcon icon={currentOption === spaName ? faAngleUp : faAngleDown} className='color-1 icon-pc icon-filter' />
                                </button>
                            }
                        })}
                    </>
                )}
            </div>

            <div className={`options-container ${currentOption !== '' ? 'block' : 'none'} ${currentOption}`}>
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    onClick={() => setCurrentOption('')}
                    className='color-1 pointer icon'
                />

                {currentOption === optionsKey.keyBrand.spaName ? (
                    <p className='t-family title-brand'>Marcas mas populares</p>
                ) : (
                    <p className='t-family capitalize title-brand'>{currentOption}</p>
                )}

                <div className="options p-family">
                    {currentOption === optionsKey.keyBrand.spaName && (
                         filterOptions.brands.map((brand) => (
                            <Link href={`/seminuevos?brand=${brand.name.toLowerCase().replace(' ', '+')}`} key={brand.brand_id}>{brand.name}</Link>
                        ))
                    )}

                    {currentOption === optionsKey.keyYear.spaName && (
                        filterOptions.years.map((year) => (
                            <Link href={`/seminuevos?year=${year.year}`} key={year.id}>{year.year}</Link>
                        ))
                    )}

                    {currentOption === optionsKey.keyDoors.spaName && (
                        filterOptions.doors.map((door) => (
                            <Link href={`/seminuevos?doors=${door.doors}`} key={door.id}>{door.doors}</Link>
                        ))
                    )}

                    {currentOption === optionsKey.keyTransmission.spaName && (
                        filterOptions.transmissions.map((transmission) => (
                            <Link href={`/seminuevos?transmission=${transmission.type}`} className="capitalize" key={transmission.transmission_id}>{transmission.type}</Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
