'use client'
import { useAboutUsStore } from '@/lib/store/aboutUsStore'
import { TeamMember } from '@/lib/types/aboutUs'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { History, UserPlus, Users } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'
import { TeamMemberCard } from './teamMemberCard'
import { TeamMemberDialog } from './teamMemberDialog'
import { motion } from 'framer-motion'

export default function TeamDirectory() {
  const { teamMembers, pastContributors } = useAboutUsStore()
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const activeMembers = teamMembers.filter(m => m.isActive)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  const handleViewMember = (member: TeamMember) => {
    setSelectedMember(member)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    // Small delay before clearing to avoid visual flash
    setTimeout(() => setSelectedMember(null), 200)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {/* <div>
                    <h2>Our Team</h2>
                    <p className="text-muted-foreground">
                        Meet the dedicated individuals preserving Indigenous knowledge
                    </p>
                </div> */}
        {/* <Button onClick={() => setShowAddForm(!showAddForm)} variant="outline">
                    <UserPlus className="h-4 w-4 mr-2" />
                    {showAddForm ? 'Cancel' : 'Add Team Member'}
                </Button> */}
      </div>

      {/* active members */}

      <div>
        {/* <div className="flex items-center space-x-2 mb-4">
                    <Users className="h-5 w-5 text-primary" />
                    <h5>Current Team</h5>
                    <Badge>{activeMembers.length} members</Badge>
                </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeMembers.map(member => (
            <TeamMemberCard
              key={member.ikmsTeamIdentifier}
              member={member}
              onViewDetails={() => handleViewMember(member)}
            />
          ))}
        </div>

        {activeMembers.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No active team members yet.
            </CardContent>
          </Card>
        )}
      </div>

      {/* Past Contributors */}
      {pastContributors && pastContributors.length > 0 && (
        <>
          <Separator className="my-8" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <History className="h-5 w-5 text-muted-foreground" />
              <h3>Past Contributors</h3>
              <Badge variant="outline">{pastContributors.length}</Badge>
            </div>

            <div className="space-y-4">
              {pastContributors.map((contributor, index) => (
                <motion.div
                  key={contributor.ikmsTeamIdentifier}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="pb-4 border-b last:border-b-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 flex-wrap">
                        <span className="font-medium">{contributor.name}</span>
                        {contributor.culturalAffiliation && (
                          <Badge
                            variant="outline"
                            className="text-xs font-cultural"
                          >
                            {contributor.culturalAffiliation}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {contributor.role}
                      </p>
                      {contributor.contributions && (
                        <p className="text-sm text-muted-foreground italic">
                          {contributor.contributions}
                        </p>
                      )}
                    </div>
                    <Badge variant="secondary" className="whitespace-nowrap">
                      {contributor.contributionPeriod.startDate.getFullYear()} -{' '}
                      {contributor.contributionPeriod.endDate.getFullYear()}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    {pastContributors.map((contributor) => (
                                        <div key={contributor.ikmsTeamIdentifier} className="pb-4 last:pb-0 border-b last:border-b-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                                <div>
                                                    <div className="flex items-center space-x-2 flex-wrap">
                                                        <span className="font-medium">{contributor.name}</span>
                                                        {contributor.culturalAffiliation && (
                                                            <span className="text-sm text-muted-foreground">
                                                                ({contributor.culturalAffiliation})
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {contributor.role}
                                                    </p>
                                                    {contributor.contributions && (
                                                        <p className="text-sm text-muted-foreground mt-1 italic">
                                                            {contributor.contributions}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-sm text-muted-foreground whitespace-nowrap">
                                                    {contributor.contributionPeriod.startDate.getFullYear()} - {contributor.contributionPeriod.endDate.getFullYear()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card> */}
          </motion.div>
        </>
      )}

      {/* Team Member Detail Dialog */}
      {selectedMember && (
        <TeamMemberDialog
          member={selectedMember}
          open={dialogOpen}
          onOpenChange={handleCloseDialog}
        />
      )}
    </div>
  )
}
