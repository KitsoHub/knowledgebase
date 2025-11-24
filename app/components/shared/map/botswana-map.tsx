"use client"
import { SiteData, SiteViewMode } from "@/lib/types/sitesData"
import { latLng } from "leaflet"
import { useEffect, useRef } from "react"
import { vi } from "zod/v4/locales"


interface BWMapProps {
    viewMode: SiteViewMode
    siteData: Partial<SiteData>[]
    //   zoneData: ZoneData[]
    onItemSelect: (item: Partial<SiteData> | null) => void
    selectedItem: Partial<SiteData> | null
    showLayer: boolean
}

const getSiteUsageColor = (usage: string): string => {
    //if (usage === 'public') return "#3B82F6" // Blue - Low
    if (usage === 'public') return "#10B981" // Green - Medium
    //if (usage < 90) return "#F59E0B" // Yellow - High
    return "#EF4444" // Red - Very High
}

export default function BotswanaMap({
    viewMode,
    siteData,
    onItemSelect,
    selectedItem,
    showLayer
}: BWMapProps) {

    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<any>(null)
    const layersRef = useRef<any[]>([])

    useEffect(() => {
        if (typeof window === "undefined") return
        import("leaflet").then((L) => {
            if (!mapRef.current || mapInstanceRef.current) return

            // bw bounds
            const bwBounds: [[number, number], [number, number]] = [
                [-27.5, 19.0], // Southwest
                [-17.5, 30.5], // Northeast
            ]
            mapInstanceRef.current = L.map(mapRef.current, {
                maxBounds: bwBounds,
                maxBoundsViscosity: 1.0,
                zoomSnap: 0.5
            }).setView([-22.3285, 24.6849], 6)

            L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap contributors, Tiles courtesy of Humanitarian OpenStreetMap Team",
                maxZoom: 18,
                minZoom: 5,
            }).addTo(mapInstanceRef.current)


        })

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove()
                mapInstanceRef.current = null
            }
            layersRef.current = []
        }

    }, [])

    useEffect(() => {
        if (!mapInstanceRef.current || typeof window === "undefined") return
        import("leaflet").then((L) => {

            layersRef.current.forEach((layer) => {
                if (layer.marker) mapInstanceRef.current.removeLayer(layer.marker)
                if (layer.polygon) mapInstanceRef.current.removeLayer(layer.polygon)
            })
            layersRef.current = []

            if (viewMode === "Heritage") {
                // Try use heritageSite data
                siteData.forEach((site) => {
                    //const color = getSiteUsageColor(site.metadata?.sensitivity_level ?? '')

                    const color =
                        site.metadata?.sensitivity_level === "public"
                            ? "#10B981"
                            : "#EF4444"

                    // const size = 18 + (sensitivity_lvl / 130) * 12
                    const size = 18 + (60 / 130) * 12

            //         const siteIcon = L.divIcon({
            //             className: "house-marker",
            //             html: `
            //   <div style="
            //     width: ${size}px;
            //     height: ${size}px;
            //     background: ${color};
            //     border: 2px solid white;
            //     border-radius: 50%;
            //     box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            //     display: flex;
            //     align-items: center;
            //     justify-content: center;
            //     font-size: ${Math.max(7, size * 0.35)}px;
            //     font-weight: 700;
            //     color: white;
            //     text-shadow: 1px 1px 1px rgba(0,0,0,0.8);
            //     cursor: pointer;
            //     transition: all 0.3s ease;
            //     opacity: ${showLayer ? 1 : 0.3};
            //     font-family: system-ui, -apple-system, sans-serif;
            //   " onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
            //     ${size.toFixed(1)}
            //   </div>
            // `,
            //             iconSize: [size, size],
            //             iconAnchor: [size / 2, size / 2],
            //         })

                    const lat = Number(site?.latitude ?? 0)
                    const lng = Number(site?.longitude ?? 0)

            //         const marker2 = L.marker(latLng(lat, lng), { icon: siteIcon })
            //             .addTo(mapInstanceRef.current)
            //             .bindPopup(`
            //   <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 220px;">
            //     <h3 style="margin: 0 0 8px 0; font-size: 15px; font-weight: 600; color: #1f2937;">${site.site_name}</h3>
            //     <div style="margin: 4px 0; font-size: 12px; color: #6b7280;"><strong>Type:</strong> ${site.category_display}</div>
            //     <div style="margin: 4px 0; font-size: 12px; color: #6b7280;"><strong>Quartier:</strong> ${site.latitude}</div>
            //   </div>
            // `)
            //             .on("click", () => {
            //                 onItemSelect(site)
            //             })

                    const icon = L.divIcon({
                        className: "heritage-marker",
                        html: `
            <div style="
              width: 22px;
              height: 22px;
              background: ${color};
              border-radius: 50%;
              border: 2px solid white;
              box-shadow: 0 0 6px rgba(0,0,0,0.3);
              opacity: ${showLayer ? 1 : 0.4};
            "></div>
          `,
                        iconSize: [22, 22],
                        iconAnchor: [11, 11],
                    })

                    const marker = L.marker(latLng(lat, lng), { icon })
                        .addTo(mapInstanceRef.current)
                        .bindPopup(`
                                          <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 220px;">
                <h3 style="margin: 0 0 8px 0; font-size: 15px; font-weight: 600; color: #1f2937;">${site.site_name}</h3>
                <div style="margin: 4px 0; font-size: 12px; color: #6b7280;"><strong>Type:</strong> ${site.category_display}: site</div>

                <div style="margin: 4px 0; font-size: 12px; color: #6b7280;"><strong>Population Density:</strong> ${site.population_density}</div>

              </div>
                            `)
                        .on("click", () => onItemSelect(site))

                    layersRef.current.push({ marker, site })

                })

            }

        })
    }, [viewMode, siteData, selectedItem, showLayer, onItemSelect])

    return <div ref={mapRef} className="w-full h-full" style={{ minHeight: "500px" }} />
}
