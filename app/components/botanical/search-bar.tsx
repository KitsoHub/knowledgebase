/**
 *
 *
 * Cancer
 * Diabetes
 * Hypertension
 * Asthma
 * Eye conditions
 */


import React from 'react'
import { Card } from '../ui/card'
import { FilterIcon, Search, X } from 'lucide-react'
import { BotanicalSearchBarProps } from '@/lib/types/botanical';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';



export default function BotanicalSearchBar({ searchTerm,
    onSearchChange,
    selectedFamily,
    onFamilyChange,
    selectedOrigin,
    onOriginChange,
    selectedPartUsed,
    onPartUsedChange,
    selectedCondition,
    onConditionChange,
    onClearFilters }: BotanicalSearchBarProps) {

    const families = ['All Families', 'Asteraceae', 'Zingiberaceae', 'Araliaceae', 'Lamiaceae', 'Ginkgoaceae'];
    const origins = ['All Origins', 'North America', 'Southeast Asia', 'East Asia', 'Mediterranean', 'China'];
    const partsUsed = ['All Parts', 'Roots', 'Leaves', 'Flowers', 'Rhizome', 'Essential oil'];
    const conditions = ['All Conditions', 'Cancer', 'Diabetes', 'Hypertension', 'Asthma'];

    const hasActiveFilters = selectedFamily !== 'All Families' ||
        selectedOrigin !== 'All Origins' ||
        selectedPartUsed !== 'All Parts' ||
        selectedCondition !== 'All Conditions';



    return (<Card className='p-6 mb-6'>
        <div className='space-y-4'>

            <div className='relative'>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                    type="text"
                    placeholder="Search plants..."
                    className="pl-10 "
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />

            </div>
            {/* Filters */}

            <div className="flex flex-wrap gap-4 items-center">
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <FilterIcon className='w-4 h-4 text-muted-foreground' />
                    <span>Filters:</span>
                </div>

                <Select value={selectedFamily} onValueChange={onFamilyChange}>
                    <SelectTrigger className='w-40'>
                        <SelectValue placeholder="Family" />
                    </SelectTrigger>
                    <SelectContent>
                        {families.map((family)=>(
                            <SelectItem key={family} value={family}>{family}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {hasActiveFilters && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onClearFilters}
                        className="gap-2"
                    >
                        <X className="w-3 h-3" />
                        Clear Filters
                    </Button>
                )}
            </div>

            {/* Active filters Display */}
            {hasActiveFilters && (
                 <div className="flex flex-wrap gap-2">
                    {selectedFamily !== 'All Families' && (
                        <Badge variant="secondary">Family: {selectedFamily}
                        <X className='w-3 h-3 ml-1 cursor-pointer' onClick={() => onFamilyChange('All Families')} />
                        </Badge>
                    )}
                 </div>
            )}

        </div>

    </Card>

    )
}
