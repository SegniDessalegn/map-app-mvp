import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { City } from '../types'

export const cityApi = createApi({
    reducerPath: 'cityApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/' }),
    endpoints: (builder) => ({
        getCities: builder.query<City[], void>({
            query: () => `records?where=country_code%3D%27ET%27%20and%20population%3E100000&limit=50`,
            transformResponse: (response: any) => {
                return response.results.map((data: any) => ({
                    id: data.geoname_id,
                    name: data.name,
                    country: data.country_code,
                    latitude: data.coordinates.lat,
                    longitude: data.coordinates.lon,
                    population: data.population,
                    timezone: data.timezone,
                    elevation: data.dem
                }))
            }
        }),
        getCity: builder.query<City, string>({
            query: (id) => ({ url: `records?where=geoname_id%3D%27${id}%27`, }),
            transformResponse: (response: any) => {
                const data = response.results[0]
                return {
                    id: data.geoname_id,
                    name: data.name,
                    country: data.country_code,
                    latitude: data.coordinates.lat,
                    longitude: data.coordinates.lon,
                    population: data.population,
                    timezone: data.timezone,
                    elevation: data.dem
                }
            }
        })
    }),
})

export const { useGetCitiesQuery, useGetCityQuery } = cityApi