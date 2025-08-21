
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Filter, Search, X } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

interface PublicationSearchBarProps {
    onSearch: (query: string, filters: Record<string, unknown>) => void
    className?: string
}
export default function PublicationSearchBar({
    onSearch,
    className,
}: PublicationSearchBarProps) {
    const [query, setQuery] = useState('')
    const [filters, setFilters] = useState({
        categories: {
            articles: true,
            artifacts: false,
            plants: false,
            animals: false,
            indigenous: false,
        },
        dateRange: 'all',
    })

    const clearSearch = () => {
        setQuery('')
        onSearch('', filters)
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(query, filters)
    }


    // TODO: propergate to settting articles
    const handleFilterChange = (category: string, checked: boolean) => {
        setFilters((prev) => ({
            ...prev,
            categories: {
                ...prev.categories,
                [category]: checked,
            },
        }))
    }

    const handleDateRangeChange = (range: string) => {
        setFilters((prev) => ({
            ...prev,
            dateRange: range,
        }))
    }

    return (
        <form className={className} onSubmit={handleSearch}>
            <div className="relative flex items-center w-full">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search articles, artifacts, species..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="px-10 py-6 rounded-lg shadow-sm focus-visible:ring-primary"
                    />

                    {query && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={clearSearch}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            type="button"
                            variant="outline"
                            className="ml-2 flex items-center gap-2"
                        >
                            <Filter className="h-4 w-4" />
                            <span className="hidden sm:inline">Filters</span>
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-80">
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium mb-2">Categories</h4>
                                <div className="grid grid-cols gap-2">
                                    {Object.entries(filters.categories).map(
                                        ([category, checked]) => (
                                            <div
                                                key={category}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    id={category}
                                                    checked={checked}
                                                    onCheckedChange={(
                                                        checked
                                                    ) =>
                                                        handleFilterChange(
                                                            category,
                                                            checked === true
                                                        )
                                                    }
                                                />
                                                <Label
                                                    htmlFor={category}
                                                    className="capitalize"
                                                >
                                                    {category}
                                                </Label>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            {/* date range filter */}
                            <div>
                                <h4 className="font-medium mb-2">Date Range</h4>
                                <div className="grid gap-2">
                                    {['all', 'week', 'month', 'year'].map(
                                        (range) => (
                                            <div
                                                key={range}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    id={`date-${range}`}
                                                    checked={
                                                        filters.dateRange ===
                                                        range
                                                    }
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        if (checked)
                                                            handleDateRangeChange(
                                                                range
                                                            )
                                                    }}
                                                />
                                                <Label
                                                    htmlFor={`date-${range}`}
                                                    className="capitalize"
                                                >
                                                    {range === 'all'
                                                        ? 'All Time'
                                                        : `Last ${range}`}
                                                </Label>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            {/* reset and apply buttons */}
                            <div className="flex justify-end space-x-2 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setFilters({
                                            categories: {
                                                articles: true,
                                                artifacts: false,
                                                plants: false,
                                                animals: false,
                                                indigenous: false,
                                            },
                                            dateRange: 'all',
                                        })
                                    }}
                                >
                                    Reset
                                </Button>
                                <Button type="submit" size="sm">
                                    Apply Filters
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                <Button type="submit" className="ml-2 hidden sm:flex">
                    Search
                </Button>
            </div>
        </form>
    )
}
