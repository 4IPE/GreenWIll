'use client'

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface LocationFormProps {
  value: {
    city: string;
    street: string;
    house: string;
    apartment: string;
    floor: string;
    entrance: string;
    latitude: number | null;
    longitude: number | null;
  };
  onChange: (address: LocationFormProps['value']) => void;
  className?: string;
}

interface DaDataSuggestion {
  data: {
    city: string;
    street: string;
    house: string;
    geo_lat?: string;
    geo_lon?: string;
  }
}

interface DaDataResponse {
  suggestions: DaDataSuggestion[];
}

export function LocationForm({ value, onChange, className }: LocationFormProps) {
  const [cities, setCities] = useState<string[]>([])
  const [streets, setStreets] = useState<string[]>([])
  const [houses, setHouses] = useState<string[]>([])
  const [showCities, setShowCities] = useState(false)
  const [showStreets, setShowStreets] = useState(false)
  const [showHouses, setShowHouses] = useState(false)
  
  const searchCities = async (query: string) => {
    if (query.length < 2) return
    
    try {
      const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Token 1f678ed76cc10315f244e278fc84c6c41ea1bce4'
        },
        body: JSON.stringify({
          query,
          from_bound: { value: "city" },
          to_bound: { value: "city" },
          count: 5
        })
      })
      
      const data = await response.json() as DaDataResponse
      setCities(data.suggestions.map((s: DaDataSuggestion) => s.data.city))
    } catch (error) {
      console.error('Ошибка при поиске городов:', error)
    }
  }

  const searchStreets = async (city: string, query: string) => {
    if (!city || query.length < 2) return
    
    try {
      const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Token 1f678ed76cc10315f244e278fc84c6c41ea1bce4'
        },
        body: JSON.stringify({
          query: query,
          from_bound: { value: "street" },
          to_bound: { value: "street" },
          locations: [{ city }],
          count: 5
        })
      })
      
      const data = await response.json() as DaDataResponse
      setStreets(data.suggestions.map((s: DaDataSuggestion) => s.data.street))
    } catch (error) {
      console.error('Ошибка при поиске улиц:', error)
    }
  }

  const searchHouses = async (city: string, street: string, query: string) => {
    if (!city || !street || query.length < 1) return
    
    try {
      const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Token 1f678ed76cc10315f244e278fc84c6c41ea1bce4'
        },
        body: JSON.stringify({
          query: `${city} ${street} ${query}`,
          from_bound: { value: "house" },
          to_bound: { value: "house" },
          locations: [{ city }],
          count: 5
        })
      })
      
      const data = await response.json() as DaDataResponse
      setHouses(data.suggestions.map((s: DaDataSuggestion) => s.data.house))
      
      if (data.suggestions[0]?.data.geo_lat && data.suggestions[0]?.data.geo_lon) {
        onChange({
          ...value,
          house: data.suggestions[0].data.house,
          latitude: parseFloat(data.suggestions[0].data.geo_lat),
          longitude: parseFloat(data.suggestions[0].data.geo_lon)
        })
      }
    } catch (error) {
      console.error('Ошибка при поиске домов:', error)
    }
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="relative">
          <Label>Город</Label>
          <Input
            value={value.city}
            onChange={(e) => {
              onChange({ ...value, city: e.target.value })
              searchCities(e.target.value)
              setShowCities(true)
            }}
            onFocus={() => setShowCities(true)}
          />
          {showCities && cities.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white rounded-md border shadow-lg">
              {cities.map((city) => (
                <div
                  key={city}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onChange({ ...value, city })
                    setShowCities(false)
                  }}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>

        {value.city && (
          <div className="relative">
            <Label>Улица</Label>
            <Input
              value={value.street}
              onChange={(e) => {
                onChange({ ...value, street: e.target.value })
                searchStreets(value.city, e.target.value)
                setShowStreets(true)
              }}
              onFocus={() => setShowStreets(true)}
            />
            {showStreets && streets.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white rounded-md border shadow-lg">
                {streets.map((street) => (
                  <div
                    key={street}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      onChange({ ...value, street })
                      setShowStreets(false)
                    }}
                  >
                    {street}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {value.city && value.street && (
          <div className="relative">
            <Label>Дом</Label>
            <Input
              value={value.house}
              onChange={(e) => {
                onChange({ ...value, house: e.target.value })
                searchHouses(value.city, value.street, e.target.value)
                setShowHouses(true)
              }}
              onFocus={() => setShowHouses(true)}
            />
            {showHouses && houses.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white rounded-md border shadow-lg">
                {houses.map((house) => (
                  <div
                    key={house}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      onChange({ ...value, house })
                      setShowHouses(false)
                    }}
                  >
                    {house}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {value.city && value.street && value.house && (
          <>
            <div>
              <Label>Квартира</Label>
              <Input
                value={value.apartment}
                onChange={(e) => onChange({ ...value, apartment: e.target.value })}
              />
            </div>
            
            <div>
              <Label>Этаж</Label>
              <Input
                type="number"
                value={value.floor}
                onChange={(e) => onChange({ ...value, floor: e.target.value })}
              />
            </div>
            
            <div>
              <Label>Подъезд</Label>
              <Input
                type="number"
                value={value.entrance}
                onChange={(e) => onChange({ ...value, entrance: e.target.value })}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
} 