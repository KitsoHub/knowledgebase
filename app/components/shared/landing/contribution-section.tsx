"use client"
import { motion } from 'motion/react'
import React from 'react'
import { Button } from '../../ui/button'
import { Badge } from '../../ui/badge'
import { BookOpen, Heart, Users } from 'lucide-react'

export default function ContributionSection() {
    return (
        <div className="container mx-auto px-4 py-8 relative z-10">
            {/* Collaboration Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-20"
            >
                <div className="glass-card leaf-shadow rounded-3xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        <div className="relative h-64 lg:h-auto">
                            <img
                                src="https://images.unsplash.com/photo-1645264215548-8062498a7225"
                                alt="Traditional knowledge sharing in indigenous community setting"
                                className="w-full h-64 lg:h-96 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                            <div className="absolute top-6 left-6">
                                <Badge className="bg-white/90 backdrop-blur-sm text-primary border-primary/20 shadow-sm text-lg px-4 py-2">
                                    <Users className="w-5 h-5 mr-2" />
                                    Collaborate with IKMS
                                </Badge>
                            </div>
                        </div>
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-6 text-foreground">
                                Join Our Knowledge-Sharing Community
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                We use culturally inclusive, land-based approaches to connect with us. We are excited to learn more about
                                what you wish to share and offer for the people in your local school, community, or organization.
                            </p>
                            <div className="flex flex-wrap gap-3 mb-6">
                                <Badge variant="outline" className="px-3 py-2">
                                    <BookOpen className="w-4 h-4 mr-2" />
                                    Traditional Knowledge
                                </Badge>
                                <Badge variant="outline" className="px-3 py-2">
                                    <Users className="w-4 h-4 mr-2" />
                                    Community Partnership
                                </Badge>
                                <Badge variant="outline" className="px-3 py-2">
                                    🌿 Cultural Preservation
                                </Badge>
                            </div>
                            <Button
                                onClick={() => { }}
                                className="self-start bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white rounded-full px-6 py-3"
                            >
                                Start Collaborating
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>

                    {/* Support Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="glass-card leaf-shadow rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  Support the Mission
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Join MPI in creating new pathways with Indigenous Peoples that lead to a more just system by
                  addressing critical climate to get there.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">Fund indigenous-led research initiatives</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">Support community-based education programs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      🌱
                    </div>
                    <span className="text-foreground">Preserve traditional medicinal knowledge</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="self-start border-primary/30 text-primary hover:bg-primary hover:text-white rounded-full px-6 py-3"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Make a Donation
                </Button>
              </div>
              <div className="relative h-64 lg:h-auto order-1 lg:order-2">
                <img
                  src='https://www.sundaystandard.info/wp-content/uploads/2020/09/THE-BASARWA.jpg'
                  alt="Indigenous family standing together representing community support"
                  className="w-full h-94 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />
                <div className="absolute top-6 right-6">
                  <Badge className="bg-white/90 backdrop-blur-sm text-primary border-primary/20 shadow-sm text-lg px-4 py-2">
                    <Heart className="w-5 h-5 mr-2" />
                    Support the Mission
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        </div>
    )
}
